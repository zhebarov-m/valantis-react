import {setPage} from "../../redux/slices/productSlice.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks.ts";
import styles from './Pagination.module.scss'

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


const Pagination = () => {
    const page = useAppSelector(state => state.products.page)
    const dispatch = useAppDispatch()
    return (
        <div className={styles.navigate}>
            <button onClick={() => dispatch(setPage(page - 1))} disabled={page === 1}>
                <IoIosArrowBack />
            </button>
            <button onClick={() => dispatch(setPage(page + 1))}><IoIosArrowForward /></button>
        </div>
    );
};

export default Pagination;
