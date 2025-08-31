import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Shield, Map, User, Settings } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'ホーム' },
  { href: '/preparedness', icon: Shield, label: '備え' },
  { href: '/map', icon: Map, label: 'マップ' },
  { href: '/profile', icon: User, label: 'プロフィール' },
  { href: '/settings', icon: Settings, label: '設定' },
];

const SideNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="w-64 h-full bg-gray-800 text-white p-4">
      <ul>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center p-3 my-1 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="mr-3" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNavigation;