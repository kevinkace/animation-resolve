# Animation Resolve

Small module I often use with [Mithril.js](https://github.com/mitrhiljs/mithril.js) and `onbeforeremove()` to [animate a component before removing it from the DOM](https://github.com/MithrilJS/mithril.js/blob/next/docs/animation.md#animation-on-element-removal).

This module (ESM and CJS) supplies a function that returns a Promise which resolves when a CSS animation completes after updating a DOM nodes CSS class.

## With Mithril

```css
.animateOut {
    animation: forwards 0.5s animateOut;
}

@keyframes animateOut {
    100% {
        opacity: 0;
    }
}
```

```js
import animationResolve from "animation-resolve";

export default {
    onbeforeremove(vnode) {
        return animationResolve(vnode.dom, "animateOut");
    },
    view() {
        return m("div", "animates out");
    }
}
```