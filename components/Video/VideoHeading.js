import React from 'react';
import styles from './video.scss';
import Button from "../Button/Button";
import Link from 'next/link';

const VideoHeading = ({isError, statusCode}) => (
    <div className={styles.heading}>
        <div className={styles.center}>

            <Link href={'/content?slug=philosophy'} as={'/philosophy'} prefetch>
                <Button
                    title={'Philosophy'}
                    className={styles.bordered}
                    link
                />
            </Link>

            {
                isError ?
                    statusCode
                        ? <span className={styles.preface}>Ops!<br/>An error {statusCode}<br/>occurred on server</span>
                        : <span className={styles.preface}>Ops!<br/>An error occurred<br/>on client</span>
                    : <span className={styles.preface}>discover<br/>our</span>
            }

            <Link href={'/collections'} prefetch>
                <Button title={'Collections'}
                        className={styles.bordered}
                        link
                />
            </Link>
        </div>
    </div>
);

export default VideoHeading