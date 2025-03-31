import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-6">Welcome to Your MoodAura</h1>
        <p className="text-lg mb-8">Manage your data with ease and efficiency.</p>
        <div className="flex justify-center gap-6">
          <Link
            to="/auth/signin"
            className="rounded-2xl bg-white px-6 py-3 text-blue-600 font-semibold shadow-lg hover:bg-blue-100 transition"
          >
            Sign In
          </Link>
          <Link
            to="/auth/signup"
            className="rounded-2xl bg-indigo-700 px-6 py-3 text-white font-semibold shadow-lg hover:bg-indigo-800 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;