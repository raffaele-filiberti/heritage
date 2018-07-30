import React from 'react'
import ProductFeature from './ProductFeature';
import styles from './productFeatures.scss';
import TitleRevealer from "../TitleRevealer/TitleRevealer";

const ProductFeatures = ({product: {frame, shape}}) => (
    <li className={styles.wrapper}>
        <div className={styles.inner}>
            <div className={styles.header}>
                <TitleRevealer title={'Features'}/>
            </div>
            <div className={styles.body}>
                <ProductFeature feature={'Frame Shape'} value={shape.name}/>
                <ProductFeature feature={'Material'} value={frame.name}/>
            </div>
        </div>
    </li>
);

export default ProductFeatures