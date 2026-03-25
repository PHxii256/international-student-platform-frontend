import React from 'react';

const Schedule: React.FC<{ darkMode?: boolean }> = ({ darkMode }) => {
  return (
    <div className={`min-h-screen pt-32 p-8 ${darkMode ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Academic Schedule</h1>
        <p>Schedule functionality coming soon. Check announcements for updates.</p>
      </div>
    </div>
  );
};

export { Schedule };

