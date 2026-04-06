import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFieldError(null);
    setServerError(null);

    if (!identifier.trim() || !password.trim()) {
      setFieldError('Identifier and password are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(identifier.trim(), password);
      navigate('/profile');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Login</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Sign in to your account.</p>

        {fieldError && <p className="text-sm text-red-600 mb-3">{fieldError}</p>}
        {serverError && <p className="text-sm text-red-600 mb-3">{serverError}</p>}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email or Username</label>
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              placeholder="Enter your email or username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2 rounded-lg"
          >
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="mt-5 text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <p>
            New here?{' '}
            <Link className="text-green-600 hover:underline" to="/register">
              Register
            </Link>
          </p>
          <p>Forgot password? Please contact support.</p>
        </div>
      </div>
    </div>
  );
}
