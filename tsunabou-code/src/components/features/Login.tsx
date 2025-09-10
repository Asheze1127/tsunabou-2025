import { useLoginStore } from "../../store/login.store";
import { UserForm } from "../ui/UserForm";

export const Login = () => {
  const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);
  const children = () => (
    <div>
        <a href="/signup">新規登録</a>
    </div>
  )
  return (
    <UserForm submitForm={() => setIsLoggedIn(true)}>
        {children()}
    </UserForm>
  );
};