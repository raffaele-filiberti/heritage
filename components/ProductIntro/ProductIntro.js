import React from 'react';
import styles from './productIntro.scss'
import TitleRevealer from "../TitleRevealer/TitleRevealer";
import ScrollableText from "../Global/ScrollableText";
import SubtitleRevealer from "../TitleRevealer/SubtitleRevealer";

const ProductIntro = ({
                          name,
                          description,
                          collection,
                      }) => {
    return (
        <li className={styles.wrapper}>
            <div className={styles.inner}>
                <SubtitleRevealer collection={collection} />
                <TitleRevealer title={name} split/>

            </div>
            <div className={styles.descWrapper}>
                <div className={styles.descInner}>
                    <ScrollableText className={styles.desc + ' text'} text={description}/>
                </div>
            </div>
        </li>
    )
};

export default ProductIntro;