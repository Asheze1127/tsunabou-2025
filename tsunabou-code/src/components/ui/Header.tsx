import React from 'react';
import { Bell, Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 md:bg-gradient-to-r md:from-red-500 md:to-orange-500 md:text-white">
      <div className="flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-2">
          <Shield size={28} />
          <h1 className="text-xl font-bold">つなぼう</h1>
        </div>
        <div className="md:hidden flex items-center space-x-2">
          <Shield size={28} />
          <h1 className="text-xl font-bold text-gray-800">つなぼう</h1>
        </div>
        <button 
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors md:bg-gray-200 md:text-gray-800"
          aria-label="通知"
        >
          <Bell size={20} />
        </button>
      </div>
      <p className="hidden md:block text-red-100 mt-1 text-sm">つながる防災</p>
    </header>
  );
};

export default Header;