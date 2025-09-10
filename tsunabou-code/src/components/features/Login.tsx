import { useLoginStore } from "../../store/login.store";
import { Button } from "../ui/Button";
import { Input } from "../ui/input";


export const Login = () =>{
    const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);
    return (
        <div>
            <h1 className='text-2xl font-bold'>Login</h1>
            <form onSubmit={() => setIsLoggedIn(true)}>
                <Input type="email" placeholder="Email" />
                <Input type="text" placeholder="Username" />
                <Input type="password" placeholder="Password" />
                <Button type="submit">ログイン</Button>
            </form>
        </div>
    );

}