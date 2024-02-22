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
}

const initialState: productType = {
    products: [],
    page: 1,
    search: '',
    loading: false,
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
    },
});

export const { setProducts, setPage, setSearch, setLoading } = productsSlice.actions;

export default productsSlice.reducer;
