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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Account Section */}
          <div className="bg-card text-card-foreground rounded-lg p-4 shadow-md border border-border">
            <h3 className="font-bold text-lg mb-4 pb-2 border-b border-border">アカウント</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">メールアドレス</label>
                <p className="text-muted-foreground text-sm">us**@ex*****.com （変更は管理画面から）</p>
              </div>
              
              <div>
                <button className="text-primary text-sm hover:text-primary/90 transition-colors">
                  パスワードを変更する
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-card text-card-foreground rounded-lg p-4 shadow-md border border-border">
            <h3 className="font-bold text-lg mb-4 pb-2 border-b border-border">通知</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">災害速報通知</p>
                  <p className="text-sm text-muted-foreground">緊急災害情報をプッシュ通知</p>
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
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">デイリークエスト通知</p>
                  <p className="text-sm text-muted-foreground">毎日の防災クイズをお知らせ</p>
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
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
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
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1km</span>
                  <span>20km</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Privacy Section */}
          <div className="bg-card text-card-foreground rounded-lg p-4 shadow-md border border-border">
            <h3 className="font-bold text-lg mb-4 pb-2 border-b border-border">プライバシー</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">プロフィール公開範囲</label>
                <select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, profileVisibility: e.target.value as any }
                  })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="public">全体に公開</option>
                  <option value="regional">地域限定</option>
                  <option value="private">非公開</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">位置情報を共有</p>
                  <p className="text-sm text-muted-foreground">防災マップに位置情報を表示</p>
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
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Region & Language Section */}
          <div className="bg-card text-card-foreground rounded-lg p-4 shadow-md border border-border">
            <h3 className="font-bold text-lg mb-4 pb-2 border-b border-border">地域・言語</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">既定地域フィルター</label>
                <select
                  value={settings.region}
                  onChange={(e) => setSettings({ ...settings, region: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {prefectures.map((prefecture) => (
                    <option key={prefecture} value={prefecture}>{prefecture}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">言語</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value as 'ja' | 'en' })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="ja">日本語</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>

          {/* Theme Section */}
          <div className="bg-card text-card-foreground rounded-lg p-4 shadow-md border border-border">
            <h3 className="font-bold text-lg mb-4 pb-2 border-b border-border">テーマ</h3>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">外観テーマ</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value as any })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="light">ライトモード</option>
                <option value="dark">ダークモード</option>
                <option value="system">システム設定に従う</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-4">
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-1"
        >
          <Save size={18} className="mr-2" />
          <span>保存</span>
        </button>
        
        <button
          onClick={handleReset}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1"
        >
          <RotateCcw size={18} className="mr-2" />
          <span>リセット</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;