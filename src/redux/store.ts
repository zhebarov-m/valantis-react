import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/productSlice.ts'

export const store = configureStore({
    reducer: {
        products: productSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
