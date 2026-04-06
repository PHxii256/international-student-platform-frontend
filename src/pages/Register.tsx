import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type UserChoice = 'visitor' | 'college-member' | null;

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [choice, setChoice] = useState<UserChoice>(null);
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [universityId, setUniversityId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    if (!choice) return false;
    if (!displayName.trim() || !username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      return false;
    }
    if (choice === 'college-member' && !universityId.trim()) {
      return false;
    }
    return true;
  }, [choice, displayName, username, email, password, confirmPassword, universityId]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError('Please complete all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password confirmation does not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        username: username.trim(),
        email: email.trim(),
        password,
        displayName: displayName.trim(),
        userType: choice,
        universityId: choice === 'college-member' ? universityId.trim() : undefined,
      });
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Register</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Create a new account.</p>

        {!choice && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setChoice('visitor')}
              className="p-5 rounded-xl border border-gray-300 dark:border-slate-700 hover:border-green-500 text-left"
            >
              <h2 className="font-semibold text-gray-900 dark:text-white">I am a Visitor</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">General access user</p>
            </button>
            <button
              type="button"
              onClick={() => setChoice('college-member')}
              className="p-5 rounded-xl border border-gray-300 dark:border-slate-700 hover:border-green-500 text-left"
            >
              <h2 className="font-semibold text-gray-900 dark:text-white">I am a College Member</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Student or college member with university ID</p>
            </button>
          </div>
        )}

        {choice && (
          <form onSubmit={onSubmit} className="space-y-4">
            {error && <p className="text-sm text-red-600">{error}</p>}

            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display Name" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white" />
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white" />

            {choice === 'college-member' && (
              <input value={universityId} onChange={(e) => setUniversityId(e.target.value)} placeholder="University ID" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white" />
            )}

            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white" />
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" type="password" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white" />

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setChoice(null)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-200">Back</button>
              <button type="submit" disabled={!canSubmit || isSubmitting} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white disabled:opacity-60">
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
