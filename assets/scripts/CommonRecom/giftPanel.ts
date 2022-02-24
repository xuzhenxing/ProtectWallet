// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { gameSDK } from "../SDK/gameSDK";
import configStore from "../SDK/configStore";
import wxUtils from "../api/wxUtils";
var DataManager = require("DataManager")


const { ccclass, property } = cc._decorator;
@ccclass
export  class giftPanel extends cc.Component {
    @property(cc.Node)
    giveup: cc.Node = null
    @property(cc.Node)
    getBtn: cc.Node = null
    @property(cc.Label)
    timeNum: cc.Label = null
    @property(cc.Node)
    selfNode :cc.Node = null
    @property(cc.Node)
    backBtn:cc.Node = null
    static _instance = null 
     static get instance(){
        return this._instance || (this._instance = new giftPanel()),this._instance
    }

    show(){
        this.selfNode.destroy()
    }
    timess=10
    start() {
        this.timeNum.string = "10"
        this.giveup.active = false
        this.scheduleOnce(() => {
            this.giveup.active = true
        }, 3)
        this.schedule(()=>{
            this.timess--
            this.timeNum.string = this.timess+ ""
        },1)
        this.scheduleOnce(()=>{
            this.giveUpClick()
        },10)
        this.getBtn.on(cc.Node.EventType.TOUCH_END,this.getClick,this)
        this.giveup.on(cc.Node.EventType.TOUCH_END,this.giveUpClick,this)
        this.backBtn.on(cc.Node.EventType.TOUCH_END,this.backClick,this)
        if (configStore.ZJXJJ_FXCXLBY) {
            this.backBtn.active = true
        }else{
            this.backBtn.active = false
        }
    }
    backClick(){
        console.log("点击了神秘奖励按钮  banner隐藏  configStore.ZJXJJ_FXCXLBY " ,configStore.ZJXJJ_FXCXLBY)
        // adSdk.hideBanner()
        if (configStore.ZJXJJ_FXCXLBY) {
            cc.loader.loadRes("Prefabs/Panel/otherGames/falseDialogGame", (err, spf) => {
                var back = cc.instantiate(spf);
                back.parent = cc.director.getScene().children[1].children[3].getChildByName("BeginView");
                back.position = cc.v2(0, 667);
                back.zIndex = 100000
                // console.log(back)
            })
        }
        
    }
    getClick(){
        console.log("神秘奖励看视频 configStore.ZJXJJ_SMJL ",configStore.ZJXJJ_SMJL)
        if(configStore.ZJXJJ_SMJL){
            gameSDK.showVideoAd(()=>{
                DataManager.userData.Tip+=2;
                wxUtils.showToast("恭喜你获得了奖励!")
            },"ZJXJJ-SMJL")
        }else{
            wxUtils.showToast("暂无视频")
        }
        this.scheduleOnce(() => {
            this.giveup.active = true
        }, 3)
    }
    giveUpClick(){
        console.log("神秘大礼隐藏按钮  banner隐藏")
        // adSdk.hideBanner()
        // adSdk.showBanner("玩法页面",true,true,10)
        this.node.destroy()
        this.backClick()
    }
    
    update(dt) {
       
    }
}
window['giftPanel']= giftPanel
