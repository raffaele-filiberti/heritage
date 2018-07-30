import React from 'react';
import styles from './productVariantColor.scss'

const ProductVariantColor = ({
                                 currentProduct,
                                 productType
                             }) => {

    const menuItems = currentProduct.variants.map(v => {
        return (
            <li key={v.id}>
                {/* <Link*/}
                {/*href={{ pathname: `/product`, query: { id: v.id, productType } }}*/}
                {/*as={`/${productType}/${v.id}/`}*/}
                {/*replace*/}
                {/*>*/}
                <a className={styles.link} href="#">

                    {v.lensImage.length > 0 &&
                    <div className={styles.circle + ' ' + styles.lens}>
                        <img src={v.lensImage} alt=""/>
                    </div>
                    }

                    {v.frameImage.length > 0 &&
                    <div className={styles.circle + ' ' + styles.frame}>
                        <img src={v.frameImage} alt=""/>
                    </div>
                    }

                    <div className={styles.variant}>
                        {v.lensColor.length > 0 && <span>{v.lensColor} lens</span> }
                        {v.frameColor.length > 0 && <span>{v.frameColor} frame</span> }
                    </div>
                </a>
            </li>
        )
    });

    return (
        <li className={styles.wrapper}>
            <div className={styles.inner}>
                <h4 className={styles.title}>Available Colors:</h4>
                <ul className={styles.list}>
                    <li className={styles.current}>
                        {/* <Link*/}
                        {/*href={{ pathname: `/product`, query: { id: v.id, productType } }}*/}
                        {/*as={`/${productType}/${v.id}/`}*/}
                        {/*replace*/}
                        {/*>*/}

                            {currentProduct.lensImage.length > 0 &&
                            <div className={styles.circle + ' ' + styles.lens}>
                                <img src={currentProduct.lensImage} alt=""/>
                            </div>
                            }

                            {currentProduct.frameImage.length > 0 &&
                            <div className={styles.circle + ' ' + styles.frame}>
                                <img src={currentProduct.frameImage} alt=""/>
                            </div>
                            }

                            <div className={styles.variant}>
                                {currentProduct.lensColor.length > 0 && <span>{currentProduct.lensColor} lens</span> }
                                {currentProduct.frameColor.length > 0 && <span>{currentProduct.frameColor} frame</span> }
                            </div>
                    </li>

                    {menuItems}
                </ul>
            </div>
        </li>
    )
};

export default ProductVariantColor;