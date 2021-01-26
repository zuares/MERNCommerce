import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';

const Headers = () => {
    const state = useContext(GlobalState);
    const [isLogged, setLogged] = state.userAPI.isLogged;
    const [isAdmin, setAdmin] = state.userAPI.isAdmin;

    const logoutUser = async e => {
        e.preventDefault();
        await axios.post('/auth/logout');
        localStorage.clear('firstLogin');
        setLogged(false);
        setAdmin(false);
    }
    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product" >Create Product</Link></li>
                <li><Link to="/category" >Categories</Link></li>
            </>
        )
    }
    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history" >History</Link></li>
                <li><Link to="/logout" onClick={logoutUser}  >Logout</Link></li>
            </>
        )
    }

    return (
        <header className={` bg-gray-100 text-lg`} >
            <div className={`container  flex items-center h-20  justify-between`} >

                {/* Menu */}
                <div className="menu md:hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </div>
                {/* Logo */}
                <div className={`font-bold`} >
                    <Link to="/">
                        {isAdmin ? `Is Admin` : `ZDev`}
                    </Link>
                </div>

                <div className={`flex items-center space-x-8 text-gray-400`} >

                    <ul className={`flex space-x-6 `} >
                        <li>
                            <Link to="/" >{isAdmin ? `Shop` : `Products`}</Link>
                        </li>

                        {
                            isAdmin && adminRouter()
                        }

                        {
                            isLogged ? loggedRouter() : <li>
                                <Link to="/login" >Login or Register</Link>
                            </li>
                        }

                    </ul>

                    <div className={`flex text-black `} >
                        <Link to="/cart" >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        </Link>
                    </div>
                </div>

            </div>

        </header>
    );
}

export default Headers;
