import {useAppSelector} from "../../redux/hooks/hooks.ts";

const ProductList = () => {
    const search = useAppSelector(state => state.products.search)
    const products = useAppSelector(state => state.products.products)

    const filteredProducts = products.filter(product =>
        product.product.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {filteredProducts.map(product => (
                <div key={product.id}>
                    <p>ID: {product.id}</p>
                    <p>Name: {product.product}</p>
                    <p>Price: {product.price}</p>
                    <p>Brand: {product.brand}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
