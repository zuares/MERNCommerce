import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import ButtonRender from '../Products/ButtonRender';

function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    console.log(cart);

    if (cart.length === 0) {
        return (
            <div className={`container py-8`} >
                <h2 className={`font-bold`} >Empty Cart</h2>
            </div>
        )
    }

    return (
        <div className={`container py-8 `} >
            <div >

                {
                    cart.map(item => {
                        return (
                            <div className={`w-full flex gap-8 mt-4 `} >
                                <div className={`w-1/2`}>
                                    <img src={item.images.url} alt={item.images.url} className={`mx-auto w-full`} />
                                </div>
                                <div className={`w-1/2`} >

                                    <div className={`flex justify-between`} >
                                        <h2 className={`font-bold text-xl`} >{item.title}</h2>
                                        <h3>{item.product_id}</h3>
                                    </div>

                                    <div className={`mt-4`} >
                                        <span>$ {item.price}</span>
                                    </div>

                                    <div className={`mt-4`} >
                                        <p>{item.description}</p>
                                        <p>{item.content}</p>
                                    </div>

                                    <p className={`my-2`} >{item.sold}</p>
                                    <div className={`flex gap-1 items-center text-white font-bold`} >
                                        <button className={`w-8 py-0.5 bg-green-500`} >-</button>
                                        <input type="text" className={`w-8 h-8 border text-center text-black `} value={1} />
                                        <button className={`w-8 py-0.5 bg-green-500`} >+</button>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    );
}

export default Cart;