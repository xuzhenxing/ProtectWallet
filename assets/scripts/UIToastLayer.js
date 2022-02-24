

cc.Class({
    extends: require("UILayerBase"),
    onLoad: function onLoad() {
        cc.log(this.node.name + "\u52A0\u8F7D\u6210\u529F"), gm.CacheManager.addSingleRes("module/common/prompt/toast", function (e) {
            var t = cc.instantiate(e);
            this.node.addChild(t), this._toast = t.getComponent("Toast");
        }.bind(this), "toast", cc.Prefab);
    },
    getRootNode: function getRootNode() {
        return this.node;
    },
    wordAction: function wordAction() {},
    showTips: function showTips(e, t, i) {
        this._toast.showTips(e, t, i);
    },
    stopTips: function stopTips() {
        this._toast.stopTips();
    }
})

/*UIToastLayer: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "69887LmXeZEoZrL37gnWWog", "UIToastLayer"), cc.Class({
            extends: e("UILayerBase"),
            onLoad: function onLoad() {
                cc.log(this.node.name + "\u52A0\u8F7D\u6210\u529F"), gm.CacheManager.addSingleRes("module/common/prompt/toast", function (e) {
                    var t = cc.instantiate(e);
                    this.node.addChild(t), this._toast = t.getComponent("Toast");
                }.bind(this), "toast", cc.Prefab);
            },
            getRootNode: function getRootNode() {
                return this.node;
            },
            wordAction: function wordAction() {},
            showTips: function showTips(e, t, i) {
                this._toast.showTips(e, t, i);
            },
            stopTips: function stopTips() {
                this._toast.stopTips();
            }
        }), 
*/