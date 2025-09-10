import { Link, useNavigate } from "react-router-dom";
import { useLoginStore } from "../../store/login.store";
import { UserForm } from "../ui/UserForm";

export const Login = () => {
    const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);
    const navigate = useNavigate();
    const submitForm = () => {
        setIsLoggedIn(true);
        navigate('/');
    }
    const children = () => (
        <div>
            <Link to="/signup">新規登録</Link>
        </div>
    )
    return (
        <UserForm submitForm={submitForm} title="ログイン" description="アカウント情報を入力してください">
            {children()}
        </UserForm>
    );
};