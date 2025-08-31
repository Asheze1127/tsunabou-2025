import React from 'react';
import { Send } from 'lucide-react';

interface PostFormProps {
  title: string;
  content: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PostForm: React.FC<PostFormProps> = ({ title, content, onTitleChange, onContentChange, onSubmit }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <h3 className="font-bold text-gray-800 mb-3">防災情報を共有</h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={onTitleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            maxLength={50}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="防災に関する情報や体験を共有してください"
            value={content}
            onChange={onContentChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            maxLength={500}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-red-700 transition-colors"
        >
          <Send size={18} />
          <span>投稿する</span>
        </button>
      </form>
    </div>
  );
};

export default PostForm;