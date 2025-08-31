import React from 'react';
import { CheckCircle } from 'lucide-react';
import { DailyQuest } from '../../types';

interface QuestCardProps {
  dailyQuest: DailyQuest;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  onAnswerSubmit: () => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ dailyQuest, selectedAnswer, onAnswerSelect, onAnswerSubmit }) => {
  return (
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
                  onChange={() => onAnswerSelect(index)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-black">{option}</span>
              </label>
            ))}
          </div>
          <button
            onClick={onAnswerSubmit}
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
  );
};

export default QuestCard;