// import animResolve from "./animation-resolve";
const animResolve = require("../dist/cjs");

m.mount(window.mount, {
    toggleElements() {
        this.show = !this.show;
        this.showSvg = !this.showSvg;

        m.redraw();
    },

    toggleAdd() {
        this.add = !this.add;

        m.redraw();
    },

    view(vnode) {
        return m("div",
            m("button", { onclick : () => vnode.state.toggleElements() }, "toggle elements"),
            m("button", { onclick : () => vnode.state.toggleAdd() }, "toggle add"),

            // reg dom
            vnode.state.show ?
                m("div", {
                        class : "color",

                        onbeforeremove({ dom }) {
                            return animResolve(dom, "animOut", { add : vnode.state.add });
                        }
                    },
                    "child"
                ) :
                null,

            // reg, no object
            vnode.state.show ?
                m("div", {
                        class : "color",

                        onbeforeremove({ dom }) {
                            return animResolve(dom, "animOut");
                        }
                    },
                    "child"
                ) :
                null,

            // dom timeout before anim complete
            vnode.state.show ?
                m("div", {
                        class : "color",

                        onbeforeremove({ dom }) {
                            return animResolve(dom, "animOutShort", { add : vnode.state.add });
                        }
                    },
                    "child"
                ) :
                null,

            // anim much longer than timeout
            vnode.state.show ?
                m("div", {
                        class : "color",

                        onbeforeremove({ dom }) {
                            return animResolve(dom, "animOut", { timeout : 500, add : vnode.state.add });
                        }
                    },
                    "child"
                ) :
                null,

            // svg
            vnode.state.showSvg ?
                m("svg", {
                            class   : "color",
                            viewBox : "0 0 32 32",

                            onbeforeremove({ dom }) {
                                return animResolve(dom, "animOut", { add : vnode.state.add });
                            }
                        },
                        m("path", { d : "M27 4l-15 15-7-7-5 5 12 12 20-20z" })
                ) :
                null
        );
    }
});
