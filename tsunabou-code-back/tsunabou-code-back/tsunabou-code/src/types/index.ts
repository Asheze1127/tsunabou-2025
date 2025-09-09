export interface User {
  id: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  interests: string[];
  disasterScore: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  author: string;
  authorId: string;
  timestamp: Date;
  rating: number;
  category: 'general' | 'preparedness' | 'disaster';
}

export interface DisasterPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  image?: string;
  timestamp: Date;
  reliability: number;
  author: string;
}

export interface Settings {
  email: string;
  notifications: {
    disaster: boolean;
    dailyQuest: boolean;
    nearbyDistance: number;
  };
  privacy: {
    profileVisibility: 'public' | 'regional' | 'private';
    shareLocation: boolean;
  };
  region: string;
  language: 'ja' | 'en';
  theme: 'light' | 'dark' | 'system';
}

export interface DailyQuest {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  completed: boolean;
}

export interface Supply {
  name: string;
  amount: number;
  unit: string;
  category: 'water' | 'food' | 'light' | 'medical' | 'other';
}