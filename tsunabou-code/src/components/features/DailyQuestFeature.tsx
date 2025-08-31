import React, { useState, useEffect } from 'react';
import { getStoredDailyQuest, saveDailyQuest } from '../../utils/localStorage';
import { dummyDailyQuest } from '../../utils/dummyData';
import { DailyQuest } from '../../types';
import QuestCard from '../ui/QuestCard';

const DailyQuestFeature: React.FC = () => {
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

  if (!dailyQuest) {
    return null;
  }

  return (
    <QuestCard 
      dailyQuest={dailyQuest}
      selectedAnswer={selectedAnswer}
      onAnswerSelect={setSelectedAnswer}
      onAnswerSubmit={handleAnswerQuest}
    />
  );
};

export default DailyQuestFeature;