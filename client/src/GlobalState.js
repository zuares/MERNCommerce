import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserAPI';

export const GlobalState = createContext();

const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token)
    }

    const refreshToken = async () => {
        const token = await axios.get('auth/refresh_token');

        setToken(token.data.accessToken);
    }
    useEffect(() => {
        if (localStorage.getItem('firstLogin')) {
            refreshToken();
        }
    }, [])

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}

export default DataProvider;