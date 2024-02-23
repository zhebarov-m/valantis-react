import {setPage} from "../../redux/slices/productSlice.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks.ts";

const Pagination = () => {
    const page = useAppSelector(state => state.products.page)
    const dispatch = useAppDispatch()
    return (
        <div>
            <button onClick={() => dispatch(setPage(page - 1))} disabled={page === 1}>
                Previous
            </button>
            <button onClick={() => dispatch(setPage(page + 1))}>Next</button>
        </div>
    );
};

export default Pagination;
