import React, { useState, useEffect } from 'react';
import { User, Edit3, Save, Package, TrendingUp, Droplets, Utensils, Flashlight, Heart } from 'lucide-react';
import { getStoredUser, saveUser, getStoredSupplies } from '../utils/localStorage';
import { User as UserType, Supply } from '../types';

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserType>(getStoredUser());
  const [supplies, setSupplies] = useState<Supply[]>(getStoredSupplies());
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState<UserType>(user);

  useEffect(() => {
    const storedUser = getStoredUser();
    const storedSupplies = getStoredSupplies();
    setUser(storedUser);
    setSupplies(storedSupplies);
    setEditUser(storedUser);
  }, []);

  const handleSave = () => {
    if (editUser.displayName.length >= 1 && editUser.displayName.length <= 32) {
      setUser(editUser);
      saveUser(editUser);
      setIsEditing(false);
      alert('プロフィールを更新しました');
    } else {
      alert('表示名は1文字以上32文字以内で入力してください');
    }
  };

  const handleCancel = () => {
    setEditUser(user);
    setIsEditing(false);
  };

  const addInterest = (interest: string) => {
    if (interest.trim() && !editUser.interests.includes(interest.trim())) {
      setEditUser({
        ...editUser,
        interests: [...editUser.interests, interest.trim()]
      });
    }
  };

  const removeInterest = (interest: string) => {
    setEditUser({
      ...editUser,
      interests: editUser.interests.filter(i => i !== interest)
    });
  };

  const getCategoryIcon = (category: Supply['category']) => {
    switch (category) {
      case 'water': return <Droplets className="text-blue-500" size={20} />;
      case 'food': return <Utensils className="text-green-500" size={20} />;
      case 'light': return <Flashlight className="text-yellow-500" size={20} />;
      case 'medical': return <Heart className="text-destructive" size={20} />;
      default: return <Package className="text-muted-foreground" size={20} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column (Profile Card) */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md border border-border">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
              {user.displayName[0]}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editUser.displayName}
                  onChange={(e) => setEditUser({ ...editUser, displayName: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  maxLength={32}
                  required
                />
              ) : (
                <h2 className="text-lg font-bold">{user.displayName}</h2>
              )}
              <p className="text-muted-foreground text-sm">{user.location || '居住地域未設定'}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1">自己紹介</label>
            {isEditing ? (
              <textarea
                value={editUser.bio}
                onChange={(e) => setEditUser({ ...editUser, bio: e.target.value })}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                rows={3}
                maxLength={200}
                placeholder="自己紹介を入力してください"
              />
            ) : (
              <p className="text-muted-foreground">{user.bio || '自己紹介が設定されていません'}</p>
            )}
          </div>

          {/* Location */}
          {isEditing && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-1">居住地域</label>
              <input
                type="text"
                value={editUser.location}
                onChange={(e) => setEditUser({ ...editUser, location: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="例: 東京都渋谷区"
              />
            </div>
          )}

          {/* Interests */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">興味・関心タグ</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(isEditing ? editUser : user).interests.map((interest, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm flex items-center ${isEditing ? 'cursor-pointer hover:bg-destructive/10 hover:text-destructive' : ''}`}
                  onClick={() => isEditing && removeInterest(interest)}
                >
                  {interest}
                  {isEditing && <span className="ml-1">×</span>}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="新しいタグを追加"
                  className="flex-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addInterest((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
              </div>
            )}
          </div>

          {isEditing && (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-1"
              >
                保存
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                キャンセル
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Column (Other Info) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Disaster Score */}
        <div className="bg-card text-card-foreground rounded-lg p-4 shadow-md border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg flex items-center">
              <TrendingUp size={20} className="mr-2 text-green-500" />
              防災スコア
            </h3>
            <span className="text-2xl font-bold text-green-600">{user.disasterScore}点</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${user.disasterScore}%` }}
            ></div>
          </div>
          <p className="text-muted-foreground text-sm mt-2">継続的な防災活動で素晴らしいスコアです！</p>
        </div>

        {/* Supply Summary */}
        <div className="bg-card text-card-foreground rounded-lg p-4 shadow-md border border-border">
          <h3 className="font-bold text-lg mb-3 flex items-center">
            <Package size={20} className="mr-2 text-primary" />
            備蓄サマリー
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {supplies.map((supply, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-md">
                {getCategoryIcon(supply.category)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{supply.name}</p>
                  <p className="text-xs text-muted-foreground">{supply.amount} {supply.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Posts */}
        <div className="bg-card text-card-foreground rounded-lg p-4 shadow-md border border-border">
          <h3 className="font-bold text-lg mb-3">マイ投稿</h3>
          <div className="text-center py-8 text-muted-foreground">
            <Package size={48} className="mx-auto mb-2 opacity-50" />
            <p>まだ投稿がありません</p>
            <p className="text-sm">備蓄SNSで情報を共有してみましょう！</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;