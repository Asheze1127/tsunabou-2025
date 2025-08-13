import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Shield, Package, MapPin, Send, CheckCircle } from 'lucide-react';
import { getStoredDailyQuest, saveDailyQuest } from '../utils/localStorage';
import { dummyDailyQuest } from '../utils/dummyData';
import { DailyQuest } from '../types';

const Home: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dailyQuest, setDailyQuest] = useState<DailyQuest | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    const stored = getStoredDailyQuest();
    if (stored) {
      setDailyQuest(stored);
    } else {
      setDailyQuest(dummyDailyQuest);
      saveDailyQuest(dummyDailyQuest);
    }
  }, []);

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      // 投稿処理のシミュレーション
      alert('防災情報を投稿しました！');
      setTitle('');
      setContent('');
    }
  };

  const handleAnswerQuest = () => {
    if (dailyQuest && selectedAnswer !== null) {
      const isCorrect = selectedAnswer === dailyQuest.correctAnswer;
      const updatedQuest = { ...dailyQuest, completed: true };
      setDailyQuest(updatedQuest);
      saveDailyQuest(updatedQuest);
      
      if (isCorrect) {
        alert('正解です！防災知識が向上しました 🎉');
      } else {
        alert('不正解です。正解は「' + dailyQuest.options[dailyQuest.correctAnswer] + '」でした。');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield size={28} />
            <h1 className="text-xl font-bold">つなぼう</h1>
          </div>
          <button 
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="通知"
          >
            <Bell size={20} />
          </button>
        </div>
        <p className="text-red-100 mt-1 text-sm">つながる防災</p>
      </header>

      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/preparedness"
            className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <Package size={32} className="mb-2" />
            <h3 className="font-bold">備蓄SNS</h3>
            <p className="text-xs opacity-90">備蓄情報を共有</p>
          </Link>
          
          <Link
            to="/map"
            className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <MapPin size={32} className="mb-2" />
            <h3 className="font-bold">防災マップ</h3>
            <p className="text-xs opacity-90">災害情報を確認</p>
          </Link>
        </div>

        {/* Daily Quest */}
        {dailyQuest && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center">
              <CheckCircle size={20} className="mr-2" />
              今日の防災クエスト
            </h3>
            
            {!dailyQuest.completed ? (
              <div>
                <p className="text-gray-700 mb-3">{dailyQuest.question}</p>
                <div className="space-y-2 mb-4">
                  {dailyQuest.options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="quest-answer"
                        value={index}
                        checked={selectedAnswer === index}
                        onChange={() => setSelectedAnswer(index)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-black">{option}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleAnswerQuest}
                  disabled={selectedAnswer === null}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  回答する
                </button>
              </div>
            ) : (
              <p className="text-green-700 font-medium">✅ 今日のクエストは完了しました！</p>
            )}
          </div>
        )}

        {/* Post Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3">防災情報を共有</h3>
          <form onSubmit={handleSubmitPost} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="タイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                maxLength={50}
                required
              />
            </div>
            <div>
              <textarea
                placeholder="防災に関する情報や体験を共有してください"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
      </div>
    </div>
  );
};

export default Home;