import React from 'react';
import Nav from '../Nav';
import Bar from "../Bar";
import Header from "../Header";
import Footer from "../Footer";
import NextHead from 'next/head'
import {ThemeContext} from "../Global/themeContext";
import '../../scss/reset.scss';
import '../../scss/global.scss';


class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openSubMenu: '',
            menuIsOpen: false,
        };

        this.setOpenSubMenu = this.setOpenSubMenu.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen,
            openSubMenu: ''
        })
    }

    setOpenSubMenu(category) {
        const {openSubMenu} = this.state;
        category = category === openSubMenu ? '' : category;

        this.setState({openSubMenu: category})
    }

    render() {
        const {
            currentUrl,
            children,
            isDark,
            isProducts,
            seo: {title = false, description = false},
            filters,
            hideUI,
            filterIsOpen,
            toggleFilter,
            isStore,
            isInfo
        } = this.props;

        const {
            openSubMenu,
            menuIsOpen,
        } = this.state;

        return (
            <main style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: 1,
                backgroundColor: isDark ? '#000' : '#fff'
            }}>
                <NextHead>
                    <title>{title || 'heritage'}</title>
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
                    <meta name="theme-color" content={'#000'}/>
                    <meta name="description" content={description || 'heritage eyewear'}/>
                    <link rel="icon" href="/static/favicon.ico"/>
                    <link rel="manifest" href="/static/manifest.json"/>
                </NextHead>
                <ThemeContext.Provider value={menuIsOpen || isDark}>

                    <Header
                        toggleMenu={this.toggleMenu}
                        menuIsOpen={menuIsOpen}
                        isProducts={isProducts}
                        isStore={isStore}
                        filterIsOpen={filterIsOpen}
                        openSubMenu={openSubMenu}
                        toggleSubMenu={this.setOpenSubMenu}
                        toggleFilter={toggleFilter}/>

                    <Nav
                        currentUrl={currentUrl}
                        openSubMenu={openSubMenu}
                        handleCloseMenu={this.toggleMenu}
                        toggleSubMenu={this.setOpenSubMenu}
                        menuIsOpen={menuIsOpen}/>

                    {!isStore && <Bar/>}

                    {children}

                    {!isStore && <Footer menuIsOpen={menuIsOpen} hideUI={hideUI} isInfo={isInfo}/>}

                </ThemeContext.Provider>
            </main>
        )
    }
}

export default Layout;
