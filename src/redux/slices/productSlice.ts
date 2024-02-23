import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Product {
    id: string;
    product: string;
    price: number;
    brand: string | null;
}

interface productType {
    products: Product[],
    page: number,
    search: string,
    loading: boolean,
    filterByPrice: number[],
}

const initialState: productType = {
    products: [],
    page: 1,
    search: '',
    loading: false,
    filterByPrice: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setFilterByPrice: (state, action: PayloadAction<number[]>) => {
            state.filterByPrice = action.payload;
        },
    },
});

export const {
    setProducts,
    setPage,
    setSearch,
    setLoading,
    setFilterByPrice,
}  = productsSlice.actions;

export default productsSlice.reducer;
