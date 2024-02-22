import React, { useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';
import './App.css'
import {useAppDispatch, useAppSelector} from "./redux/hooks/hooks.ts";
import {Product, setLoading, setProducts} from "./redux/slices/productSlice.ts";
import SearchFrom from "./components/SearchForm/SearchFrom.tsx";
import ProductList from "./components/ProductList/ProductList.tsx";

const API_URL = 'http://api.valantis.store:40000/';



interface ApiResponse {
    result: string[];
}

const App: React.FC = () => {
    const page = useAppSelector(state => state.products.page)
    const search = useAppSelector(state => state.products.search)
    const loading = useAppSelector(state => state.products.loading)
    const dispatch = useAppDispatch()

    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const password = 'Valantis';
    const authString = md5(`${password}_${timestamp}`);

    useEffect(() => {
        fetchProducts();
    }, [page, search]);

    const fetchProducts = async () => {
        dispatch(setLoading(true));

        try {
            const response = await axios.post(API_URL, {
                action: 'get_ids',
                params: { offset: (page - 1) * 50, limit: 50 },
            }, {
                headers: { 'Content-Type': 'application/json', 'X-Auth': authString }
            });

            const data: ApiResponse = response.data;
            const productIds = data.result;
            await fetchProductDetails(productIds);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const fetchProductDetails = async (ids: string[]) => {
        try {
            const uniqueIds = new Set(ids);
            const uniqueProductIds = Array.from(uniqueIds);

            const response = await axios.post(API_URL, {
                action: 'get_items',
                params: { ids: uniqueProductIds }
            }, {
                headers: { 'Content-Type': 'application/json', 'X-Auth': authString }
            });

            const data = response.data;
            const uniqueProducts: Product[] = [];

            const productsMap: { [key: string]: Product } = {};
            data.result.forEach((item: any) => {
                const product: Product = {
                    id: item.id,
                    product: item.product,
                    price: item.price,
                    brand: item.brand,
                };
                if (!productsMap[item.id]) {
                    productsMap[item.id] = product;
                    uniqueProducts.push(product);
                }
            });
            dispatch(setProducts(uniqueProducts));
        } catch (error) {
            console.error('Error:', error);
        }
    };





    return (
        <div>
            <h1>Ювелирные изделия</h1>
            <SearchFrom />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ProductList />

                </>
            )   }
        </div>
    );
};

export default App;
