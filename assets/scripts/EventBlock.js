

cc.Class({
    extends: cc.Component,
    properties: {},
    start: function start() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.Click, this);
    },
    Click: function Click(e) {
        e.stopPropagationImmediate();
    }
})

/*EventBlock: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "2b526WXZYJLF51qowGLFeaQ", "EventBlock"), cc.Class({
            extends: cc.Component,
            properties: {},
            start: function start() {
                this.node.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
            },
            HandleEvent: function HandleEvent(e) {
                e.stopPropagationImmediate();
            }
        }), 
*/