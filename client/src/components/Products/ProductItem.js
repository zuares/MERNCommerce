import { Link } from 'react-router-dom';
function ProductItem({ product }) {
    const { images, title, price, description } = product;

    return (
        <div className={`bg-white shadow-lg`} style={{ width: `450px` }}  >
            <img src={images.url} alt={images.url} className={`w-full object-cover h-60  rounded-t-sm `} />
            <div className={`p-2 `} >

                <div className={``}  >
                    <div className={`flex w-full justify-between`} >
                        <h2 className={`font-bold text-lg capitalize `} title={title} >{title}</h2>
                        <span className={`text-yellow-500 font-bold`} >${price}</span>
                    </div>
                    <p>{description}</p>
                </div>
                <div className={`flex gap-2 font-bold mt-4`} >
                    <Link to="/" className={`bg-green-600 text-white w-1/2 text-center py-2 inline-block `} >Buy</Link>
                    <Link to="/" className={`bg-gray-600 text-white w-1/2 text-center py-2 inline-block `} to={`/detail/${product._id}`} >View</Link>
                </div>

            </div>
        </div>
    );
}

export default ProductItem;