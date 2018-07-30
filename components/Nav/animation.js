import {Elastic, TweenLite} from 'gsap';

const duration = .5;

export default {
    show(target, callback) {
        return TweenLite
            .staggerFrom(target, duration, {
                    autoAlpha: 0,
                    onComplete: () => callback(),
                }
            )
    },
    hide(target, callback) {
        return TweenLite
            .staggerTo(target, duration, {
                    autoAlpha: 0,
                    onComplete: () => callback(),
                }
            )
    }
}