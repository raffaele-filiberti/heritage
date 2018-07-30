import React from 'react';
import styles from './slide.scss';
import View from "../Icon/View";
import IconButton from "../IconButton";
import {MB, MD} from "../ResponsiveWrapper/Responsive";
import Link from 'next/link';

const SlideBtn = React.forwardRef(({slug, id, types}, ref) => (

    <div className={styles.btnWrapper}>
        <div className={styles.btnInner} ref={ref}>
            <MB>
                <Link href={`/products?collection=${id}`} prefetch>
                    <IconButton title={'collection'}>
                        <View/>
                    </IconButton>
                </Link>
            </MB>
            <MD>
                <svg className={styles.svg}>
                    <circle
                        stroke="rgba(255,255,255,0.12)"
                        fill="transparent"
                        strokeDasharray={ `352 56 215 56 352 56`}
                        strokeDashoffset={244}
                        strokeWidth={ 1 }
                        r={ 173 }
                        cx={ 175 }
                        cy={ 175 }
                    />
                </svg>
                <Link as={`/collections/${slug}`} href={`/collection?slug=${slug}`} prefetch>
                    <IconButton title={'collection'} top style={{position: 'absolute', top: '-28px', left: '146px'}}>
                        <View/>
                    </IconButton>
                </Link>
                <span className={styles.preface}>continue<br/>with</span>
                {types.map((t, index) => (
                    <Link key={index} href={`/products?collection=${id}&type=${t.id}`} prefetch>
                        <IconButton title={t.slug} bottom
                                    style={{position: 'absolute', top: '270px', left: index ? '270px' : '24px'}}>
                            <View/>
                        </IconButton>
                    </Link>
                ))}
            </MD>
        </div>
    </div>
));


export default SlideBtn;