import { createContext, useState } from 'react';

const GlobalState = createContext();

const DataProvider = ({ children }) => {
    return (
        <GlobalState.Provider value={"Value in global state"}>
            {children}
        </GlobalState.Provider>
    )
}

export default DataProvider;