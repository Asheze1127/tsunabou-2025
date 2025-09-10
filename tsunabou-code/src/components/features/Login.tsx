import { useLoginStore } from "../../store/login.store";


export const Login = () =>{
    const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);
    return (
        <div>
            <h1 className='text-2xl font-bold'>Login</h1>
            <button className='bg-blue-500 text-white p-2 rounded-md' onClick={() => setIsLoggedIn(true)}>ログイン</button>
        </div>
    );

}