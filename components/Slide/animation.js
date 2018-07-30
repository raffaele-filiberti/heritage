import {drawSVGPlugin, Power4, TweenMax} from "gsap";


export default {

    show(
        revealImage,
        image,
        title,
        subtitle,
        paragraph,
        cb
    ) {
        let start = paragraph ? 1.8 : 1.3;

        TweenMax.set(revealImage, {
                scaleX: 1,
                transformOrigin: 'left center'
            }
        );

        TweenMax.set(image, {
                scaleX: 1.7,
                scaleY: 1.7
            }
        );

        TweenMax.to(revealImage, .7, {
            delay: start,
            scaleX: 0
        });

        TweenMax.to(image, 1, {
            delay: start,
            scaleX: 1,
            scaleY: 1,
            ease: Power4.easeInOut
        });

        if (paragraph) {

            TweenMax.staggerTo(paragraph, .5, {
                delay: start + .7,
                autoAlpha: 1,
                y: 0
            }, .02);

        }

        TweenMax.staggerTo([subtitle, title], .6, {
            delay: start + .7,
            x: '0%',
            onComplete: () => cb()
        }, .1);
    },

    appear(
        image,
        title,
        subtitle,
        paragraph,
        cb
    ) {
        let start = .2;

        TweenMax.set(image, {
                scaleX: 1.7,
                scaleY: 1.7
            }
        );

        TweenMax.to(image, 1, {
            delay: start,
            scaleX: 1,
            scaleY: 1,
            ease: Power4.easeInOut
        });

        if (paragraph) {

            TweenMax.staggerTo(paragraph, .5, {
                delay: start += .2,
                autoAlpha: 1,
                y: 0
            }, .02);

        }

        TweenMax.staggerTo([subtitle, title], .6, {
            delay: start,
            x: '0%',
            onComplete: () => cb()
        }, .1);
    },

    leave(
        revealImage,
        image,
        title,
        subtitle,
        paragraph,
        cb,
        handleEndAnimation
    ) {

        let delay = .5;

        TweenMax.set(revealImage, {
                scaleX: 0,
                transformOrigin: 'right center'
            }
        );

        TweenMax.staggerTo([subtitle, title], delay, {
            x: '-100%'
        }, .2);

        if (paragraph) {

            TweenMax.staggerTo(paragraph, delay / 2, {
                autoAlpha: 0,
                y: '-100%'
            }, .02);

        }

        TweenMax.to(revealImage, .7, {
            delay: delay,
            scaleX: 1,
            onComplete: () => {
                handleEndAnimation();
                cb()
            }
        });
    }
}