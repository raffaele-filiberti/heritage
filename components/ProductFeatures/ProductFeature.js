import React from 'react'
import styles from './productFeatures.scss';

const ProductFeature = ({ feature, value }) => (
    <div className={styles.line}>
        <dt className={styles.feature}>{ feature }</dt>
        <dd className={styles.value}>{ value }</dd>
    </div>
);

export default ProductFeature