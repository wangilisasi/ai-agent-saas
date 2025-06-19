'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl hover:text-gray-300">
              Home
            </Link>
            {/* Show Admin link only if the user's role is 'admin' */}
            {session?.user?.role === 'ADMIN' && (
              <Link href="/admin" className="ml-4 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                Admin
              </Link>
            )}
          </div>
          <div className="flex items-center">
            {isLoading ? (
              <div className="text-sm">Loading...</div>
            ) : session ? (
              <>
                <span className="mr-4 text-sm">Welcome, {session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 rounded-md text-sm font-medium border hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="px-3 py-2 rounded-md text-sm font-medium border hover:bg-gray-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 