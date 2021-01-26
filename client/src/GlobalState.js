import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import ProductsAPI from './api/ProductsAPI';

export const GlobalState = createContext();

const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI()
    }
    const refreshToken = async () => {
        const token = await axios.get('auth/refresh_token');

        setToken(token.data.accessToken);
    }
    useEffect(() => {
        if (localStorage.getItem('firstLogin')) {
            refreshToken();
        }
    }, [token])

    console.log(token);
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}

export default DataProvider;