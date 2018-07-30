import React from 'react'
import Store from '../Store/Store'
import PropTypes from 'prop-types'
import styles from './storeList.scss'


class StoreList extends React.Component {

    static propTypes = {
        highlightStore: PropTypes.number,
        items: PropTypes.array,
        storeAction: PropTypes.func,
        onStoreSelect: PropTypes.func,
        chooseThisStore: PropTypes.string,
    };

    stores = {};

    componentDidUpdate(prevProps) {
        if (prevProps.highlightStore !== this.props.highlightStore) {
            this.stores[this.props.highlightStore]
                .scrollIntoView({ behavior: 'smooth' })
        }
    }

    render() {
        const {
            items = [],
            highlightStore,
            storeAction,
            onStoreSelect,
            chooseThisStore,
        } = this.props;

        return (
            <ul className={styles.list}>
                {items.map(item =>
                    <li
                        ref={el => {
                            this.stores[item.code] = el
                        }}
                        key={item.code}
                    >
                        <Store
                            {...item}
                            onStoreSelect={onStoreSelect}
                            onStoreAction={storeAction}
                            highlight={highlightStore === item.code}
                            chooseThisStore={chooseThisStore}
                        />
                    </li>
                )}
            </ul>
        )
    }
}

export default StoreList