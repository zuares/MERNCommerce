import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import ProductItem from './ProductItem';

function Products() {

    const state = useContext(GlobalState);
    const { products } = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
        <div className={`container py-8`} >
            <h2 className={`font-bold text-xl mb-8`} >Product List</h2>
            <div className={`flex flex-wrap justify-center gap-4`} >
                {
                    products.map(product => <ProductItem key={product._id} product={product} isAdmin={isAdmin} />)
                }
            </div>
        </div>
    );
}

export default Products;