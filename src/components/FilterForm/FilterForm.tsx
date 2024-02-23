import React, {useState} from 'react';
import styles from './FilterForm.module.scss';
import SearchForm from '../SearchForm/SearchFrom.tsx';
import {useAppDispatch} from "../../redux/hooks/hooks.ts";
import {setFilterByPrice} from "../../redux/slices/productSlice.ts";
import { GiTireIronCross } from "react-icons/gi";

interface FilterFormProps {
    collapsed: boolean;
    setOpenForm: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({collapsed, setOpenForm,}) => {
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const dispatch = useAppDispatch()


    const handleFilterByPrice = () => {
        dispatch(setFilterByPrice([minPrice, maxPrice]));
    };

    return (
        <div className={collapsed ? styles.overlayVis : styles.overlayNotVis}>
            <div className={`${styles.filterForm} ${collapsed ? styles.collapsed : ''}`}>
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h1>Фильтр</h1>
                        <GiTireIronCross
                            className={styles.cross}
                            onClick={setOpenForm}/>
                    </div>
                    <h3>Поиск:</h3>
                    <SearchForm/>
                    <h3>Цена, ₽:</h3>
                    <form>
                        <div style={{display: 'flex', justifyContent: 'center', gap: 10, margin: '30px 0'}}>
                            <label htmlFor="price1">
                                От:
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(parseFloat(e.target.value))}
                                />
                            </label>
                            <label htmlFor="price2">
                                До:
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                                />
                            </label>
                        </div>
                        <button style={{width: '100%'}} type="button" onClick={handleFilterByPrice}>
                            Применить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FilterForm;
