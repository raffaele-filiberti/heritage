import React, {Component} from 'react';
import getMousePosition from '../utils/getMousePosition';

export default function mouseTranslate(
    WrappedComponent,
    btnRanges = {
        x: [-20, 20],
        y: [-20, 20]
    }
) {
    return class MouseTranslate extends Component {
        constructor() {
            super();
            this.state = {
                btnTransform: 'translate3d(0, 0, 0)',
            };
            this.interval = null;
            this.isTouch = false;
        }

        componentDidMount() {
            window.addEventListener('touchstart', this.triggerTouch);
        }

        componentWillUnmount() {
            clearInterval(this.interval);
            window.removeEventListener('touchstart', this.triggerTouch);
        }

        triggerTouch = () => {
            this.isTouch = true;
        };

        position3dFunction = () => {
            if (this.isTouch) {
                return;
            }
            if (typeof this.relMousePos !== 'undefined') {
                const bounds = this.el.getBoundingClientRect();
                this.setState({
                    btnTransform: getTransform(this.relMousePos, bounds, btnRanges),
                });
            }
        };

        handleMouseEnter = () => {
            if (this.isTouch) {
                return;
            }
            this.interval = setInterval(this.position3dFunction,100);
        };

        handleMouseMove = e => {
            let mousePos = getMousePosition(e),
                docScrolls = {
                    left: document.body.scrollLeft + document.documentElement.scrollLeft,
                    top: document.body.scrollTop + document.documentElement.scrollTop,
                },
                bounds = this.el.getBoundingClientRect();

            // Mouse position relative to the main element
            this.relMousePos = {
                x: mousePos.x - bounds.left- docScrolls.left,
                y: mousePos.y - bounds.top - docScrolls.top,
            };
        };

        handleMouseLeave = () => {
            clearInterval(this.interval);
            this.setState({
                btnTransform: 'translate3d(0, 0, 0)',
            });
        };

        render() {
            return (
                <div
                    onMouseMove={this.handleMouseMove}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    ref={el => {
                        this.el = el;
                    }}
                >
                    <WrappedComponent
                        {...this.props}
                        btnTransform={this.state.btnTransform}
                    />
                </div>
            );
        }
    };
}

function getTransform(relMousePos, bounds, ranges) {
    const vals = {
        x: (ranges.x[1] - ranges.x[0]) / bounds.width * relMousePos.x + ranges.x[0],
        y: (ranges.y[1] - ranges.y[0]) / bounds.height * relMousePos.y + ranges.y[0],
    };

    return `translate3d(${vals.x}px, ${vals.y}px, 0)`;
}