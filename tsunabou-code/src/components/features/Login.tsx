import { Link } from "react-router-dom";
import { useLoginStore } from "../../store/login.store";
import { UserForm } from "../ui/UserForm";

export const Login = () => {
    const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);
    const children = () => (
        <div>
            <Link to="/signup">新規登録</Link>
        </div>
    )
    return (
        <UserForm submitForm={() => setIsLoggedIn(true)}>
            {children()}
        </UserForm>
    );
};