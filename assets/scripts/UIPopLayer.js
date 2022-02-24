

cc.Class({
    extends: require("UILayerBase"),
    onLoad: function onLoad() {
        cc.log(this.node.name + "\u52A0\u8F7D\u6210\u529F");
    },
    getRootNode: function getRootNode() {
        return this.node;
    }
})

/*UIPopLayer: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "39177ec2zJBzpAX9fqi/V8m", "UIPopLayer"), cc.Class({
            extends: e("UILayerBase"),
            onLoad: function onLoad() {
                cc.log(this.node.name + "\u52A0\u8F7D\u6210\u529F");
            },
            getRootNode: function getRootNode() {
                return this.node;
            }
        }), 
*/