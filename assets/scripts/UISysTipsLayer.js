

cc.Class({
    extends: require("UILayerBase"),
    onLoad: function onLoad() {
        cc.log(this.node.name + "\u52A0\u8F7D\u6210\u529F");
    },
    getRootNode: function getRootNode() {
        return this.node;
    }
}) 

/*UISysTipsLayer: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "08d8ffSJ3dDe5cg6R1N24yo", "UISysTipsLayer"), cc.Class({
            extends: e("UILayerBase"),
            onLoad: function onLoad() {
                cc.log(this.node.name + "\u52A0\u8F7D\u6210\u529F");
            },
            getRootNode: function getRootNode() {
                return this.node;
            }
        }), 
*/