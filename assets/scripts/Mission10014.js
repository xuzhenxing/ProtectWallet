

cc.Class({
    extends: cc.Component,
    properties: {
        Flower1: cc.Node,
        Flower2: cc.Node,
        Flower3: cc.Node
    },
    start: function start() {},
    ShowBig: function ShowBig() {
        this.Flower1.children[0].scale = 1.5, this.Flower1.children[1].active = !1, this.Flower1.children[2].active = !1, this.Flower1.children[3].active = !1, this.Flower2.children[0].scale = 1.5, this.Flower2.children[1].active = !1, this.Flower2.children[2].active = !1, this.Flower2.children[3].active = !1, this.Flower3.children[0].scale = 1.5, this.Flower3.children[1].active = !1, this.Flower3.children[2].active = !1, this.Flower3.children[3].active = !1;
    }
})


/*Mission10014: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "9a29ekfHM5C96D/lkxCfWJ0", "Mission10014"), cc.Class({
            extends: cc.Component,
            properties: {
                Flower1: cc.Node,
                Flower2: cc.Node,
                Flower3: cc.Node
            },
            start: function start() {},
            ShowBig: function ShowBig() {
                this.Flower1.children[0].scale = 1.5, this.Flower1.children[1].active = !1, this.Flower1.children[2].active = !1, this.Flower1.children[3].active = !1, this.Flower2.children[0].scale = 1.5, this.Flower2.children[1].active = !1, this.Flower2.children[2].active = !1, this.Flower2.children[3].active = !1, this.Flower3.children[0].scale = 1.5, this.Flower3.children[1].active = !1, this.Flower3.children[2].active = !1, this.Flower3.children[3].active = !1;
            }
        }), 
*/