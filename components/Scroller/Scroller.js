import React from 'react';
import styles from './scroller.scss';
import prefix from "prefix";
import classes from "dom-classes";
import {TweenMax} from "gsap";

class Scroller extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            percentage: 0
        };

        this.prefix = prefix('transform');
        this.rAF = undefined;

        this.isRAFCanceled = false;
        this.resizing = false;
        this.cache = null;

        this.vars = {
            ease: 0.05,
            current: 0,
            last: 0,
            target: 0,
            height: 0,
            width: 0,
            bounding: 0,
            timer: null,
            ticking: false,
            onEls: false
        };

        this.dom = {
            listener: null,
            section: React.createRef(),
            divs: []
        };

        this.vs = null;
    }

    componentDidMount() {

        const VS = require('virtual-scroll');

        this.vars = {
            ...this.vars,
            ...{height: window.innerHeight},
            ...{width: window.innerWidth},
        };

        this.vs = new VS({
            limitInertia: false,
            mouseMultiplier: 1,
            touchMultiplier: 1.75,
            firefoxMultiplier: 30,
            preventTouch: false
        });

        this.dom = {
            ...this.dom,
            ...{listener: document.body},
            ...{divs: Array.prototype.slice.call(this.dom.section.current.childNodes, 0)}
        };

        this.dom.section.current.style.width = `${this.vars.width}px`;

        this.addEvents();
        this.resize();
    }

    componentDidUpdate(prevProps) {
        if (this.props.children !== prevProps.children) {
            this.refresh(this.props.isFilter);
        }

        if (this.props.isFilter !== prevProps.isFilter) {

            this.vars.width = this.props.isFilter ? window.innerWidth - 320 : window.innerWidth;
            !this.props.isFilter && (this.vars.target -= 320 );
            TweenMax.to(this.dom.section.current.parentElement, .7, {
                x: this.props.isFilter ? 320 : 0,
            });

            this.resize(this.props.isFilter);

        }
    }

    componentWillUnmount() {
        this.destroy();
    }

    refresh = (isFilter = false) => {
        this.dom = {
            ...this.dom,
            ...{listener: document.body},
            ...{divs: Array.prototype.slice.call(this.dom.section.current.childNodes, 0)}
        };

        this.resize();
    };

    addEvents = () => {

        this.on();

        ['wheel', 'DOMMouseScroll', 'mousewheel'].forEach(event => window.addEventListener(event, this.checkEls));

        window.addEventListener('resize', this.resize)
    };

    removeEvents = () => {

        this.off();

        ['wheel', 'DOMMouseScroll', 'mousewheel'].forEach(event => window.removeEventListener(event, this.checkEls));

        window.removeEventListener('resize', this.resize)
    };

    destroy = () => {
        this.vars.direction === 'vertical' ? classes.remove(this.dom.listener, 'y-scroll') : classes.remove(this.dom.listener, 'x-scroll');
        this.vars.current = 0;
        this.vs && (this.vs.destroy(), this.vs = null);
        this.removeEvents()
    };

    on = (requestAnimationFrame = true) => {

        if (this.isRAFCanceled) {
            this.isRAFCanceled = false
        }

        this.vs && this.vs.on(this.calc);

        requestAnimationFrame && this.requestAnimationFrame()
    };

    off = (cancelAnimationFrame = true) => {

        this.vs && this.vs.off(this.calc);

        cancelAnimationFrame && this.cancelAnimationFrame()
    };

    requestAnimationFrame = () => {

        this.rAF = requestAnimationFrame(this.run)
    };

    cancelAnimationFrame = () => {
        this.isRAFCanceled = true;
        cancelAnimationFrame(this.rAF)
    };

    resize = (isFilter = false) => {
        this.resizing = true;

        this.vars.current = this.vars.last;

        this.getCache();

        this.vars.height = window.innerHeight;

        this.clampTarget();

        this.resizing = false
    };

    checkEls = ({target}) => {

        if (target.classList.contains('remove-events')) {

            if (!this.vars.onEls) {

                this.off();
                this.vars.onEls = true

            }

        } else {
            if (this.vars.onEls) {
                this.on();
                this.vars.onEls = false;
            }
        }
    };

    getCache = () => {

        this.cache = [];

        let totalWidth = 0;

        this.dom.divs.forEach((el, index) => {

            const scrollX = this.vars.target;
            const bounding = el.getBoundingClientRect();
            const bounds = {
                el: el,
                state: false,
                left: bounding.left + scrollX,
                right: bounding.right + scrollX,
                center: bounding.width / 2
            };

            el.classList.add('column');

            totalWidth += bounding.width;

            this.cache.push(bounds)
        });

        this.dom.section.current.style.width = `${this.vars.width}px`;
        this.dom.section.current.style.width = `${this.vars.width}px`;

        this.vars.bounding = totalWidth - this.vars.width;
    };

    inViewport = (el, index) => {

        if (!this.cache || this.resizing) return;

        const cache = this.cache[index];
        const current = this.vars.current;
        const left = Math.round(cache.left - current);
        const right = Math.round(cache.right - current);
        const inView = right > 0 && left < this.vars.width;

        if (inView) {
            if (!el.state) {
                el.classList.add('in-viewport');
                this.cache[index].state = true;
            }
        }
    };

    calc = (e) => {
        const delta = e.deltaX || e.deltaY;

        this.vars.target += delta * -1;

        this.clampTarget();
    };

    clampTarget = () => {
        this.vars.target = Math.round(Math.max(0, Math.min(this.vars.target, this.vars.bounding)));
    };

    getTransform = (value) => {
        return this.vars.direction === 'vertical' ? 'translate3d(0,' + value + 'px,0)' : 'translate3d(' + value + 'px,0,0)'
    };

    run = () => {

        this.dom.divs.forEach(this.inViewport);

        this.dom.section.current.style[this.prefix] = this.getTransform(this.vars.current * -1);

        if (this.isRAFCanceled) return;

        this.vars.current += (this.vars.target - this.vars.current) * this.vars.ease;
        this.vars.current < .1 && (this.vars.current = 0);

        this.requestAnimationFrame();

        this.setState({percentage: this.vars.current / this.vars.bounding || 0});

        this.vars.last = this.vars.current;
    };

    render() {
        const {children, isProductList} = this.props;

        return (
            <div className={styles.scroller}>
                <span className={styles.progress} style={{width:this.vars.width, transform: `scaleX(${this.state.percentage})`}}/>
                <ul className={styles.list} ref={this.dom.section}>
                    {children}
                </ul>
            </div>
        )
    }
}

export default Scroller;