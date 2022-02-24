import { gameSDK } from "../SDK/gameSDK";
import configStore from "../SDK/configStore";
import random from "../SDK/random";
var DataManager = require("DataManager")
var lwsdk = require("lwsdk")
const { ccclass, property } = cc._decorator;
@ccclass
export default class BoxPanel extends cc.Component{
    @property(cc.Label)
    keyNum: cc.Label = null;
    @property(cc.Node)
    boxList: cc.Node = null;
    @property(cc.Node)
    closeBtn: cc.Node = null;
    @property(cc.Node)
    videoBtn: cc.Node = null;
    @property(cc.Node)
    keyNode: cc.Node = null;
    @property(cc.Node)
    allBtn:cc.Node = null
    @property(cc.Node)
    checkMark:cc.Node = null
    @property(cc.Node)
    adLabel:cc.Node = null


    @property(cc.Node)
    backBtn:cc.Node = null

    // @property(cc.Node)
    // DialogGame:cc.Node = null
    showB = true
    boxArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    boxRanArr = []
    count = 0
    start() {
        // console.log(this.node.parent)
        this.closeBtn.active = false
        this.adLabel.active = false
        this.allBtn.active = false
        if (configStore.key <= 0) {
            configStore.key = 3
        }
        // this.DialogGame.active = false
        this.scheduleOnce(() =>{
            this.closeBtn.active = true
        },3)
        this.backBtn.on(cc.Node.EventType.TOUCH_END,this.backClick,this)
        this.closeBtn.on(cc.Node.EventType.TOUCH_END,this.close,this)
        this.keyNum.string = "x" + configStore.key.toString()
        this.boxRanArr = random.getRandomArrayElements(this.boxArr, 3)
        this.boxRanArr.forEach(element => {
            this.boxList.children[element].getChildByName("videoIcon").active = true
            // this.boxList.children[element].getChildByName("videoIcon").runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0.9, 0.9), cc.scaleTo(0.5, 1, 1))))
        });
        if (configStore.ZJXJJ_FXCXLBY) {
            this.backBtn.active = true
        }else{
            this.backBtn.active = false
        }
    }
    backClick(){
        console.log("点击盒子奖励的假退出 banner隱藏" , configStore.ZJXJJ_FXCXLBY)
        // adSdk.hideBanner()
        if (configStore.ZJXJJ_FXCXLBY) {
            // this.DialogGame.active = true
            cc.loader.loadRes("Prefabs/Panel/otherGames/falseDialogGame", (err, spf) => {
            // cc.loader.loadRes("Prefabs/test", (err, spf) => {
                var back = cc.instantiate(spf);
                back.parent = this.node.getChildByName("hutui");
                back.position = cc.v2(0, 0);
                // back.zIndex = 100000
                // console.log(back)
            })
        }
    }
    checkMarkClick(){
        console.log(this.showB)
        // this.showB != this.showB;
        if(this.showB == false){
            this.showB = true
        }else{
            this.showB = false
        }
        this.checkMark.active=this.showB
    }
    close() {
        console.log("神秘奖励关闭banner显示")
        // adSdk.showBanner("玩法页面",true,true,10)
        this.node.destroy()
    }

    boxBtn(t, i) {
        if (t.target.getChildByName("videoIcon").active && configStore.ZJXJJ_SMJL) {
            gameSDK.showVideoAd(() => {
                this.refreshUi()
                // console.log(this.boxList.children[i],"111111",this.boxList.children[t])
                this.boxList.children[i].active = false
                // t.target.active = false
            }, "ZJXJJ-SMJL");
        } else {
            if (configStore.key <= 0) {
            } else {
                configStore.key--
                // t.target.active = false
                this.boxList.children[i].active = false
                this.refreshUi()
                if(configStore.key == 0){
                    this.boxList.children[i].active = true
                    this.boxList.children[i].children[1].active = false
                    this.boxList.children[i].children[0].active = true
                    var s = this.boxList.children[i].getComponent(cc.Button)
                    s.interactable = false
                }
            }
        }
    }
    randomNum() {
        let rannum = random.getIntByRange(0, 8)
        if (this.boxList.children[rannum].active == false) {
            this.randomNum()
        } else {
            return rannum
        }
    }

    onWatchBtn() {
        this.count +=3
                this.refreshUi()
        let randomNum = this.randomNum()
        if(configStore.ZJXJJ_SMJL && this.showB){
            gameSDK.showVideoAd(() => {
                configStore.key +=3
                this.refreshUi()
                DataManager.user.Tip++ 
                // heartbeatSchedule.emitEvent()
                lwsdk.setToServer({dataKey:"girl",dataType:"girlData",data:DataManager.user,expireTime:3600})
                this.boxList.children[randomNum].active = false
                // t.target.active = false
            }, "ZJXJJ-SMJL");
        }else if(!this.showB){
            this.close()
            // adSdk.showBanner("结算页")
        }
        
        // else{
        //     this.close()
        // }

    }

    refreshUi() {
        var clickCount = 0
        this.boxList.children.forEach(element => {
            if (element.active == false) {
                clickCount++
            }
        });
        if (clickCount >= 9) {
            this.videoBtn.active = false
            this.adLabel.active = false
        }
        this.keyNum.string = "x" + configStore.key.toString()
        if (configStore.key <= 0) {
            this.scheduleOnce(() => {
                this.closeBtn.active = true
            }, 3)
            this.adLabel.active = true
            this.videoBtn.active = true
            this.keyNode.active = false
        }else{
            // this.closeBtn.active = false
            // }, 3)
            this.adLabel.active = false
            this.videoBtn.active = false
            this.keyNode.active = true
        }
        if(this.count >= 3 && configStore.key <= 0 ){
            this.adLabel.active = false
            this.keyNode.active = false
            this.videoBtn.active = false
            // this.allBtn.active = true
        }
    }
    // update (dt) {}
}
