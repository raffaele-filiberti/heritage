import React from 'react'
import styles from './titleGroup.scss'
import TitleRevealer from "../TitleRevealer";
import SubtitleRevealer from "../TitleRevealer/SubtitleRevealer";
import imgix from "../Global/imgix";

const TitleGroup = ({watercolor = false, title, subtitle, legal}) => (

    <li className={styles.wrapper}>
        <div className={styles.cover}>
            {watercolor && <img src={imgix(watercolor.url, {w: 400, h: 800, fit: 'clip'})} />
            }
        </div>
        <div className={`${styles.inner} ${legal && styles.legal}`}>
            {subtitle && <SubtitleRevealer subtitle={subtitle}/>}
            <TitleRevealer title={title} split/>
        </div>
    </li>
);

export default TitleGroup