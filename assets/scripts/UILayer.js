
 cc.Class({
    extends: require("UILayerBase"),
    onLoad: function onLoad() {},
    addLayer: function addLayer(e, t, i) {
        var n = this;
        gm.CacheManager.addSingleRes(e, function (i) {
            var a = cc.instantiate(i);
            a.name = n.getObjName(e), gm.CacheManager.getOnAdded(a, t.data), n.node.addChild(a), t != {} && t.callback && t.callback(a);
        }, i, cc.Prefab);
    },
    getRootNode: function getRootNode() {
        return this.node;
    },
    removeLayer: function removeLayer(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            i = this.node.getChildByName(e);
        t ? i.removeFromeParent() : gm.UILayerManager.releaseRes(e);
    },
    removeAll: function removeAll() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        for (var e = this.node.children, t = e.length, i = 0; i < t; i++) {
            e.distroy();
        }
    },
    getObjName: function getObjName(e) {
        var t = e.split("/");
        return t[t.length - 1];
    }
})

/*UILayer: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "528f0xOgQZGmJutgWFvmUf2", "UILayer"), cc.Class({
            extends: e("UILayerBase"),
            onLoad: function onLoad() {},
            addLayer: function addLayer(e, t, i) {
                var n = this;
                gm.CacheManager.addSingleRes(e, function (i) {
                    var a = cc.instantiate(i);
                    a.name = n.getObjName(e), gm.CacheManager.getOnAdded(a, t.data), n.node.addChild(a), t != {} && t.callback && t.callback(a);
                }, i, cc.Prefab);
            },
            getRootNode: function getRootNode() {
                return this.node;
            },
            removeLayer: function removeLayer(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    i = this.node.getChildByName(e);
                t ? i.removeFromeParent() : gm.UILayerManager.releaseRes(e);
            },
            removeAll: function removeAll() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                for (var e = this.node.children, t = e.length, i = 0; i < t; i++) {
                    e.distroy();
                }
            },
            getObjName: function getObjName(e) {
                var t = e.split("/");
                return t[t.length - 1];
            }
        }), 
*/