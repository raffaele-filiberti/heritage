import React from 'react'
import PropTypes from 'prop-types';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'
import {MarkerClusterer} from 'react-google-maps/lib/components/addons/MarkerClusterer';
import styles from './googleMaps.scss'
import styledMap from './style.json'

class GMaps extends React.Component {

    static propTypes = {
        markers: PropTypes.array,
        center: PropTypes.object,
        highlight: PropTypes.number,
        onMarkerClick: PropTypes.func,
    };

    map = {};

    state = {
        highlight: null,
        zoomLevel: 7,
    };

    handleMarkerClustererClick = (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers();
        console.log(`Current clicked markers length: ${clickedMarkers.length}`);
    };

    handleMarkerClick = (code) => {
        const {markers, onMarkerClick} = this.props;
        const highlightPos = markers.find(marker => marker.code === code) || {};
        const newZoomLevel = this.state.zoomLevel < 14 ? 14 : this.state.zoomLevel;

        this.map.panTo(highlightPos.position);
        this.setState({zoomLevel: newZoomLevel});

        onMarkerClick && onMarkerClick(code)
    };

    handleZoomChanged = () => {
        this.setState({zoomLevel: this.map.getZoom()})
    };

    componentDidUpdate(prevProps) {
        if (prevProps.highlight !== this.props.highlight) {
            this.handleMarkerClick(this.props.highlight)
        }
    }

    render() {
        return (
            <GoogleMap
                ref={map => {
                    this.map = map
                }}
                zoom={this.state.zoomLevel}
                defaultCenter={this.props.center}
                onZoomChanged={this.handleZoomChanged}
                options={{
                    streetViewControl: false,
                    fullscreenControl: false,
                    styles: styledMap
                }}
            >
                <MarkerClusterer
                    onClick={this.handleMarkerClustererClick}
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {this.props.markers.map(marker =>
                        <Marker
                            key={marker.code}
                            position={marker.position}
                            onClick={() => this.handleMarkerClick(marker.code)}
                        />
                    )}
                </MarkerClusterer>
            </GoogleMap>
        )
    }
}

const GoogleMaps = withScriptjs(withGoogleMap(GMaps));

class DefaultProps extends React.Component {
    render() {
        const props = this.props;
        console.log(process.env.GOOGLE_MAPS_API_KEY);
        return (
            <GoogleMaps
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&v=3.exp`}
                containerElement={<div className={styles.container}/>}
                loadingElement={<div className={styles.loader}/>}
                mapElement={<div className={styles.inner}/>}
                {...props}
            />
        )
    }
}

export default DefaultProps