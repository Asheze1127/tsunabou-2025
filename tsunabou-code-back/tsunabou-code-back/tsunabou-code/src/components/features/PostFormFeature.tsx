import React, { useState } from 'react';
import PostForm from '../ui/PostForm';

const PostFormFeature: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      // 投稿処理のシミュレーション
      alert('防災情報を投稿しました！');
      setTitle('');
      setContent('');
    }
  };

  return (
    <PostForm 
      title={title}
      content={content}
      onTitleChange={(e) => setTitle(e.target.value)}
      onContentChange={(e) => setContent(e.target.value)}
      onSubmit={handleSubmitPost}
    />
  );
};

export default PostFormFeature;