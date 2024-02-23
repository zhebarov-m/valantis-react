import { useAppSelector } from "../../redux/hooks/hooks.ts";
import styles from './ProductList.module.scss';

const mockImg = [
    'https://juvelirnyj-lombard.ru/media/products/8304c52b0c/zolotoe-kolco-s-brilliantami_preview.webp',
    'https://juvelirnyj-lombard.ru/media/products/aa2fcaaa70/zolotoe-kole-s-brilliantami_preview_pTWxilO.webp',
    'https://juvelirnyj-lombard.ru/media/products/df7ab41ae5/zolotoj-braslet-s-brilliantami_preview_tTWjec7.webp',
    'https://juvelirnyj-lombard.ru/media/products/82915e4377/zolotye-sergi-s-brilliantami-i-perlamutrom_preview_kRMkGzV.webp',
    'https://juvelirnyj-lombard.ru/media/products/21188f1974/zolotaya-brosh-s-zhemchugom_preview_YmGzb2h.webp'
];

const ProductList = () => {
    const search = useAppSelector(state => state.products.search);
    const products = useAppSelector(state => state.products.products);
    const filterPrice = useAppSelector(state => state.products.filterByPrice);

    const filteredPriceAndSearchProducts = products.filter(product =>
        (filterPrice.length === 0 || (product.price > filterPrice[0] && product.price < filterPrice[1])) &&
        product.product.toLowerCase().includes(search.toLowerCase())
    );

    const randomImage = () => mockImg[Math.floor(Math.random() * mockImg.length)];

    return (
        <div className={styles.productList}>
            {filteredPriceAndSearchProducts.map(product => (
                <div
                    className={styles.product}
                    key={product.id}
                    style={{ fontFamily: 'Arial, sans-serif' }}
                >
                    <img width={260} src={randomImage()} alt="изображение с товаром" />
                    <p style={{ opacity: '.3' }}>ID: {product.id}</p>
                    <p>{product.product}</p>
                    <span className={styles.price}>
                        {product.price}₽
                    </span>
                    <p>Бренд: {product.brand ?? 'н/д'}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
