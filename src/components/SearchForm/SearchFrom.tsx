import React from "react";
import {setPage, setSearch} from "../../redux/slices/productSlice.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks.ts";

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
        <form onSubmit={handleSearchSubmit}>
            <input type="text" value={search} onChange={handleSearchChange} placeholder="Search by product name"/>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchFrom;
