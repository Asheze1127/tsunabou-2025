import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, MapPin, User, Settings } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'ホーム' },
    { path: '/preparedness', icon: Package, label: '備蓄SNS' },
    { path: '/map', icon: MapPin, label: '防災マップ' },
    { path: '/profile', icon: User, label: 'プロフィール' },
    { path: '/settings', icon: Settings, label: '設定' }
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex justify-around">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
              }`}
              aria-label={label}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;