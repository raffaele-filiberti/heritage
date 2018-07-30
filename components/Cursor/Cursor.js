import React from 'react';
import PropTypes from 'prop-types';
import styles from './cursor.scss';
import classNames from "classnames/bind";
import movingCursor from "../Global/movingCursor";

const cx = classNames.bind(styles);

class Cursor extends React.Component {

    render() {

        const {
            isHover,
            isMouseDown,
            isMin,
            pointer,
            outer,
            isLoading
        } = this.props;

        let cursorClasses = cx(
            {isHover: isHover},
            {isMouseDown: isMouseDown},
            {isMin: isMin},
            {isLoading: isLoading}
        );

        const commonProps = {
            className: cursorClasses, ...styles.pointer,
        };


        return (
                <div className={styles.cursor}>
                    <div className={styles.inner + ' ' + cursorClasses}
                         style={{
                             top: pointer.y + 'px',
                             left: pointer.x + 'px',
                         }}/>
                    <div className={styles.outer + ' ' + cursorClasses}

                         style={{
                             top: outer.y + 'px',
                             left: outer.x + 'px',
                         }}/>
                </div>
        )
    }
}

Cursor.propTypes = {
    pointer: PropTypes.objectOf(PropTypes.number),
    outer: PropTypes.objectOf(PropTypes.number),
    isHover: PropTypes.bool,
    isMouseDown: PropTypes.bool,
    isMin: PropTypes.bool,
};

export default movingCursor(Cursor);