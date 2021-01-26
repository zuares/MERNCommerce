import axios from 'axios';
import { useState } from 'react';

function Login() {
    const [user, setUser] = useState({
        email: '', password: ''
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(`/auth/login`, { ...user });

            localStorage.setItem('firstLogin', true);

            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div className={`w-full  rounded flex justify-center`} >

            <form onSubmit={onSubmit} className={`space-y-4 border-2 border-blue-500 max-w-lg mt-8 p-4`}  >
                <h2 className={`uppercase leading-tight font-bold text-lg `}>Login</h2>
                <input className={`w-full focus:outline-none px-4 rounded-sm border h-10 border-blue-300 py-1  `}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    value={user.email}
                    onChange={onChange}
                />
                <input className={`w-full focus:outline-none px-4 rounded-sm h-10 border border-blue-300 py-1  `}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={user.pasword}
                    onChange={onChange}
                    required />
                <button type="submit" className={`h-11 inline-block w-full py-2 font-bold bg-blue-400 text-white`}  >
                    Login
            </button>
            </form>
        </div>

    );
}

export default Login;