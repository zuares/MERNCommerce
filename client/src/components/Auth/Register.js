import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({
        name: '', email: '', password: ''
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
        <form onSubmit={onSubmit} >
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
                value={user.name}
                onChange={onChange}
            />
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                value={user.email}
                onChange={onChange}
            />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={user.pasword}
                onChange={onChange}
                required />
            <button type="submit" >
                Register
            </button>
            <Link to="/login" >Login</Link>
        </form>
    );
}

export default Login;