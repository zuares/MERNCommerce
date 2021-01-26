import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';

function ButtonRender({ product }) {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;
    return (
        <div className={`flex gap-2 font-bold mt-4`} >
            {
                isAdmin ?
                    <>
                        <Link to="/" className={`bg-green-600 text-white w-1/2 text-center py-2 inline-block `} >Edit</Link>
                        <Link to="/" className={`bg-gray-600 text-white w-1/2 text-center py-2 inline-block `} to={`/detail/${product._id}`} >Delete</Link>
                    </> :
                    <>
                        <Link to="/" className={`bg-green-600 text-white w-1/2 text-center py-2 inline-block `} onClick={() => addCart(product)}    >Buy</Link>
                        <Link to="/" className={`bg-gray-600 text-white w-1/2 text-center py-2 inline-block `} to={`/detail/${product._id}`} >View</Link>
                    </>
            }
        </div>
    );
}

export default ButtonRender;