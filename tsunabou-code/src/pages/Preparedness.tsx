import React, { useState, useEffect } from 'react';
import { Camera, Star, Send, Clock } from 'lucide-react';
import { dummyPosts } from '../utils/dummyData';
import { Post } from '../types';

const Preparedness: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    // dummyデータを直接表示
    setPosts(dummyPosts);
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
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* New Post Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
      >
        <Camera size={18} className="mr-2" />
        <span>新しい投稿</span>
      </button>

      {/* New Post Form */}
      {showForm && (
        <div className="bg-card text-card-foreground rounded-lg p-4 shadow-sm border border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="タイトル（例：防災グッズレビュー）"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                maxLength={500}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                写真をアップロード
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {imagePreview && (
                <img 
                  src={imagePreview} 
                  alt="プレビュー" 
                  className="mt-2 w-full h-32 object-cover rounded-md"
                />
              )}
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-1"
              >
                <Send size={16} className="mr-2" />
                <span>投稿</span>
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-card text-card-foreground rounded-lg shadow-sm border border-border overflow-hidden">
            {post.image && (
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg flex-1">{post.title}</h3>
                <div className="flex items-center space-x-1 ml-2">
                  {renderStars(post.rating)}
                  <span className="text-xs text-muted-foreground ml-1">({post.rating.toFixed(1)})</span>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{post.content}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
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
  );
};

export default Preparedness;