import React from 'react';
import TargetGroupFilter from "./FilterTypes/TargetGroupFilter";
import TypeFilter from "./FilterTypes/TypeFilter";
import CollectionFilter from "./FilterTypes/CollectionFilter";
import FrameFilter from "./FilterTypes/FrameFilter";
import ShapeFilter from "./FilterTypes/ShapeFilter";
import styles from './productFilter.scss';
import classNames from "classnames/bind";
import Close from "../Icon/Close";
import IconButton from "../IconButton/IconButton";

const cx = classNames.bind(styles);

const ProductFilter = ({filterCount = 0, filterIsOpen, updateFilters, filters}) => {

    let filterClasses = cx(
        {
            open: filterIsOpen,
        },
        {
            wrapper: true,
        }
    );

    return (
        <div className={filterClasses}>
            <form className={styles.form}>
                <div className={styles.inner}>
                    <div className={styles.group}>
                        <TargetGroupFilter filters={filters.target} updateFilters={updateFilters}/>
                        <TypeFilter filters={filters.type} updateFilters={updateFilters}/>
                    </div>
                    <CollectionFilter filters={filters.collection} updateFilters={updateFilters}/>
                    <div className={styles.group}>
                        <FrameFilter filters={filters.frame} updateFilters={updateFilters}/>
                        <ShapeFilter filters={filters.shape} updateFilters={updateFilters}/>
                    </div>
                </div>
            </form>
        </div>
    )
};
export default ProductFilter;