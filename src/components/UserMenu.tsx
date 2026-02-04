import React from 'react';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const UserMenu: React.FC = () => {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={signInWithGoogle}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors bg-white border border-gray-200 px-3 py-2 rounded-full hover:bg-gray-50"
      >
        <LogIn size={16} />
        <span className="hidden sm:inline">Sign in</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* User Avatar */}
      <div className="flex items-center gap-2">
        {user.photoURL ? (
          <img 
            src={user.photoURL} 
            alt={user.displayName || 'User'} 
            className="w-8 h-8 rounded-full border-2 border-indigo-200"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <User size={16} className="text-indigo-600" />
          </div>
        )}
        <span className="text-sm font-medium text-gray-700 hidden sm:inline max-w-[100px] truncate">
          {user.displayName?.split(' ')[0] || 'User'}
        </span>
      </div>
      
      {/* Sign Out Button */}
      <button
        onClick={signOut}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        title="Sign out"
      >
        <LogOut size={16} />
      </button>
    </div>
  );
};

export default UserMenu;
