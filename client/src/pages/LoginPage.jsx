import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/login', {email,password}, {withCredentials:true});
            console.log("Login Response Data:", data);
            setUser(data);
            alert('Logged in successfully!');
            setRedirect(true);
        } catch(e){
            console.error("Login Failed Error:", e);
            alert('Login Failed');
        }
    }

    if (redirect){
        return <Navigate to={'/'} />
    }

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-3xl text-center">Login</h1>
                <form className="max-w-xl mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email" 
                           placeholder="your@email.com"
                           value={email}
                           onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" 
                           placeholder="password"
                           value={password}
                           onChange={ev => setPassword(ev.target.value)} />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'> 
                        Don&apos;t have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}