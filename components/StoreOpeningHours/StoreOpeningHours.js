import * as React from 'react'
import styles from './storeOpeningHours.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const validHourRegex = /\d{3,4}/;

const formatHour = (hour) => {
    if (!hour) return '';
    hour = hour.toString();
    hour = hour.length === 3 ? `0${hour}` : hour;
    if (validHourRegex.test(hour)) {
        const hours = hour.length === 4 ? hour.slice(0, 2) : `0${hour.slice(0, 1)}`;
        const minutes = hour.length === 4 ? hour.slice(2) : hour.slice(1);
        return `${hours}:${minutes}`
    } else {
        return 'unknown'
    }
};

const getOpeningHours = (open, close) => !open || !close ? 'closed' : `${formatHour(open)} - ${formatHour(close)}`;

const StoreOpeningHours = ({store}) => {

    const sunday = cx(
        styles.time,
        {closed: getOpeningHours(store.Sunday_Open, store.Sunday_Close) === 'closed'}
    );
    return (
        <dl className={styles.container}>
            <div className={styles.days}>
                <dt className={styles.day}>Monday</dt>
                <dt className={styles.day}>Tuesday</dt>
                <dt className={styles.day}>Wednesday</dt>
                <dt className={styles.day}>Thursday</dt>
                <dt className={styles.day}>Friday</dt>
                <dt className={styles.day}>Monday</dt>
                <dt className={styles.day}>Sunday</dt>
            </div>
            <div className={styles.times}>
                <dd className={styles.time}>
                    {getOpeningHours(store.Monday_Open, store.Monday_Close)}
                </dd>
                <dd className={styles.time}>
                    {getOpeningHours(store.Tuesday_Open, store.Tuesday_Close)}
                </dd>
                <dd className={styles.time}>
                    {getOpeningHours(store.Wednesday_Open, store.Wednesday_Close)}
                </dd>
                <dd className={styles.time}>
                    {getOpeningHours(store.Thursday_Open, store.Thursday_Close)}
                </dd>
                <dd className={styles.time}>
                    {getOpeningHours(store.Friday_Open, store.Friday_Close)}
                </dd>
                <dd className={styles.time}>
                    {getOpeningHours(store.Saturday_Open, store.Saturday_Close)}
                </dd>
                <dd className={sunday}>
                    {getOpeningHours(store.Sunday_Open, store.Sunday_Close)}
                </dd>
            </div>
        </dl>
    );
};

export default StoreOpeningHours