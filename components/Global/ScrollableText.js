import React from 'react'
import {TweenMax} from "gsap";
import ReactMarkdown from 'react-markdown';

class ScrollableText extends React.Component {
    constructor(props) {
        super(props);
        this.txt = React.createRef();
        this.init = this.init.bind(this);
        this.wheel = this.wheel.bind(this);
        this.start = this.start.bind(this);
        this.move = this.move.bind(this);

    }

    componentDidUpdate(nextProps) {
        if (this.props.text !== nextProps.text) {
            this.init();
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.init, false);
        this.init();
    }

    init() {
        //reset scroller position
        TweenMax.to(this.txt.current.firstChild, 0, {y: 0});

        //reset vars
        this.last = 0;
        this.current = 0;
        this.target = 0;
        this.bounding = 0;
        this.last = 0;

        const innerBounds = this.txt.current.firstChild.getBoundingClientRect();
        const outerBounds = this.txt.current.getBoundingClientRect();

        if (innerBounds.height > outerBounds.height) {
            this.bounding = innerBounds.height - outerBounds.height + (innerBounds.top - outerBounds.top);
            this.txt.current.classList.add('remove-events')
        }
        else {
            this.bounding = 0
        }
    }

    transform = () => {
        this.current += this.target - this.current;
        this.current < .1 && (this.current = 0);
        TweenMax.to(this.txt.current.firstChild, 0, {y: this.current * -1})
    };

    clampTarget = () => {
        this.target = Math.round(Math.max(0, Math.min(this.target, this.bounding)));
    };

    wheel(e) {
        e.preventDefault();
        this.target += e.deltaY * -1;
        this.clampTarget();
        this.transform();
    }

    start(e) {
        let touches = e.changedTouches ? e.changedTouches[0] : e;
        e.preventDefault();
        e.stopPropagation();
        this.last = touches.pageY;
    }

    move(e) {
        e.preventDefault();
        let touches = e.changedTouches ? e.changedTouches[0] : e;
        this.target += (touches.pageY - this.last) * -1;
        this.last = touches.pageY;
        this.clampTarget();
        this.transform();
        e.stopPropagation();
    }

    render() {
        const {
            text,
            children,
            className
        } = this.props;

        return (
            <div className={className}
                 ref={this.txt}
                 onWheel={this.wheel}
                 onTouchStart={this.start}
                 onTouchMove={this.move}
            >
                <ReactMarkdown
                    className={'scroller'}
                    source={text}
                />
            </div>
        )
    }
}

export default ScrollableText