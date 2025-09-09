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
    <div className="bg-card text-card-foreground rounded-lg p-4 shadow-sm border border-border">
      <h3 className="font-bold text-lg mb-3">防災情報を共有</h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={onTitleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            maxLength={500}
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
        >
          <Send size={18} className="mr-2" />
          <span>投稿する</span>
        </button>
      </form>
    </div>
  );
};

export default PostForm;