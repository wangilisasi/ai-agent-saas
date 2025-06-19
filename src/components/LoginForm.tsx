'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error'; text: string } | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      // We don't need to setIsLoading(false) on success because the page will redirect.
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred during Google sign-in.' });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign In</h2>
      
      {message && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-300">
          {message.text}
        </div>
      )}

      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
      >
        {/* You can add a Google Icon here */}
        {isLoading ? 'Redirecting to Google...' : 'Sign in with Google'}
      </button>
    </div>
  );
} 