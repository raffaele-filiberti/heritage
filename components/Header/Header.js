import React from 'react';
import Burger from "../Burger";
import styles from "./header.scss";
import IconButton from '../IconButton';
import {MB, MD, ML} from "../ResponsiveWrapper/Responsive";
import Grid from "../Icon/Grid";
import Back from "../Icon/Back";
import Logo from "../Icon/Logo";
import Link from "next/link";
import Filter from "../Icon/Filter";
import classNames from 'classnames/bind';
import Check from "../Icon/Check";

const cx = classNames.bind(styles);

const Header = ({
                    isDetail,
                    isProducts,
                    menuIsOpen,
                    toggleMenu,
                    toggleFilter,
                    openSubMenu,
                    toggleSubMenu,
                    isStore,
                    filterIsOpen
                }) => {

    const filterClasses = cx(
        {open: filterIsOpen}
    );

    return (
        <React.Fragment>
            <div className={styles.wrapper + ' ' + styles.left}>
                <div className={styles.inner}>
                    <ML>
                        {openSubMenu !== '' &&
                        <IconButton
                            onClick={() => toggleSubMenu('')}
                            title={'back'}
                            right
                        >
                            <Back/>
                        </IconButton>
                        }
                    </ML>
                    {!isStore && !menuIsOpen && !isProducts && !isDetail &&
                    <Link href={'/products'} prefetch>
                        <IconButton
                            title={'all products'}
                            right
                        >
                            <Grid/>
                        </IconButton>
                    </Link>
                    }
                    {!isStore && !menuIsOpen && !isProducts && isDetail &&
                    <Link href={{ pathname: '/products', query: isDetail }} prefetch>
                        <IconButton
                            title={'back to selection'}
                            right
                        >
                            <Back/>
                        </IconButton>
                    </Link>
                    }
                    {!menuIsOpen && isProducts && !filterIsOpen &&
                    <IconButton
                        onClick={() => toggleFilter('')}
                        title={'filter'}
                        right
                    >
                        <Filter/>
                    </IconButton>
                    }
                    {!menuIsOpen && isProducts && filterIsOpen &&
                    <IconButton
                        onClick={() => toggleFilter('')}
                        title={'save'}
                        right
                    >
                        <Check/>
                    </IconButton>
                    }
                </div>
            </div>
            <div className={styles.wrapper + ' ' + styles.center}>
                <div className={styles.inner}>
                    <Link href={'/'} prefetch>
                        <button aria-label="home" role="button" data-min>
                            <Logo/>
                        </button>
                    </Link>
                </div>
            </div>
            <div className={styles.wrapper + ' ' + styles.right}>
                <div className={styles.inner}>
                    <MB>
                        <IconButton title={menuIsOpen ? 'close' : 'menu'}
                                    onClick={toggleMenu}>
                            <Burger isClose={menuIsOpen}/>
                        </IconButton>
                    </MB>
                    <MD>
                        <IconButton title={menuIsOpen ? 'close' : 'menu'}
                                    onClick={toggleMenu}>
                            <Burger isClose={menuIsOpen}/>
                        </IconButton>
                    </MD>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Header