import React from 'react';
import ProductItem from '../ProductItem';
import styles from './productList.scss'

const ProductList = ({allEyewears}) => (
    <React.Fragment>
        {allEyewears.map(({id, ...rest}) => (
            <ProductItem
                key={id}
                lazyLoad={false}
                imageWidth={400}
                {...rest}
            />
        ))}
    </React.Fragment>
);

export default ProductList;