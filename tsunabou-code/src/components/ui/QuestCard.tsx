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
    <div className="bg-card text-card-foreground rounded-lg p-4 shadow-sm border border-border">
      <h3 className="font-bold text-lg mb-3 flex items-center">
        <CheckCircle size={20} className="mr-2 text-primary" />
        今日の防災クエスト
      </h3>
      
      {!dailyQuest.completed ? (
        <div>
          <p className="text-muted-foreground mb-3">{dailyQuest.question}</p>
          <div className="space-y-2 mb-4">
            {dailyQuest.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="quest-answer"
                  value={index}
                  checked={selectedAnswer === index}
                  onChange={() => onAnswerSelect(index)}
                  className="h-4 w-4 border-primary text-primary ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          <button
            onClick={onAnswerSubmit}
            disabled={selectedAnswer === null}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          >
            回答する
          </button>
        </div>
      ) : (
        <p className="text-green-600 font-medium">✅ 今日のクエストは完了しました！</p>
      )}
    </div>
  );
};

export default QuestCard;