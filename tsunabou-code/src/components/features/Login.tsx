import { useLoginStore } from "../../store/login.store";
import { Button } from "../ui/Button";


export const Login = () =>{
    const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);
    return (
        <div>
            <h1 className='text-2xl font-bold'>Login</h1>
            <Button onClick={() => setIsLoggedIn(true)}>ログイン</Button>
        </div>
    );

}