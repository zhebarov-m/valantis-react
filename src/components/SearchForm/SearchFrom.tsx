import React from "react";
import {setPage, setSearch} from "../../redux/slices/productSlice.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks.ts";
import styles from './SearchForm.module.scss'

const SearchFrom = () => {
    const search = useAppSelector(state => state.products.search)
    const dispatch = useAppDispatch()

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(event.target.value));
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setPage(1));
    };

    return (
        <form
            className={styles.searchForm}
            onSubmit={handleSearchSubmit}>
            <input type="text" value={search} onChange={handleSearchChange} placeholder="Введите название"/>
            <button type="submit">Поиск</button>
        </form>
    );
};

export default SearchFrom;
