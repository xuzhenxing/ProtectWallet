

var n = cc.Enum({
    ScrollView: 0
});
cc.Class({
    extends: cc.Component,
    properties: {
        _Component: cc.Component,
        ComponentName: {
            default: n.ScrollView,
            type: cc.Enum(n)
        }
    },
    onLoad: function onLoad() {
        switch (this.ComponentName) {
            case n.ScrollView:
                this._Component = this.node.getComponent(cc.ScrollView);
        }
        null == this._Component ? cc.log("Can not getcomponent " + this.ComponentName) : cc.log("Alredy getcomponent " + this.ComponentName);
    },
    enable: function enable() {
        null != this._Component && (this._Component.enabled = !0);
    },
    disable: function disable() {
        null != this._Component && (this._Component.enabled = !1);
    }
})

/*ComponentActive: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "3d9a7slQchC1IfQXMgC0G2s", "ComponentActive");
        var n = cc.Enum({
            ScrollView: 0
        });
        cc.Class({
            extends: cc.Component,
            properties: {
                _Component: cc.Component,
                ComponentName: {
                    default: n.ScrollView,
                    type: cc.Enum(n)
                }
            },
            onLoad: function onLoad() {
                switch (this.ComponentName) {
                    case n.ScrollView:
                        this._Component = this.node.getComponent(cc.ScrollView);
                }
                null == this._Component ? cc.log("Can not getcomponent " + this.ComponentName) : cc.log("Alredy getcomponent " + this.ComponentName);
            },
            enable: function enable() {
                null != this._Component && (this._Component.enabled = !0);
            },
            disable: function disable() {
                null != this._Component && (this._Component.enabled = !1);
            }
        }), 
*/