import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage(){
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    async function registerUser(ev) {
        ev.preventDefault();
        try{
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Registration successful! Now you may Login!');
        // eslint-disable-next-line no-unused-vars
        } catch(e){
            alert('Registration failed. Email already exists. Please try again');
        }
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-3xl text-center">Register</h1>
                <form className="max-w-xl mx-auto" onSubmit={registerUser}>
                    <input type="text" 
                           placeholder="Username" 
                           value={name} 
                           onChange={ev => setName(ev.target.value)} />
                    <input type="email" 
                           placeholder="your@email.com"
                           value={email}
                           onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" 
                           placeholder="password"
                           value={password}
                           onChange={ev => setPassword(ev.target.value)} />
                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'> 
                        Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}