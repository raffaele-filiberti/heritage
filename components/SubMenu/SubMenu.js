import React from 'react';
import './subMenu.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {NavigationLink, normalize} from "../Nav/Nav";
import {LG, ML} from "../ResponsiveWrapper/Responsive";

const SubMenu = ({
                     subMenu,
                     visible,
                     openSubMenu,
                     className,
                     ...rest,
                 }) => (

    <ReactCSSTransitionGroup
        transitionName="submenu"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={800}
        component={"div"}
        className={className}>
        {visible && subMenu.map((link, index) =>
            <React.Fragment>
                <LG>
                    <NavigationLink
                        style={{transitionDelay: `${50 * index}ms`}}
                        key={index}
                        {...normalize(link, openSubMenu)}
                        {...rest}
                        isSubLink
                    />
                </LG>
                <ML>
                    <NavigationLink
                        key={index}
                        {...normalize(link, openSubMenu)}
                        {...rest}
                        isSubLink
                    />
                </ML>
            </React.Fragment>
        )}
    </ReactCSSTransitionGroup>
);

export default SubMenu;