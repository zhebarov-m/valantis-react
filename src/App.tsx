import React, {useEffect, useState} from 'react';
import axios from 'axios';
import md5 from 'md5';
import './App.scss'
import { format } from 'date-fns';
import {useAppDispatch, useAppSelector} from "./redux/hooks/hooks.ts";
import {Product, setLoading, setProducts} from "./redux/slices/productSlice.ts";
import SearchFrom from "./components/SearchForm/SearchFrom.tsx";
import ProductList from "./components/ProductList/ProductList.tsx";
import Pagination from "./components/Pagination/Pagination.tsx";
import FilterForm from "./components/FilterForm/FilterForm.tsx";
import { BsFilter } from "react-icons/bs";

const API_URL = 'http://api.valantis.store:40000/';


interface ApiResponse {
    result: string[];
}

const App: React.FC = () => {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const products = useAppSelector(state => state.products.products)
    const page = useAppSelector(state => state.products.page)
    const search = useAppSelector(state => state.products.search)
    const loading = useAppSelector(state => state.products.loading)
    const dispatch = useAppDispatch()

    const timestamp = format(new Date(), 'yyyyMMdd');
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
                params: {offset: (page - 1) * 50, limit: 50},
            }, {
                headers: {'Content-Type': 'application/json', 'X-Auth': authString}
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

    const openFilterForm = () => {
        setIsOpenForm(!isOpenForm)
    }

    const fetchProductDetails = async (ids: string[]) => {
        try {
            const uniqueIds = new Set(ids);
            const uniqueProductIds = Array.from(uniqueIds);

            const response = await axios.post(API_URL, {
                action: 'get_items',
                params: {ids: uniqueProductIds}
            }, {
                headers: {'Content-Type': 'application/json', 'X-Auth': authString}
            });

            const data = response.data;
            const uniqueProducts: Product[] = [];

            const productsMap: { [key: string]: Product } = {};
            data.result.forEach((item: Product) => {
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
            console.error('Возникла ошибка: ', error);
        }
    };


    return (
        <div className="App" style={isOpenForm ? { height: '100vh', overflowY: 'hidden'} : {}}>
            <div className="title">
                <h1>Ювелирные изделия</h1>
                <span>Кол-во товара: {products.length}</span>
            </div>
            <SearchFrom/>
            <div className="filterWrapper">
                <span className="warning">Изображения являются фейковой загрузкой и не отображают реальный товар, написаный в названии!</span>
                <span
                    onClick={openFilterForm}
                    className="filterBtn"
                >
                    <BsFilter style={{fontSize: 20}}/>
                    Фильтры
                </span>
                <FilterForm collapsed={isOpenForm} setOpenForm={openFilterForm}/>
            </div>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <>
                    <ProductList/>
                    <Pagination/>
                </>
            )}
        </div>
    );
};

export default App;
