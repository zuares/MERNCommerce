import { Link } from 'react-router-dom';
import ButtonRender from './ButtonRender';
function ProductItem({ product, isAdmin }) {
    const { images, title, price, description } = product;

    return (
        <div className={`bg-white shadow-lg relative `} style={{ width: `450px` }}  >
            {
                isAdmin && <input type="checkbox" className={`absolute inset-0 w-6 h-6`} name="checked" checked={product.checked} />
            }
            <img src={images.url} alt={images.url} className={`w-full object-cover h-60  rounded-t-sm `} />
            <div className={`p-2 `} >

                <div className={``}  >
                    <div className={`flex w-full justify-between`} >
                        <h2 className={`font-bold text-lg capitalize `} title={title} >{title}</h2>
                        <span className={`text-yellow-500 font-bold`} >${price}</span>
                    </div>
                    <p>{description}</p>
                </div>
                <ButtonRender product={product} />

            </div>
        </div>
    );
}

export default ProductItem;