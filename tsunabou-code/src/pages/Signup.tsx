import { Link, useNavigate } from "react-router-dom";
import { UserForm } from "../components/ui/UserForm"
import { useLoginStore } from "../store/login.store";

export const Signup = () => {
    const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);
    const navigate = useNavigate();

    const submitForm = () => {
        setIsLoggedIn(true);
        navigate('/');
    }
    const children = () => (
        <div>
            <Link to="/">ログインへ戻る</Link>
        </div>
    )
    return (
        <UserForm title="新規登録" description="アカウント情報を入力してください" submitForm={submitForm}>
            {children()}
        </UserForm>
    )
}