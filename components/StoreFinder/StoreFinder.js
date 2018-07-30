import * as React from 'react'
import StoreList from '../StoreList/StoreList'
import StoreSearchForm from '../StoreSearch/StoreSearch'
import GoogleMaps from '../GoogleMaps/GoogleMaps'
import Loader from '../Loader/Loader'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-unfetch'
import styles from './storeFinder.scss'
import {LG} from "../ResponsiveWrapper/Responsive";

class StoreFinder extends React.Component {

    static propTypes = {
        storesApiUrl: PropTypes.string,
        googleMapsUrl: PropTypes.string,
        center: PropTypes.object,
        storeAction: PropTypes.func,
        initialValue: PropTypes.string,
        title: PropTypes.string,
        noResultText: PropTypes.string,
        placeholderText: PropTypes.string,
        chooseThisStore: PropTypes.string,
    };

    static defaultProps = {
        title: 'Find your store',
        noResultText: 'No Stores found for your query',
        placeholderText: 'Postal code, city or town',
        chooseThisStore: 'Choose this store',
    };

    state = {
        isLoading: true,
        search: this.props.initialValue || '',
        allStores: [],
        stores: [],
        selectedStore: null,
        highlightStore: null,
    };

    searchStore(store, query) {
        return Object.keys(store).some(key => {
            const value = store[key];
            if (typeof value === 'string' || typeof value === 'number') {
                const string = value.toString();
                return string.toLowerCase().includes(query.toLowerCase())
            }
            return false
        })
    }

    updateSearchQuery = query => {
        this.setState({search: query})
    };

    onSearchSubmit = (event) => {
        event.preventDefault();
        this.commitSearch()
    };

    commitSearch = () => {
        const {allStores, search} = this.state;
        const nextStores = allStores.filter(store => this.searchStore(store, search));
        this.setState({stores: nextStores}, () => window.history.replaceState({}, 'store-locator', `/store-locator?search=${search}`))
    };

    componentDidMount() {

        fetch(`${this.props.storesApiUrl}/list`)
            .then(response => response.json())
            .then(stores => {
                this.setState(
                    {
                        isLoading: false,
                        allStores: stores,
                        stores: stores
                    },
                    () => {
                        if (this.props.initialValue !== '') {
                            this.commitSearch()
                        }
                    })
            })
            .catch(err => console.error(err))
    }

    render() {
        const {
            stores,
            highlightStore,
            isLoading,
            search,
        } = this.state;
        const {
            center,
            storeAction,
            noResultText,
            title,
            placeholderText,
            chooseThisStore,
        } = this.props;
        const markers = stores.map(store => ({
            position: {lat: store.lat * 1, lng: store.lon * 1},
            code: store.code
        }));

        return (
            <div className={styles.wrapper}>
                <article className={styles.inner}>
                    <main className={styles.stores}>
                        <h2 className={styles.title}>{title}</h2>
                        <StoreSearchForm
                            onQueryChange={this.updateSearchQuery}
                            onFormSubmit={this.onSearchSubmit}
                            initialValue={search}
                            placeholder={placeholderText}
                        />
                        {isLoading && (
                            <div className={styles.loader}>
                                <Loader/>
                            </div>
                        )}
                        {stores.length > 0 && (
                            <StoreList
                                items={stores}
                                highlightStore={highlightStore}
                                onStoreSelect={code => this.setState({highlightStore: code})}
                                storeAction={storeAction}
                                chooseThisStore={chooseThisStore}
                            />
                        )}
                        {stores.length === 0 &&
                        !isLoading && (
                            <h2 className={styles.message}>
                                {noResultText}
                            </h2>
                        )}
                    </main>
                    <LG>
                        <aside className={styles.map}>
                            <GoogleMaps
                                ref={maps => {
                                    this.maps = maps
                                }}
                                center={center}
                                markers={markers}
                                onMarkerClick={code => {
                                    this.setState({highlightStore: code})
                                }}
                                highlight={this.state.highlightStore}
                            />
                        </aside>
                    </LG>
                </article>
            </div>
        )
    }
}

export default StoreFinder