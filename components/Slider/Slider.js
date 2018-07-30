import React from 'react';
import styles from './slider.scss';
import Slide from '../Slide';
import ReactTransitionGroup from 'react-addons-transition-group'
import {gql} from "apollo-boost";
import {graphql} from "react-apollo";
import IconButton from "../IconButton/IconButton";
import Arrow from "../Icon/Arrow";
import {TweenMax} from "gsap";
import {Lethargy} from 'lethargy';

class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            direction: null,
            total: props.data.collections.length
        };

        this.isAnimating = false;
        this.dist = 0;
        this.lethargy = new Lethargy();

        this.navigate = this.navigate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.wheel = this.wheel.bind(this);
        this.onEndAnimation = this.onEndAnimation.bind(this);
        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.wheel);
    }

    handleClick({target: {value}}) {
        this.navigate(value)
    }

    navigate(dir = 'next') {
        if (this.isAnimating) return false;

        this.isAnimating = true;

        let {current, total} = this.state;

        this.setState({
            current: dir === 'next' ?
                current < total - 1 ? current + 1 : 0 :
                current > 0 ? current - 1 : total - 1,
            direction: dir
        });
    }

    onEndAnimation() {
        this.isAnimating = false;
    }

    wheel(e) {
        if (this.lethargy.check(e) !== false) {

            const dir = e.deltaY > 0 ? 'next' : 'prev';

            this.navigate(dir);
        }
    };

    start(e) {
        let touches = e.changedTouches ? e.changedTouches[0] : e;
        this.last = touches.clientX;
    }

    move(e) {
    }

    end(e) {

        let touches = e.changedTouches ? e.changedTouches[0] : e;
        this.dist = touches.clientX - this.last;

        this.dist = Math.abs(this.dist) || 0;

        if (this.dist < 100) return;

        e.stopPropagation();

        console.log('start', this.last, Math.abs(this.dist), 'end', touches.clientX);

        if (this.last > touches.clientX) {
            this.navigate('next')
        } else {
            this.navigate('prev')
        }

        this.last = touches.clientX;
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.wheel);
    }

    render() {
        const {current, direction, total} = this.state;
        const {data: {collections, types}} = this.props;
        return (
            <div className={styles.slider}
                 onWheel={(e) => this.wheel(e)}
                 onTouchStart={this.start}
                 onTouchMove={this.move}
                 onTouchEnd={this.end}
                 onMouseDown={this.start}
                 onMouseUp={this.end}
                 onMouseMove={this.move}

            >

                <p className={styles.counter}>slide {current + 1} of {total}</p>

                <ReactTransitionGroup component="div" className={styles.slides}>
                    {collections.map((s, index) =>
                        index === current && <Slide
                            key={index}
                            breadcrumb={`0${index + 1} · collection`}
                            dir={direction}
                            handleEndAnimation={this.onEndAnimation}
                            types={types}
                            {...s}
                        />
                    )}
                </ReactTransitionGroup>

                <div className={styles.nav}>
                    <IconButton onClick={(e) => this.handleClick(e)}
                                value={'prev'}><Arrow/></IconButton>
                    <IconButton onClick={(e) => this.handleClick(e)}
                                value={'next'}><Arrow/></IconButton>
                </div>
            </div>
        )
    }
}

export const collections = gql`{
  collections: allCollections {
    id
    name
    slug
    displayTitle
    image {
      url
      alt
      width
    }
    intro
  }
  types: allTypes {
    id
    slug
  }
}`;

export default graphql(collections)(Slider);
