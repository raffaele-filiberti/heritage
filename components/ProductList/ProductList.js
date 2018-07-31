import React from 'react';
import ProductItem from '../ProductItem';

const ProductList = ({allEyewears, params}) => (
    <React.Fragment>
        {allEyewears.map(({id, ...rest}) => (
            <ProductItem
                key={id}
                params={params}
                {...rest}
            />
        ))}
    </React.Fragment>
);

export default ProductList;