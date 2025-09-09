import { User, Settings, Post, DailyQuest, Supply } from '../types';

const STORAGE_KEYS = {
  USER: 'tsunabou_user',
  SETTINGS: 'tsunabou_settings',
  POSTS: 'tsunabou_posts',
  DAILY_QUEST: 'tsunabou_daily_quest',
  SUPPLIES: 'tsunabou_supplies'
};

export const getStoredUser = (): User => {
  const stored = localStorage.getItem(STORAGE_KEYS.USER);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    id: '1',
    displayName: 'ユーザー',
    bio: '',
    location: '',
    interests: [],
    disasterScore: 75
  };
};

export const saveUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getStoredSettings = (): Settings => {
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    email: 'user@example.com',
    notifications: {
      disaster: true,
      dailyQuest: true,
      nearbyDistance: 5
    },
    privacy: {
      profileVisibility: 'public',
      shareLocation: true
    },
    region: '東京都',
    language: 'ja',
    theme: 'light'
  };
};

export const saveSettings = (settings: Settings): void => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const getStoredPosts = (): Post[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.POSTS);
  if (stored) {
    return JSON.parse(stored).map((post: any) => ({
      ...post,
      timestamp: new Date(post.timestamp)
    }));
  }
  return [];
};

export const savePosts = (posts: Post[]): void => {
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
};

export const getStoredDailyQuest = (): DailyQuest | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.DAILY_QUEST);
  if (stored) {
    return JSON.parse(stored);
  }
  return null;
};

export const saveDailyQuest = (quest: DailyQuest): void => {
  localStorage.setItem(STORAGE_KEYS.DAILY_QUEST, JSON.stringify(quest));
};

export const getStoredSupplies = (): Supply[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.SUPPLIES);
  if (stored) {
    return JSON.parse(stored);
  }
  return [
    { name: '飲料水', amount: 3, unit: 'L', category: 'water' },
    { name: '非常食', amount: 5, unit: '食', category: 'food' },
    { name: '懐中電灯', amount: 2, unit: '個', category: 'light' },
    { name: '救急セット', amount: 1, unit: '個', category: 'medical' }
  ];
};

export const saveSupplies = (supplies: Supply[]): void => {
  localStorage.setItem(STORAGE_KEYS.SUPPLIES, JSON.stringify(supplies));
};