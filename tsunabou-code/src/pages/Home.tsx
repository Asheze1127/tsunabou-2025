import React from 'react';
import { Package, MapPin } from 'lucide-react';
import QuickActionButton from '../components/ui/QuickActionButton';
import DailyQuestFeature from '../components/features/DailyQuestFeature';
import PostFormFeature from '../components/features/PostFormFeature';

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <QuickActionButton 
          to="/preparedness"
          color="from-orange-400 to-red-500"
          icon={Package}
          title="備蓄SNS"
          description="備蓄情報を共有"
        />
        <QuickActionButton
          to="/map"
          color="from-yellow-400 to-orange-500"
          icon={MapPin}
          title="防災マップ"
          description="災害情報を確認"
        />
      </div>
      <PostFormFeature />
      <DailyQuestFeature />
    </div>
  );
};

export default Home;