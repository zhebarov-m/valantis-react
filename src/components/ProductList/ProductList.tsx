import {useAppSelector} from "../../redux/hooks/hooks.ts";
import styles from './ProductList.module.scss'

const mockImg = 'https://juvelirnyj-lombard.ru/media/products/8304c52b0c/zolotoe-kolco-s-brilliantami_preview.webp'
const ProductList = () => {
    const search = useAppSelector(state => state.products.search)
    const products = useAppSelector(state => state.products.products)

    const filteredProducts = products.filter(product =>
        product.product.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.productList}>
            {filteredProducts.map(product => (
                <div
                    className={styles.product}
                    key={product.id}
                    style={{fontFamily: 'Arial, sans-serif'}}
                >
                    {/*<div className={styles.fakeImg}>404</div>*/}
                    <img width={260} src={mockImg} alt="изображение с товаром"/>
                    <p style={{opacity: '.3'}}>ID: {product.id}</p>
                    <p>{product.product}</p>
                    <p className={styles.price}>
                        {product.price}₽
                    </p>
                    <p>Бренд: {product.brand ?? 'н/д'}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
