

cc.Class({
    extends: cc.Component,
    properties: {
        targets: [cc.Node],
        ErrorCallBack: [cc.Component.EventHandler]
    },
    onLoad: function onLoad() {
        this.BeginNum = 0;
    },
    AddNum: function AddNum() {
        this.BeginNum++, this.BeginNum >= this.targets.length && (this.BeginNum = 0, null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (e) {
            e.emit();
        }));
        for (var e = 0; e < this.targets.length; e++) {
            this.targets[e].active = e < this.BeginNum;
        }
    }
})

/*Mission10009: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "654f75F7jVMFJJ+gxFroNmB", "Mission10009"), cc.Class({
            extends: cc.Component,
            properties: {
                targets: [cc.Node],
                ErrorCallBack: [cc.Component.EventHandler]
            },
            onLoad: function onLoad() {
                this.BeginNum = 0;
            },
            AddNum: function AddNum() {
                this.BeginNum++, this.BeginNum >= this.targets.length && (this.BeginNum = 0, null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (e) {
                    e.emit();
                }));
                for (var e = 0; e < this.targets.length; e++) {
                    this.targets[e].active = e < this.BeginNum;
                }
            }
        }), 
*/