import React from 'react'
import styles from './headingGroup.scss'
import TitleRevealer from "../TitleRevealer";
import ImageReveal from "../ImageRevealer/ImageRevealer";
import SubtitleRevealer from "../TitleRevealer/SubtitleRevealer";

const HeadingGroup = ({image: {url = false} = false, title, subtitle, legal}) => (

    <li className={styles.wrapper}>
        <div className={styles.cover}>
            {url &&
            <ImageReveal
                src={url}
                paragraph
                cover
            />
            }
        </div>
        <div className={`${styles.inner} ${legal && styles.legal}`}>
            {subtitle && <SubtitleRevealer subtitle={subtitle}/>}
            <TitleRevealer title={title} split/>
        </div>
    </li>
);

export default HeadingGroup