
 cc.Class({
    extends: cc.Component,
    properties: {
        showCallBack: [cc.Component.EventHandler],
        unShowCallBack: [cc.Component.EventHandler],
        activeCallBack: [cc.Component.EventHandler],
        unActiveCallBack: [cc.Component.EventHandler]
    },
    show: function show(e) {
        this.node.active = !0, null != this.showCallBack && this.showCallBack.forEach(function (t) {
            t.emit([e]);
        });
    },
    unShow: function unShow(e) {
        this.node.active = !1, null != this.unShowCallBack && this.unShowCallBack.forEach(function (t) {
            t.emit([e]);
        });
    },
    CheckActive: function CheckActive() {
        this.node.active ? null != this.activeCallBack && this.activeCallBack.forEach(function (e) {
            e.emit();
        }) : null != this.unActiveCallBack && this.unActiveCallBack.forEach(function (e) {
            e.emit();
        });
    }
})

/*Show: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "8e20ciqNKxKsqsPPDB/blNE", "Show"), cc.Class({
            extends: cc.Component,
            properties: {
                showCallBack: [cc.Component.EventHandler],
                unShowCallBack: [cc.Component.EventHandler],
                activeCallBack: [cc.Component.EventHandler],
                unActiveCallBack: [cc.Component.EventHandler]
            },
            show: function show(e) {
                this.node.active = !0, null != this.showCallBack && this.showCallBack.forEach(function (t) {
                    t.emit([e]);
                });
            },
            unShow: function unShow(e) {
                this.node.active = !1, null != this.unShowCallBack && this.unShowCallBack.forEach(function (t) {
                    t.emit([e]);
                });
            },
            CheckActive: function CheckActive() {
                this.node.active ? null != this.activeCallBack && this.activeCallBack.forEach(function (e) {
                    e.emit();
                }) : null != this.unActiveCallBack && this.unActiveCallBack.forEach(function (e) {
                    e.emit();
                });
            }
        }), 
*/