import React from 'react';
import styles from './nav.scss';
import classNames from "classnames/bind";
import Transition from 'react-transition-group/Transition';
import Router from 'next/router';
import Button from "../Button/Button";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import {LG, ML} from "../ResponsiveWrapper/Responsive";
import imgix from "../Global/imgix";
import Link from "next/link";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const cx = classNames.bind(styles);

export const MENU_ITEMS = gql`{
menuItems: allMenuItems(filter: {parent: {exists: false}}) {
    title
    asPath: slug
    image {
          url
          }
    links: children {
      title
      asPath: slug
    }
  }
}`;

function normalize(items, currentUrl = '') {
    let normalizedItems = {...items};

    if (currentUrl.length > 0) {
        switch (items.asPath) {
            case null:
                normalizedItems.asPath = `/collections`;
                normalizedItems.path = `/collections`;
                break;

            default:
                if (currentUrl === 'Collections') {
                    normalizedItems.asPath = `/collections/${items.asPath}`;
                    normalizedItems.path = `/collection?slug=${items.asPath}`;
                } else {
                    normalizedItems.asPath = `/${items.asPath}`;
                    normalizedItems.path = `/content?slug=${items.asPath}`;
                }
                break;
        }
    } else {
        switch (items.asPath) {

            case 'store-locator':
                normalizedItems.asPath = `/${items.asPath}`;
                normalizedItems.path = `/${items.asPath}`;
                break;

            default:
                normalizedItems.asPath = `/${items.asPath}`;
                normalizedItems.path = `/content?slug=${items.asPath}`;
                normalizedItems.swallow = true;
                break;
        }
    }

    return normalizedItems
}

const Nav = ({
                 currentUrl,
                 toggleSubMenu,
                 openSubMenu,
                 handleCloseMenu,
                 menuIsOpen
             }) => {

    let navClasses = cx(
        {
            open: menuIsOpen,
        },
        {
            menu: true,
        }
    );

    let innerClasses = cx(
        {
            open: openSubMenu,
        },
        {
            inner: true,
        }
    );

    return (
        <div className={navClasses}>
            <nav className={styles.wrapper}>

                <Query query={MENU_ITEMS}>

                    {({loading, data: {menuItems}}) => {

                        return (
                            <div className={innerClasses}>

                                <ReactCSSTransitionGroup
                                    transitionName="example"
                                    transitionEnterTimeout={1500}
                                    transitionLeaveTimeout={1500}
                                    component={"div"}
                                    className={styles.links}>

                                    {menuItems.map((i, index) =>

                                        menuIsOpen && <Item
                                            key={index}
                                            {...normalize(i)}
                                            currentUrl={currentUrl}
                                            toggleSubMenu={toggleSubMenu}
                                            openSubMenu={openSubMenu}
                                            handleCloseMenu={handleCloseMenu}
                                        />
                                    )}

                                </ReactCSSTransitionGroup>

                                <div className={styles.submenus}>

                                    {menuItems.map(({title, links}, index) =>
                                        links.length > 0 && <SubMenu
                                            key={index}
                                            currentUrl={currentUrl}
                                            subMenu={links}
                                            visible={openSubMenu === title}
                                            openSubMenu={openSubMenu}
                                            handleCloseMenu={handleCloseMenu}
                                        />
                                    )}

                                </div>
                            </div>
                        )

                    }}
                </Query>

                <div className={styles.footer}>
                    <span>
                        <Link as={'/cookie-policy'} href={'/legal?slug=cookie-policy'}>
                            <a className={'baseLink'} data-min>Cookie Policy</a>
                        </Link>
                        <Link as={'/privacy-policy'} href={'/legal?slug=privacy-policy'}>
                            <a className={'baseLink'} data-min>Privacy Policy</a>
                        </Link>
                        <Link as={'/terms-and-conditions'} href={'/legal?slug=terms-and-conditions'}>
                            <a className={'baseLink'} data-min>Terms & Conditions</a>
                        </Link>
                    </span>
                </div>
            </nav>
        </div>
    );
};

class Item extends React.Component {

    render() {

        const {links = []} = this.props;
        const Component = links.length > 0 ? SubMenuToggle : NavigationLink;

        return (
            <Component {...this.props} />
        )
    }
}

const SubMenuToggle = ({
                           subMenu,
                           title,
                           openSubMenu,
                           toggleSubMenu,
                           image: {url},
                       }) => {
    const bg = (
        <div className={`${styles.bg} ${openSubMenu === title ? styles.bgActive : ''}`}
             style={{
                 background: `url(${imgix(url, {w: 250, h: 850})}) center center no-repeat`,
                 backgroundSize: 'cover'
             }}>
            <div className={styles.bgOverlay}/>
            <Button
                className={styles.link}
                onClick={() => toggleSubMenu(title)}
                active={openSubMenu === title}
                title={title}/>
        </div>
    );

    const btn = (
        <Button
            className={styles.link}
            onClick={() => toggleSubMenu(title)}
            active={openSubMenu === title}
            title={title}/>
    );

    return (
        <React.Fragment>
            <LG>{url ? bg : btn}</LG>
            <ML>{btn}</ML>
        </React.Fragment>
    );
};

const NavigationLink = ({
                            asPath,
                            currentUrl = '',
                            title = '', path,
                            handleCloseMenu,
                            isSubLink,
                            swallow,
                            image: {url} = false,
                        }) => {
    const bg = (
        <div className={`${styles.bg} ${currentUrl === asPath ? styles.bgActive : ''}`}
             style={{
                 background: `url(${imgix(url, {w: 250, h: 850})}) center center no-repeat`,
                 backgroundSize: 'cover'
             }}>
            <div className={styles.bgOverlay}/>
            <Button
                className={isSubLink ? styles.subLink : styles.link}
                onClick={(e) => {
                    e.preventDefault();
                    Router.push(path, asPath, {swallow: swallow})
                }}
                active={currentUrl === asPath}
                title={title}
                link
            />
        </div>
    );

    const btn = (
        <Button
            className={isSubLink ? styles.subLink : styles.link}
            onClick={(e) => {
                e.preventDefault();
                Router.push(path, asPath, {swallow: swallow})
            }}
            active={currentUrl === asPath}
            title={title}
            link
        />
    );

    return (
        <React.Fragment>
            <LG>{url ? bg : btn}</LG>
            <ML>{btn}</ML>
        </React.Fragment>
    );

};


let subMenuClasses = cx(
    {
        submenu: true
    }
);

const duration = 500;

const defaultStyle = {
    display: 'block',
    transition: `visibility ${duration}ms, opacity ${duration}ms ease-in-out`,
    opacity: 0,
};

const transitionStyles = {
    entering: {opacity: 0, display: 'block', visibility: 'hidden'},
    entered: {opacity: 1, display: 'block', visibility: 'visible'},
    exiting: {opacity: 0, display: 'block', visibility: 'hidden'},
};

class SubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 1024,
        }
    }

    componentDidMount() {
        this.setState({width: window.innerWidth});
        window.addEventListener('resize', () => this.setState({width: window.innerWidth}));
    }

    render() {
        const {
            subMenu,
            visible,
            openSubMenu,
            ...rest
        } = this.props;

        return (
            <Transition in={visible} timeout={duration} unmountOnExit={this.state.width < 1024}>
                {(state) => (
                    <div className={subMenuClasses} style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        {subMenu.map((link, index) =>
                            <NavigationLink
                                key={index}
                                {...normalize(link, openSubMenu)}
                                {...rest}
                                isSubLink
                            />
                        )}
                    </div>
                )}
            </Transition>
        )
    };
}

export default Nav;