import React from 'react';
import styles from './video.scss';
import {graphql} from "react-apollo";
import {gql} from "apollo-boost";

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            usePoster: false
        };

        this.handleLoaded = this.handleLoaded.bind(this);
        this.checkPoster = this.checkPoster.bind(this);

    }

    componentDidMount() {
        this.video.load();

        if (this.video.readyState >= 3) {
            this.handleLoaded();
        }

        this.posterTimeout = setInterval(this.checkPoster, 4000);
    }

    handleLoaded(e) {
        if (!this.state.loaded) {
            this.setState({loaded: true});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.paused !== nextProps.paused) {
            nextProps.paused ? this.video.pause() : this.video.play()
        }
    }

    componentDidUpdate(nextProps) {
        if (this.props.src !== nextProps.src) {
            this.video.load()
        }
    }

    componentWillUnmount() {
        clearInterval(this.posterTimeout);
    }

    checkPoster() {
        if (this.video.currentTime === 0) {
            this.setState({usePoster: true});
        }
    }

    getPoster() {
        return this.props.poster ? this.props.poster : '';
    }

    render() {
        const {video: {url}} = this.props;
        const display = this.state.loaded && !this.props.hidden;
        const loadStyle = {
            opacity: display ? this.props.opacity : 0,
        };


        return (
            <div className={styles.wrapper}>
                <video className={styles.cover}
                       height={360}
                       width={640}
                       ref={el => this.video = el}
                       loop
                       autoPlay
                       playsInline
                       muted
                       onCanPlay={this.handleLoaded}
                       src={url}
                       style={loadStyle}
                       onTouchStart={() => display ? this.video.play() : false}
                       poster={this.state.usePoster ? this.getPoster() : ''}/>
            </div>
        )
    }
}

export default Video;