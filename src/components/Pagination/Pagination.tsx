import {setPage} from "../../redux/slices/productSlice.ts";
import {useAppSelector} from "../../redux/hooks/hooks.ts";

const Pagination = () => {
    const page = useAppSelector(state => state.products.page)
    return (
        <div>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
            </button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default Pagination;
