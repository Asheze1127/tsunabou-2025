import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, RotateCcw } from 'lucide-react';
import { getStoredSettings, saveSettings } from '../utils/localStorage';
import { Settings as SettingsType } from '../types';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsType>(getStoredSettings());

  useEffect(() => {
    const storedSettings = getStoredSettings();
    setSettings(storedSettings);
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    alert('設定を保存しました');
  };

  const handleReset = () => {
    if (window.confirm('設定を初期値にリセットしますか？')) {
      const defaultSettings: SettingsType = {
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
      setSettings(defaultSettings);
      saveSettings(defaultSettings);
      alert('設定をリセットしました');
    }
  };

  const prefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
    '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
    '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
    '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-4">
        <h1 className="text-xl font-bold flex items-center">
          <SettingsIcon size={24} className="mr-2" />
          設定
        </h1>
        <p className="text-gray-300 text-sm mt-1">アプリの動作をカスタマイズ</p>
      </header>

      <div className="p-4 space-y-6">
        {/* Account Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">アカウント</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <p className="text-gray-600 text-sm">us**@ex*****.com （変更は管理画面から）</p>
            </div>
            
            <div>
              <button className="text-blue-600 text-sm hover:text-blue-700 transition-colors">
                パスワードを変更する
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">通知</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">災害速報通知</p>
                <p className="text-sm text-gray-600">緊急災害情報をプッシュ通知</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.disaster}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, disaster: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">デイリークエスト通知</p>
                <p className="text-sm text-gray-600">毎日の防災クイズをお知らせ</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.dailyQuest}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, dailyQuest: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                近隣投稿通知距離: {settings.notifications.nearbyDistance}km
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={settings.notifications.nearbyDistance}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, nearbyDistance: Number(e.target.value) }
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1km</span>
                <span>20km</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">プライバシー</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">プロフィール公開範囲</label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => setSettings({
                  ...settings,
                  privacy: { ...settings.privacy, profileVisibility: e.target.value as any }
                })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="public">全体に公開</option>
                <option value="regional">地域限定</option>
                <option value="private">非公開</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">位置情報を共有</p>
                <p className="text-sm text-gray-600">防災マップに位置情報を表示</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.shareLocation}
                  onChange={(e) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, shareLocation: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Region & Language Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">地域・言語</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">既定地域フィルター</label>
              <select
                value={settings.region}
                onChange={(e) => setSettings({ ...settings, region: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {prefectures.map((prefecture) => (
                  <option key={prefecture} value={prefecture}>{prefecture}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">言語</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value as 'ja' | 'en' })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">テーマ</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">外観テーマ</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value as any })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="light">ライトモード</option>
              <option value="dark">ダークモード</option>
              <option value="system">システム設定に従う</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pb-4">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Save size={18} />
            <span>保存</span>
          </button>
          
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-gray-700 transition-colors"
          >
            <RotateCcw size={18} />
            <span>リセット</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;