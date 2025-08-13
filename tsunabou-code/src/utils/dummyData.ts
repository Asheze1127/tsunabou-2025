import { Post, DisasterPin, DailyQuest } from '../types';

export const dummyPosts: Post[] = [
  {
    id: '1',
    title: '非常用ライト比較レビュー',
    content: 'LED懐中電灯とソーラーライトを比較してみました。停電時の明るさと持続時間をテストした結果...',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300',
    author: '田中防災',
    authorId: '2',
    timestamp: new Date('2025-01-15T10:30:00'),
    rating: 4.5,
    category: 'preparedness'
  },
  {
    id: '2',
    title: '家族で防災訓練をやってみた',
    content: '子供たちと一緒に避難経路の確認と非常持出袋の中身チェックを実施。意外な発見が...',
    image: 'https://images.pexels.com/photos/8939658/pexels-photo-8939658.jpeg?auto=compress&cs=tinysrgb&w=300',
    author: '佐藤ファミリー',
    authorId: '3',
    timestamp: new Date('2025-01-14T14:20:00'),
    rating: 4.8,
    category: 'preparedness'
  },
  {
    id: '3',
    title: 'おすすめ保存食レシピ',
    content: '缶詰とレトルト食品で作る簡単で美味しい非常食メニューをご紹介。栄養バランスも考えて...',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
    author: '山田ママ',
    authorId: '4',
    timestamp: new Date('2025-01-13T16:45:00'),
    rating: 4.2,
    category: 'preparedness'
  }
];

export const dummyDisasterPins: DisasterPin[] = [
  {
    id: '1',
    lat: 35.6762,
    lng: 139.6503,
    title: '停電情報',
    description: '午後2時頃から広範囲で停電が発生しています。復旧見込みは夕方頃とのこと。',
    image: 'https://images.pexels.com/photos/301703/pexels-photo-301703.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: new Date('2025-01-15T14:30:00'),
    reliability: 0.9,
    author: '地域住民A'
  },
  {
    id: '2',
    lat: 35.6830,
    lng: 139.6550,
    title: '道路冠水',
    description: '大雨により道路が冠水しています。車両通行不可。歩行者も注意してください。',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: new Date('2025-01-15T13:15:00'),
    reliability: 0.8,
    author: '地域住民B'
  },
  {
    id: '3',
    lat: 35.6700,
    lng: 139.6400,
    title: '避難所開設',
    description: '地域センターが避難所として開設されました。毛布と飲料水の提供あり。',
    timestamp: new Date('2025-01-15T15:00:00'),
    reliability: 1.0,
    author: '区役所'
  }
];

export const dummyDailyQuest: DailyQuest = {
  id: '1',
  question: '地震が発生したときの最初の行動として正しいものはどれですか？',
  options: [
    'すぐに外に飛び出す',
    'まず身を守る（机の下に隠れるなど）',
    'エレベーターで避難する',
    'すぐに家族に電話する'
  ],
  correctAnswer: 1,
  completed: false
};