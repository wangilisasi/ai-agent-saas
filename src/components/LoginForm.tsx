'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chrome, Loader2, Sparkles } from 'lucide-react';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error'; text: string } | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred during Google sign-in.' });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          staggerChildren: 0.2
        }}
        className="w-full max-w-md"
      >
        {/* Background card with subtle animation */}
        <motion.div 
          className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05))",
                "linear-gradient(45deg, rgba(236, 72, 153, 0.05), rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))",
                "linear-gradient(45deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05), rgba(99, 102, 241, 0.05))"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Header section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative px-8 pt-12 pb-6 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="inline-block mb-4"
            >
              <Sparkles className="h-8 w-8 text-indigo-500" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2"
            >
              Welcome
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-600 text-lg"
            >
              Sign in to continue your journey
            </motion.p>
          </motion.div>

          {/* Content section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="px-8 pb-8"
          >
            {/* Error message with animation */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200"
                >
                  <div className="flex items-center">
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="flex-shrink-0 mr-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </motion.div>
                    <p className="text-red-700 font-medium">{message.text}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Sign In Button */}
            <motion.button
              initial={{ scale: 1, y: 0 }}
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="group relative w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 overflow-hidden transition-all duration-300 hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed"
            >
              {/* Button background gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              
              {/* Button content */}
              <div className="relative flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-5 h-5 text-indigo-500 mr-3" />
                      </motion.div>
                      <span className="text-gray-600 font-semibold">Connecting to Google...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Chrome className="w-5 h-5 text-[#4285F4] mr-3" />
                      </motion.div>
                      <span className="text-gray-700 font-semibold text-lg">Continue with Google</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Ripple effect on click */}
              <motion.div
                className="absolute inset-0 bg-indigo-500/10 rounded-2xl scale-0"
                whileTap={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>

            {/* Footer text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 text-center text-sm text-gray-500"
            >
              By continuing, you agree to our{' '}
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.05 }}
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Terms of Service
              </motion.a>{' '}
              and{' '}
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.05 }}
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Privacy Policy
              </motion.a>
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Floating elements for ambient animation */}
        <motion.div
          className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>
    </div>
  );
} 