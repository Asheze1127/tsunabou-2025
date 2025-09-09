import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ to, icon: Icon, title, description }) => {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center bg-primary text-primary-foreground p-4 rounded-lg shadow-sm hover:bg-primary/90 transition-colors"
    >
      <Icon size={32} className="mb-2" />
      <h3 className="font-bold text-center">{title}</h3>
      <p className="text-xs opacity-90 text-center">{description}</p>
    </Link>
  );
};

export default QuickActionButton;