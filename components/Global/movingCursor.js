import React from "react";
import Router from "next/router";

const movingCursor = (Component) => {
    let
        dX = 0,
        dY = 0,
        dXOuter = 0,
        dYOuter = 0,
        xPos = 0,
        yPos = 0,
        xPosOuter = 0,
        yPosOuter = 0,
        isMin = false,
        isMouseDown = false,
        isHover = false;

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.onMouseDown = this.onMouseDown.bind(this);
            this.onMouseUp = this.onMouseUp.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            this.update = this.update.bind(this);
            this.onMouseOver = this.onMouseOver.bind(this);
            this.state = {
                pointer: {x: 0, y: 0},
                outer: {x: 0, y: 0},
                isMin: false,
                isMouseEnter: false,
                isHover: false,
                isLoading: false,
            };
            this.isTouch = false;
            this.mouseX = 0;
            this.mouseY = 0;
        }

        triggerTouch = () => {
            this.isTouch = true;
        };

        componentDidMount() {
            window.addEventListener('touchstart', this.triggerTouch);

            document.addEventListener('mousedown', this.onMouseDown, false);
            document.addEventListener('mouseup', this.onMouseUp, false);
            document.addEventListener('mousemove', this.onMouseMove, false);
            document.addEventListener('mouseover', this.onMouseOver, false);

            this.setState({
                pointer: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                },
                outer: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                }
            });
            this.mouseX = window.innerWidth / 2;
            this.mouseY = window.innerHeight / 2;

            requestAnimationFrame(this.update);

            Router.onRouteChangeStart = url => {
                console.log('start ' + url)
                this.setState({isLoading: true})
            };

            Router.onRouteChangeComplete = () => {
                console.log('complete')
                this.setState({isLoading: false})
            }
        }

        componentWillUnmount() {
            window.removeEventListener('touchstart', this.triggerTouch);
            document.removeEventListener('mousedown', this.onMouseDown, false);
            document.removeEventListener('mouseup', this.onMouseUp, false);
            document.removeEventListener('mousemove', this.onMouseMove, false);

            cancelAnimationFrame(this.update);
        }

        onMouseOver(e) {
            if (e.target.dataset.mouse) {

                isHover = true;

            } else if (e.target.dataset.min) {

                isMin = true;

            } else {

                isHover = false;
                isMin = false;

            }
        }

        onMouseDown() {
            isMouseDown = true
        }

        onMouseUp() {
            isMouseDown = false
        }

        update() {
            dX = this.mouseX - this.state.pointer.x;
            dY = this.mouseY - this.state.pointer.y;
            dXOuter = this.mouseX - this.state.outer.x;
            dYOuter = this.mouseY - this.state.outer.y;

            xPos = this.state.pointer.x + dX * 0.6;
            yPos = this.state.pointer.y + dY * 0.6;
            xPosOuter = this.state.outer.x + dXOuter * 0.15;
            yPosOuter = this.state.outer.y + dYOuter * 0.15;

            this.setState({
                pointer: {
                    x: xPos,
                    y: yPos,
                },
                outer: {
                    x: xPosOuter,
                    y: yPosOuter,
                },
                isMouseDown,
                isHover,
                isMin
            });

            requestAnimationFrame(this.update);
        }

        onMouseMove(e) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }

        render() {
            const {forwardedRef, ...rest} = this.props;
            return !this.isTouch && <Component {...this.state} ref={forwardedRef} {...rest} />;
        }
    }
};

export default movingCursor;