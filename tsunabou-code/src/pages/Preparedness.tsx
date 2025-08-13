import React, { useState, useEffect } from 'react';
import { Camera, Star, Send, Clock } from 'lucide-react';
import { dummyPosts } from '../utils/dummyData';
import { getStoredPosts, savePosts } from '../utils/localStorage';
import { Post } from '../types';

const Preparedness: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    const storedPosts = getStoredPosts();
    if (storedPosts.length > 0) {
      setPosts(storedPosts);
    } else {
      setPosts(dummyPosts);
      savePosts(dummyPosts);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        title,
        content,
        image: imagePreview || undefined,
        author: 'あなた',
        authorId: '1',
        timestamp: new Date(),
        rating: 0,
        category: 'preparedness'
      };
      
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      savePosts(updatedPosts);
      
      // Reset form
      setTitle('');
      setContent('');
      setImagePreview('');
      setShowForm(false);
      
      alert('投稿しました！');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}分前`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}時間前`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}日前`;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
        <h1 className="text-xl font-bold flex items-center">
          <Camera size={24} className="mr-2" />
          備蓄SNS
        </h1>
        <p className="text-orange-100 text-sm mt-1">防災用品の情報を共有しよう</p>
      </header>

      <div className="p-4">
        {/* New Post Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl font-medium mb-6 flex items-center justify-center space-x-2 hover:from-orange-600 hover:to-red-600 transition-all"
        >
          <Camera size={18} />
          <span>新しい投稿</span>
        </button>

        {/* New Post Form */}
        {showForm && (
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="タイトル（例：防災グッズレビュー）"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  maxLength={50}
                  required
                />
              </div>
              
              <div>
                <textarea
                  placeholder="備蓄用品について詳しく教えてください"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  maxLength={500}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  写真をアップロード
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="プレビュー" 
                    className="mt-2 w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-orange-700 transition-colors"
                >
                  <Send size={16} />
                  <span>投稿</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {post.image && (
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-800 flex-1">{post.title}</h3>
                  <div className="flex items-center space-x-1 ml-2">
                    {renderStars(post.rating)}
                    <span className="text-xs text-gray-500 ml-1">({post.rating.toFixed(1)})</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.content}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-medium">{post.author}</span>
                  <span className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{formatTimeAgo(post.timestamp)}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preparedness;