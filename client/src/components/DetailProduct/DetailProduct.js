import { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import ProductItem from '../Products/ProductItem';

function DetailProduct() {
    const state = useContext(GlobalState);
    const param = useParams().id;
    const { products } = state.productsAPI.products;

    const [detailProduct, setDetailProduct] = useState([]);
    console.log(detailProduct);
    useEffect(() => {
        if (param) {
            products.map(product => {
                if (product._id === param) {
                    setDetailProduct(product)
                }
            })
        }
    }, [param, products]);
    if (detailProduct.length === 0) return null;
    return (
        <div className={`container py-8`} >
            <h2 className={`font-bold text-lg mb-4`} >DetailProduct</h2>
            <div className={`w-full flex gap-8 `} >
                <div className={`w-1/2`}>
                    <img src={detailProduct.images.url} alt={detailProduct.images.url} className={`mx-auto w-full`} />
                </div>
                <div className={`w-1/2`} >

                    <div className={`flex justify-between`} >
                        <h2 className={`font-bold text-xl`} >{detailProduct.title}</h2>
                        <h3>{detailProduct.product_id}</h3>
                    </div>

                    <div className={`mt-4`} >
                        <span>$ {detailProduct.price}</span>
                    </div>

                    <div className={`mt-4`} >
                        <p>{detailProduct.description}</p>
                        <p>{detailProduct.content}</p>
                    </div>

                    <p className={`my-2`} >{detailProduct.sold}</p>

                    <Link className={`w-1/3 text-center bg-gray-800 text-white font-bold inline-block py-2 mt-4`} >Buy</Link>

                </div>
            </div>
            <div>
                <h2 className={`font-bold text-lg my-10`} >Related Product</h2>
                <div className={`flex gap-4 flex-wrap`} >
                    {
                        products.map(item => {
                            if (item.category === detailProduct.category) {
                                return (
                                    <ProductItem key={item._id} product={item} />
                                )
                            }
                        })
                    }

                </div>
            </div>
        </div>
    );
}

export default DetailProduct;