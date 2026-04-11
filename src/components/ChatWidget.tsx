import React, { useEffect, useState, useRef } from 'react';
import Pusher from 'pusher-js';
import { useAuth } from '../context/AuthContext';

export default function ChatWidget() {
  const { user, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [unreadCount, setUnreadCount] = useState(0); 
  const [unreadUserIds, setUnreadUserIds] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Track messages by a combination of ID or content to kill duplicates
  const msgTracker = useRef(new Set());

  const stateRef = useRef({ isOpen, selectedUser, userId: user?.id });
  useEffect(() => { 
    stateRef.current = { isOpen, selectedUser, userId: user?.id }; 
  }, [isOpen, selectedUser, user]);

  useEffect(() => {
    if (!user) {
      setIsOpen(false); setSelectedUser(null); setMessages([]); setUnreadCount(0); setUnreadUserIds([]);
      msgTracker.current.clear();
    }
  }, [user]);

  // 1. Fetch Users
  useEffect(() => {
    if (isOpen && !selectedUser && token) {
      fetch(`${import.meta.env.VITE_STRAPI_URL}/api/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(data => {
        if (Array.isArray(data)) setUsersList(data.filter(u => String(u.id) !== String(user?.id)));
      });
    }
  }, [isOpen, selectedUser, token, user?.id]);

  // 2. Fetch History
  useEffect(() => {
    if (!selectedUser || !user || !token) return;
    
    // Clear the red dot only for the person you just clicked on
    setUnreadUserIds(prev => prev.filter(id => id !== String(selectedUser.id)));

    fetch(`${import.meta.env.VITE_STRAPI_URL}/api/messages?pagination[limit]=10000&sort=createdAt:asc`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json()).then(json => {
      if (json.data) {
        const myId = String(user.id);
        const theirId = String(selectedUser.id);
        const filtered = json.data.map((m: any) => ({ id: m.id, ...(m.attributes || m) }))
          .filter((m: any) => (String(m.senderId) === myId && String(m.receiverId) === theirId) || (String(m.senderId) === theirId && String(m.receiverId) === myId));
        
        setMessages(filtered);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  }, [selectedUser, user, token]);

  // 3. THE LISTENER (Your exact De-Duplication Logic)
  useEffect(() => {
    if (!user?.id) return;

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, { 
        cluster: import.meta.env.VITE_PUSHER_CLUSTER, 
        forceTLS: true 
    });
    const channel = pusher.subscribe(`staff-${user.id}`);

    const handleNewMessage = (data: any) => {
      const { isOpen: _open, selectedUser: _sel, userId: _me } = stateRef.current;
      
      const senderId = String(data.senderId);
      const myId = String(_me);

      if (senderId === myId) {
        return;
      }

      if (data.id && msgTracker.current.has(data.id)) return;
      if (data.id) msgTracker.current.add(data.id);

      if (_open && _sel && String(_sel.id) === senderId) {
        setMessages(prev => {
            const isDuplicate = prev.some(m => m.text === data.text && String(m.senderId) === senderId);
            if (isDuplicate) return prev;
            return [...prev, data];
        });
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
      } else {
        setUnreadCount(prev => prev + 1);
        setUnreadUserIds(prev => Array.from(new Set([...prev, senderId])));
      }
    };

    channel.bind('new-message', handleNewMessage);

    return () => { 
        channel.unbind('new-message', handleNewMessage);
        pusher.unsubscribe(`staff-${user.id}`);
        pusher.disconnect();
    };
  }, [user?.id]);

  // 4. SEND MESSAGE
  const sendMessage = async () => {
    if (!inputText.trim() || !user || !selectedUser || !token) return;
    
    const messageText = inputText;
    const payload = { text: messageText, senderId: String(user.id), receiverId: String(selectedUser.id) };
    
    setMessages(prev => [...prev, { ...payload, id: Date.now() }]); 
    setInputText("");
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);

    try {
      await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ data: payload })
      });
    } catch (err) { console.error("Send Error", err); }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[2000]">
      {!isOpen && (
        // CRITICAL FIX: Added setSelectedUser(null) so it always opens the Directory!
        <button onClick={() => { setIsOpen(true); setSelectedUser(null); setUnreadCount(0); }} className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg relative transition-transform hover:scale-110">
          <i className="fas fa-comment-dots text-2xl"></i>
          
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 w-4 h-4 rounded-full border-2 border-white animate-pulse shadow-md"></span>
          )}
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 md:w-96 rounded-lg shadow-2xl border flex flex-col h-[480px] overflow-hidden">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
            {selectedUser ? (
              <div className="flex items-center gap-2">
                <button onClick={() => setSelectedUser(null)} className="p-1 hover:bg-blue-700 rounded transition-colors"><i className="fas fa-arrow-left"></i></button>
                <span className="font-semibold truncate max-w-[150px]">{selectedUser.displayName || selectedUser.username}</span>
              </div>
            ) : <span className="font-semibold">Chat Directory</span>}
            
            {/* CRITICAL FIX: Also clears the user when closing the widget completely */}
            <button onClick={() => { setIsOpen(false); setSelectedUser(null); }} className="hover:opacity-75 transition-opacity"><i className="fas fa-times text-lg"></i></button>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
            {!selectedUser ? (
              <div className="space-y-2">
                <input type="text" placeholder="Search..." className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none mb-2" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                {usersList.filter(u => (u.username || u.displayName || '').toLowerCase().includes(searchQuery.toLowerCase())).map((u, i) => (
                  <button key={i} onClick={() => setSelectedUser(u)} className="w-full flex items-center p-3 bg-white border rounded hover:bg-blue-50 transition-colors relative">
                    <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3 uppercase text-xs">{(u.displayName || u.username)?.charAt(0)}</div>
                    <span className="text-sm font-medium text-gray-700">{u.displayName || u.username}</span>
                    
                    {/* RED DOT ON THE RIGHT: Appears for anyone who sent an unread message */}
                    {unreadUserIds.includes(String(u.id)) && <span className="absolute right-4 w-3 h-3 bg-red-600 rounded-full shadow-sm border border-white"></span>}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {messages.map((msg, idx) => (
                  <div key={msg.id || idx} className={`max-w-[85%] p-2.5 rounded-2xl text-sm shadow-sm ${String(msg.senderId) === String(user?.id) ? 'bg-blue-600 text-white ml-auto rounded-tr-none' : 'bg-gray-200 text-gray-800 mr-auto rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {selectedUser && (
            <div className="p-3 bg-white border-t flex gap-2">
              <input type="text" className="flex-1 p-2 border rounded bg-gray-50 outline-none focus:bg-white" placeholder="Type your message..." value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
              <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"><i className="fas fa-paper-plane"></i></button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}