import { Input } from "./input";
import { Button } from "./Button";

interface UserFormProps {
    submitForm: (e: React.FormEvent) => void;
    children?: React.ReactNode;
}

export const UserForm = (
    { submitForm, children }: UserFormProps
) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">ログイン</h1>
          <p className="mt-2 text-sm text-gray-600">アカウント情報を入力してください</p>
        </div>
        <form className="space-y-6" onSubmit={submitForm}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              メールアドレス
            </label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              ユーザー名
            </label>
            <Input
              id="username"
              type="text"
              placeholder="あなたのユーザー名"
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              パスワード
            </label>
            <Input
              id="password"
              type="password"
              placeholder="パスワード"
              className="mt-1"
            />
          </div>
          {children}
          <Button type="submit" className="w-full">
            ログイン
          </Button>
        </form>
      </div>
    </div>
  );
};