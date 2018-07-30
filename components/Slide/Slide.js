import React from 'react';
import styles from './slide.scss';
import SlideBtn from "./SlideBtn";
import {MD} from "../ResponsiveWrapper/Responsive";
import {Power4, TweenMax} from "gsap";
import ImageReveal from "../ImageRevealer/ImageRevealer";
import TitleRevealer from "../TitleRevealer/TitleRevealer";
import DescriptionRevealer from "../DescriptionRevealer/DescriptionRevealer";
import animation from "./animation";
import SubtitleRevealer from "../TitleRevealer/SubtitleRevealer";

class Slide extends React.Component {
    constructor(props) {
        super(props);

        this.dom = {
            root: React.createRef(),
            image: React.createRef(),
            title: React.createRef(),
            intro: React.createRef(),
            btn: React.createRef(),
            subtitle: React.createRef()
        };

        this.dir = 'next';
        this.current = 'next';
    }

    componentWillEnter(cb) {
        const revealImage = this.dom.image.current.lastChild.firstChild;
        const image = this.dom.image.current.firstChild;
        const title = this.dom.title.current.childNodes;
        const subtitle = this.dom.subtitle.current.childNodes;

        const paragraph = window.innerWidth >= 768 ? this.dom.intro.current.childNodes : false;

        animation.show(revealImage, image, title, subtitle, paragraph, cb);
    }

    componentWillAppear(cb) {
        const image = this.dom.image.current.firstChild;
        const title = this.dom.title.current.childNodes;
        const subtitle = this.dom.subtitle.current.childNodes;

        const paragraph = window.innerWidth >= 768 ? this.dom.intro.current.childNodes : false;

        animation.appear(image, title, subtitle, paragraph, cb);
    }

    componentWillLeave(cb) {
        const revealImage = this.dom.image.current.lastChild.firstChild;
        const image = this.dom.image.current.firstChild;
        const title = this.dom.title.current.childNodes;
        const subtitle = this.dom.subtitle.current.childNodes;

        const paragraph = window.innerWidth >= 768 ? this.dom.intro.current.childNodes : false;

        const {handleEndAnimation} = this.props;

        animation.leave(revealImage, image, title, subtitle, paragraph, cb, handleEndAnimation);

    }

    render() {
        const {id, displayTitle, slug, breadcrumb, intro, image: {url}, handleEndAnimation, types, ...rest} = this.props;

        return (
            <section className={styles.slide} {...rest} ref={this.dom.root}>

                <div className={styles.imageWrapper}>
                    <ImageReveal src={url} ref={this.dom.image}/>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.inner}>

                        <div className={styles.titleWrapper}>
                            <div className={styles.titleInner}>
                                <SubtitleRevealer subtitle={breadcrumb} ref={this.dom.subtitle}/>
                                <TitleRevealer title={displayTitle} ref={this.dom.title} split/>
                            </div>
                        </div>

                        <SlideBtn slug={slug} id={id} types={types} ref={this.dom.btn}/>

                        <MD>
                            <div className={styles.descWrapper}>
                                <DescriptionRevealer desc={intro} ref={this.dom.intro}/>
                            </div>
                        </MD>
                    </div>
                </div>
            </section>
        );
    }
}

export default Slide;