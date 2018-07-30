import React from 'react'
import OpeningHours from '../StoreOpeningHours/StoreOpeningHours'
import PropTypes from "prop-types"
import styles from './store.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Store extends React.Component {

    static propTypes = {
        store: PropTypes.shape({
            code: PropTypes.number,

            storeName: PropTypes.string,
            streetName: PropTypes.string,
            streetNumber: PropTypes.number,
            postalCode: PropTypes.string,
            town: PropTypes.string,
            country: PropTypes.string,
            Monday_Open: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Monday_Close: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Tuesday_Open: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Tuesday_Close: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Wednesday_Open: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Wednesday_Close: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Thursday_Open: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Thursday_Close: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Friday_Open: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Friday_Close: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Saturday_Open: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Saturday_Close: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Sunday_Open: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Sunday_Close: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            onStoreSelect: PropTypes.func,
            onStoreAction: PropTypes.func,
            highlight: PropTypes.number,
            chooseThisStore: PropTypes.string,
        }),
    };

    onStoreClick = (event) => {
        event.preventDefault();

        const {onStoreSelect} = this.props;
        onStoreSelect && onStoreSelect(this.props.code || 0)
    };

    render() {
        const store = this.props;

        const classes = cx(
            styles.item,
            {highlight: store.highlight}
        );

        return (
            <article className={classes}>
                <div className={styles.content}>
                    <a
                        className={styles.link}
                        href="#"
                        onClick={this.onStoreClick}
                    >
                        <h3 className={styles.title} data-min>{store.storeName}</h3>
                        <dl className={styles.location}>
                            <dd>
                                <div>
                                    {store.streetName} {store.streetNumber}
                                </div>
                                <div>
                                    {store.postalCode} {store.town}
                                </div>
                            </dd>
                        </dl>
                    </a>
                </div>
                <div className={styles.openingHours}>
                    <OpeningHours store={store}/>
                </div>
            </article>
        )
    }
}

export default Store