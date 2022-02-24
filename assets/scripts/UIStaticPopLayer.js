
cc.Class({
    extends: require("UILayerBase"),
    onLoad: function onLoad() {
        cc.log(this.node.name + "\u52A0\u8F7D\u6210\u529F");
    },
    getRootNode: function getRootNode() {
        return this.node;
    },
    addStaticPop: function addStaticPop(e, t, i) {}
})


/*UIStaticPopLayer: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "bcabfpV3jJD6b2yiD4hNAMV", "UIStaticPopLayer"), cc.Class({
            extends: e("UILayerBase"),
            onLoad: function onLoad() {
                cc.log(this.node.name + "\u52A0\u8F7D\u6210\u529F");
            },
            getRootNode: function getRootNode() {
                return this.node;
            },
            addStaticPop: function addStaticPop(e, t, i) {}
        }), 
*/