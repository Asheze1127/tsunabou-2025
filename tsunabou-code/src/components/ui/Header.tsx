import React from 'react';
import { Bell, Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-card text-card-foreground p-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield size={28} className="text-primary" />
          <h1 className="text-xl font-bold">つなぼう</h1>
        </div>
        <button 
          className="p-2 rounded-full hover:bg-accent transition-colors"
          aria-label="通知"
        >
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;