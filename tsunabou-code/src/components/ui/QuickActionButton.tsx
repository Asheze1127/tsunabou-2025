import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  to: string;
  color: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ to, color, icon: Icon, title, description }) => {
  return (
    <Link
      to={to}
      className={`bg-gradient-to-br ${color} text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105`}
    >
      <Icon size={32} className="mb-2" />
      <h3 className="font-bold">{title}</h3>
      <p className="text-xs opacity-90">{description}</p>
    </Link>
  );
};

export default QuickActionButton;