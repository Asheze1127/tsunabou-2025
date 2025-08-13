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
      case 'medical': return <Heart className="text-red-500" size={20} />;
      default: return <Package className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center">
            <User size={24} className="mr-2" />
            プロフィール
          </h1>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
          >
            {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
            <span className="text-sm">{isEditing ? '保存' : '編集'}</span>
          </button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* User Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {user.displayName[0]}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editUser.displayName}
                  onChange={(e) => setEditUser({ ...editUser, displayName: e.target.value })}
                  className="w-full text-lg font-bold border-b border-gray-300 focus:border-purple-500 outline-none bg-transparent"
                  maxLength={32}
                  required
                />
              ) : (
                <h2 className="text-lg font-bold">{user.displayName}</h2>
              )}
              <p className="text-gray-600 text-sm">{user.location || '居住地域未設定'}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">自己紹介</label>
            {isEditing ? (
              <textarea
                value={editUser.bio}
                onChange={(e) => setEditUser({ ...editUser, bio: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
                maxLength={200}
                placeholder="自己紹介を入力してください"
              />
            ) : (
              <p className="text-gray-700">{user.bio || '自己紹介が設定されていません'}</p>
            )}
          </div>

          {/* Location */}
          {isEditing && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">居住地域</label>
              <input
                type="text"
                value={editUser.location}
                onChange={(e) => setEditUser({ ...editUser, location: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="例: 東京都渋谷区"
              />
            </div>
          )}

          {/* Interests */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">興味・関心タグ</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(isEditing ? editUser : user).interests.map((interest, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center ${isEditing ? 'cursor-pointer hover:bg-red-100 hover:text-red-700' : ''}`}
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
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                保存
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
            </div>
          )}
        </div>

        {/* Disaster Score */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-green-800 flex items-center">
              <TrendingUp size={20} className="mr-2" />
              防災スコア
            </h3>
            <span className="text-2xl font-bold text-green-700">{user.disasterScore}点</span>
          </div>
          <div className="w-full bg-white rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${user.disasterScore}%` }}
            ></div>
          </div>
          <p className="text-green-700 text-sm mt-2">継続的な防災活動で素晴らしいスコアです！</p>
        </div>

        {/* Supply Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <Package size={20} className="mr-2" />
            備蓄サマリー
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {supplies.map((supply, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                {getCategoryIcon(supply.category)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{supply.name}</p>
                  <p className="text-xs text-gray-600">{supply.amount} {supply.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Posts */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-3">マイ投稿</h3>
          <div className="text-center py-8 text-gray-500">
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