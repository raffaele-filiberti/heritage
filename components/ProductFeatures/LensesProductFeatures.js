import React from 'react'
import ProductFeature from './ProductFeature';
import styles from './productFeatures.scss';


const ProductFeatures = ({ product, type }) => (
    <li className={styles.wrapper}>
        <ProductFeature feature={ 'Frequency' } value={ product.frequency} />
        <ProductFeature feature={ 'Amount' } value={ product.amount} />
        <ProductFeature feature={ 'Type' } value={ product.type} />
    </li>
);

export default ProductFeatures