import React from 'react';
import { Link } from 'react-router-dom';

const Headers = () => {
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
                        ZDev
                    </Link>
                </div>

                <div className={`flex items-center space-x-8 text-gray-400`} >

                    <ul className={`flex space-x-6 `} >
                        <li>
                            <Link to="/" >Products</Link>
                        </li>
                        <li>
                            <Link to="/login" >Login</Link>
                        </li>
                        <li>
                            <Link to="/register" >Register</Link>
                        </li>

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
