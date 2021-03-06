import axios from 'axios';
import { useEffect, useState } from 'react';
import Products from '../components/Products/Products';

function UserAPI(token) {
    const [isLogged, setLogged] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (token) {
            const getUSer = async () => {
                try {
                    const res = await axios.get('/auth/info', { headers: { Authorization: token } })
                    setLogged(true);
                    res.data.role === 1 && setAdmin(true);
                    setCart(res.data.cart);
                } catch (err) {
                    alert(err.response.data.message);
                }
            }
            getUSer();
        }
    }, [token]);

    const addCart = async (product) => {
        !isLogged && alert(`Please Login`);
        const check = cart.every(item => item._id !== product._id);
        !check && alert(`This product has been added incart`);
        await axios.patch('/auth/addCart', { cart: [...cart, { ...product, quantity: 1 }] }, { headers: { Authorization: token } })
        setCart([...cart, { ...product, quantity: 1 }]);
    }
    return {
        isLogged: [isLogged, setLogged],
        isAdmin: [isAdmin, setAdmin],
        addCart: addCart,
        cart: [cart, setCart],
    };
}

export default UserAPI;