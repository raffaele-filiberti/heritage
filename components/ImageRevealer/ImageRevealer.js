import React from 'react';
import styles from './imageRevealer.scss';
import classNames from "classnames/bind";
import imgix from "../Global/imgix";

const cx = classNames.bind(styles);

class ImageReveal extends React.Component {
    constructor(props) {
        super(props);
        this.divElement = React.createRef();
        this.state = {
            width: 0,
            height: 0,
        };
    }

    componentDidMount() {
        if(this.divElement.current) {
            const bounding = this.divElement.current.getBoundingClientRect();
            this.setState({height: bounding.height, width: bounding.width});
        }
    }

    render() {
        const {src, paragraph, cover, imageRef} = this.props;
        const {height, width} = this.state;

        let imageClass = cx(
            {revealer: true},
            {paragraph: paragraph},
            {cover: cover}
        );

        let url = '';

        if (width && height) {
            url = imgix(src, {w: width, h: height});
        } else if (cover) {
            url = imgix(src, {w: 1200, h: 800});
        }

        return (
            <div className={imageClass} ref={imageRef}>
                <div className={styles.image} ref={this.divElement} style={{backgroundImage: `url(${url})`}}/>
                <div className={styles.sliceContainer}>
                    <div className={styles.slice}/>
                </div>
            </div>
        );
    }
}

export default ImageReveal;
