import React from 'react';
import styles from './productItem.scss';
import Link from 'next/link';
import Button from "../Button/Button";
import imgix from "../Global/imgix";

const ProductItem = ({
                         id,
                         code,
                         slug,
                         style,
                         series,
                         name,
                         image: {url}, alt = '', width,
                         collection
                     }) => (
    <li className={styles.wrapper}>
        <div className={styles.inner}>

            <Link as={`/products/${slug}`} href={`/product?slug=${slug}`} prefetch>
                <a className={styles.link} data-min>
                    <div className={styles.img}>
                        <img
                            src={imgix(url, {w: 400, h: 400, fit: 'clip'})}
                            alt={alt}
                        />
                    </div>
                    <div className={styles.header}>
                        <Button title={name}
                                className={styles.model}
                                forced
                        />
                        <div className={styles.brand}>
                            <h4 className={styles.collection}>{collection.name}</h4>
                            <h4 className={styles.series}>{series.name}</h4>
                        </div>
                    </div>
                </a>
            </Link>

        </div>
    </li>
);

export default ProductItem