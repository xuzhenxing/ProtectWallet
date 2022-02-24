// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var lwsdk = require("lwsdk");
var wxUtils = require("wxUtils");
cc.Class({
    extends: cc.Component,

    properties: {
        Close: {
            default: null,
            type: cc.Node
        },
        Share: {
            default: null,
            type: cc.Node
        },
        self:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.Close.on(cc.Node.EventType.TOUCH_END, this.CloseClick, this)
        this.Share.on(cc.Node.EventType.TOUCH_END, this.ShareClick, this)
    },
    CloseClick() {
        this.self.destroy()
    },
    ShareClick() {
        lwsdk.setSceneEvent({
            sceneName: "金币不足弹窗",
            eventName: "点击",
            eventId: "点击【分享】按钮"
        });
        let self = this
        if (window['wx']) {
            lwsdk.shareAppMessage({ //主动拉起分享
                type: 1,
                success: function () {
                    gm.DataManager.userData.gold += 100
                    wxUtils.default.showToast("恭喜获得100金币")
                    // heartbeatSchedule.default.emitEvent()
                    lwsdk.setToServer({dataKey:"girlData",dataType:"girlData",data:gm.DataManager.userData,expireTime:3600})
                    window.Refish()
                    var gold = self.node.parent.getChildByName("GoldBG").getChildByName("GoldLabel").getComponent(cc.Label)
                    gold.string = gm.DataManager.userData.gold
                    self.node.destroy()
                },
                fail: function () {
                    wxUtils.default.showToast("分享失败，请重新分享")
                }
            })
        } else {
            gm.DataManager.userData.gold += 100
            // heartbeatSchedule.default.emitEvent()
            if (window['wx']) {
                lwsdk.setToServer({dataKey:"girlData",dataType:"girlData",data:gm.DataManager.userData,expireTime:3600})
            }
            // console.log(this.node.parent)
            var gold = this.node.parent.getChildByName("GoldBG").getChildByName("GoldLabel").getComponent(cc.Label)
            // console.log(gold)
            gold.string = gm.DataManager.userData.gold
            window.Refish()
        }
    },

    // update (dt) {},
});