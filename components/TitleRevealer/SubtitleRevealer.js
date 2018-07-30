import React from "react";
import styles from './titleRevealer.scss';
import classNames from "classnames/bind";
import Link from 'next/link';

const cx = classNames.bind(styles);

const SubtitleRevealer = React.forwardRef(({subtitle = false, collection}, ref) => {

    let subtitleClass = cx(
        {collection: collection},
        {revealerSubtitle: true}
    );

    return (
        <div className={subtitleClass}>
            <h4 className={styles.subtitle} ref={ref}>
                {subtitle ?

                    <span>{subtitle}</span> :
                    <span>
                        <Link href={'/collections'}>
                            <a data-min>
                                collections
                            </a>
                        </Link>
                        <i> · </i>
                        <Link as={`/collections/${collection.slug}`} href={`/collection?slug=${collection.slug}`}>
                            <a data-min>
                                {collection.name}
                            </a>
                        </Link>
                    </span>
                }
            </h4>
        </div>
    )
});

export default SubtitleRevealer;