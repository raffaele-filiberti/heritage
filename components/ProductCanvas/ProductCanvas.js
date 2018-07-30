import React from 'react';
import styles from './productCanvas.scss'
import imgix from "../Global/imgix";

const ProductCanvas = ({
                           image: {url, alt}
                       }) => {
    return (
        <li className={styles.wrapper}>
            <div className={styles.inner}>
                <img className={styles.img} src={imgix(url, {w: 500, h: 500, fit: 'clip'})} alt={alt}/>
            </div>
        </li>
    )
};

export default ProductCanvas;