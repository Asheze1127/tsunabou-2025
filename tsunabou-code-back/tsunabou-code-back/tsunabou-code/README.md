# つなぼう 〜つながる防災〜

防災に特化したSNS型地域参加型投稿Webアプリケーション

## 概要

「つなぼう」は、防災情報を地域住民同士で共有し合うモバイル最適化されたWebアプリです。備蓄情報の共有、災害情報のマッピング、防災クイズなどの機能を通じて、コミュニティベースの防災意識向上を目指します。

## 主要機能

### 📱 5つの主要画面
1. **ホーム** - 防災情報投稿、デイリークエスト
2. **備蓄SNS** - 備蓄用品の情報共有・レビュー投稿
3. **防災マップ** - 災害報告のリアルタイム可視化
4. **プロフィール** - ユーザー情報管理、防災スコア表示
5. **設定** - 通知・プライバシー・地域設定

### 🎯 コア機能
- **投稿システム**: 防災情報・備蓄レビューの投稿と共有
- **マップ機能**: 災害情報をピンで地図上に表示
- **デイリークエスト**: 毎日の防災クイズで知識向上
- **防災スコア**: ユーザーの防災活動を数値化
- **設定管理**: 通知、プライバシー、地域フィルターの設定
- **データ永続化**: LocalStorageでユーザーデータを保存

## 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **ルーティング**: React Router v6
- **スタイリング**: Tailwind CSS
- **アイコン**: Lucide React
- **フォント**: Noto Sans JP (Google Fonts)
- **ビルドツール**: Vite
- **データ保存**: LocalStorage

## ファイル構成

```
src/
├── components/           # 共通コンポーネント
│   ├── Layout.tsx       # 共通レイアウト
│   └── BottomNavigation.tsx  # ボトムナビゲーション
├── pages/               # 画面コンポーネント
│   ├── Home.tsx         # ホーム画面
│   ├── Preparedness.tsx # 備蓄SNS画面
│   ├── Map.tsx          # 防災マップ画面
│   ├── Profile.tsx      # プロフィール画面
│   └── Settings.tsx     # 設定画面
├── types/
│   └── index.ts         # TypeScript型定義
├── utils/
│   ├── localStorage.ts  # LocalStorage操作ユーティリティ
│   └── dummyData.ts     # ダミーデータ
├── App.tsx              # アプリケーションルート
├── main.tsx             # エントリーポイント
└── index.css            # グローバルスタイル
```

## セットアップ・起動方法

### 必要環境
- Node.js 18+ 
- npm/yarn/pnpm

### インストール・起動
```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー（ビルド後）
npm run preview
```

## デザインガイドライン

### カラーパレット
- **プライマリ**: 赤系 (`red-500`, `red-600`)
- **セカンダリ**: オレンジ系 (`orange-500`, `orange-600`)  
- **アクセント**: 黄色系 (`yellow-400`, `yellow-500`)
- **ニュートラル**: 白、グレー系

### レスポンシブ対応
- モバイルファースト設計
- Safe Area対応（iOS Safari等）
- タッチ操作最適化

### アクセシビリティ
- 適切なコントラスト比
- フォーカスリングの実装
- aria属性によるスクリーンリーダー対応

## データモデル

### 主要なTypeScript型

```typescript
interface User {
  id: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  interests: string[];
  disasterScore: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  author: string;
  timestamp: Date;
  rating: number;
  category: 'general' | 'preparedness' | 'disaster';
}

interface DisasterPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  reliability: number;
}
```

## 今後の拡張予定

- プッシュ通知の実装
- 外部地図APIの統合 (Google Maps/Mapbox)
- バックエンドAPI連携 (Firebase/Supabase)
- オフライン機能
- 多言語対応の拡充
- PWA (Progressive Web App) 化

## ライセンス

MIT License

## 開発者向けメモ

- すべての画面でモバイル最適化を最優先に設計
- LocalStorageを使用してオフライン体験を提供
- コンポーネント間の状態管理はContext APIまたはZustandで拡張可能
- 災害時のアクセシビリティを特に重視した設計