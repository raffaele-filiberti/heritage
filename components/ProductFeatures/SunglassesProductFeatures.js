import React from 'react'
import ProductFeature from './ProductFeature';
import styles from './productFeatures.scss';


const ProductFeatures = ({product: {frame, shape, polarized}}) => (
    <li className={styles.wrapper}>
        <div className={styles.inner}>
            <div className={styles.header}>
                <h4 className={styles.title}>Features</h4>
            </div>
            <div className={styles.body}>
                <ProductFeature feature={'Frame Shape'} value={frame.name}/>
                <ProductFeature feature={'Material'} value={shape.name}/>
                <ProductFeature feature={'Polarized'} value={polarized ? 'true' : 'false'}/>
            </div>
        </div>
    </li>
);

export default ProductFeatures