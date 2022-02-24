
cc.Class({
    extends: cc.Component,
    properties: {
        BeltDir: 0,
        TopBelt: {
            type: cc.Node,
            default: null
        },
        BottomBelt: {
            type: cc.Node,
            default: null
        },
        LeftBelt: {
            type: cc.Node,
            default: null
        },
        RightBelt: {
            type: cc.Node,
            default: null
        },
        speed: 0,
        BeltList: null
    },
    Init: function Init() {
        this.BeltList = new Array();
        var e = this.TopBelt.getComponent("LineBelt");
        e.Init();
        var t = this.BottomBelt.getComponent("LineBelt");
        t.Init();
        var i = this.LeftBelt.getComponent("CurveBelt");
        i.Init();
        var n = this.RightBelt.getComponent("CurveBelt");
        n.Init(), this.BeltList.push(e), this.BeltList.push(t), this.BeltList.push(i), this.BeltList.push(n);
    },
    OnUpdate: function OnUpdate(e) {
        for (var t = this.BeltList.length, i = 0; i < t; i++) {
            this.BeltList[i];
        }
    }
})


/*ConveyorBelt: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "238fdbdcjZFa4o6obbAFkda", "ConveyorBelt"), cc.Class({
            extends: cc.Component,
            properties: {
                BeltDir: 0,
                TopBelt: {
                    type: cc.Node,
                    default: null
                },
                BottomBelt: {
                    type: cc.Node,
                    default: null
                },
                LeftBelt: {
                    type: cc.Node,
                    default: null
                },
                RightBelt: {
                    type: cc.Node,
                    default: null
                },
                speed: 0,
                BeltList: null
            },
            Init: function Init() {
                this.BeltList = new Array();
                var e = this.TopBelt.getComponent("LineBelt");
                e.Init();
                var t = this.BottomBelt.getComponent("LineBelt");
                t.Init();
                var i = this.LeftBelt.getComponent("CurveBelt");
                i.Init();
                var n = this.RightBelt.getComponent("CurveBelt");
                n.Init(), this.BeltList.push(e), this.BeltList.push(t), this.BeltList.push(i), this.BeltList.push(n);
            },
            OnUpdate: function OnUpdate(e) {
                for (var t = this.BeltList.length, i = 0; i < t; i++) {
                    this.BeltList[i];
                }
            }
        }), 
*/