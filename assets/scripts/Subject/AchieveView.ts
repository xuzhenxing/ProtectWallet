
var   lwsdk  = require("lwsdk")
const { ccclass, property } = cc._decorator;
@ccclass
export default class AchieveView extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null
    @property(cc.Node)
    Close: cc.Node = null
    start() {
        this.CtrlAchieve()
        this.Close.on(cc.Node.EventType.TOUCH_END, this.CloseClick, this)
    }
    CloseClick() {
        lwsdk.showAuthoriseButton()
        this.node.destroy()
    }
    CtrlAchieve() {
        for (let i = 0; i < this.content.childrenCount; i++) {
            console.log(window['a'].MaxMission)
            if (window['a'].MaxMission > 0 && window['a'].MaxMission < 10) {
                if (i > 3) {
                    this.RefishUnLock(i)
                    this.content.children[i].getChildByName("light").active = true
                    this.content.children[i].getChildByName("Use").active = true
                    this.content.children[i].getChildByName("AchieveBG3").active = false
                    this.content.children[i].getChildByName("AchieveBG2").active = true
                } else {
                    this.Refish(i)
                }
            }
            else if (window['a'].MaxMission >= 10 && window['a'].MaxMission < 20) {
                if (i > 2) {
                    this.RefishUnLock(i)
                    this.content.children[3].getChildByName("light").active = true
                    this.content.children[3].getChildByName("Use").active = true
                    this.content.children[3].getChildByName("AchieveBG3").active = false
                    this.content.children[3].getChildByName("AchieveBG2").active = true
                } else {
                    this.Refish(i)
                }
            } else if (window['a'].MaxMission >= 20 && window['a'].MaxMission < 30) {
                if (i > 1) {
                    this.RefishUnLock(i)
                    this.content.children[2].getChildByName("light").active = true
                    this.content.children[2].getChildByName("Use").active = true
                    this.content.children[2].getChildByName("AchieveBG3").active = false
                    this.content.children[2].getChildByName("AchieveBG2").active = true
                } else {
                    this.Refish(i)
                }
            } else if (window['a'].MaxMission >= 30 && window['a'].MaxMission < 40) {
                if (i > 0) {
                    this.RefishUnLock(i)
                    this.content.children[1].getChildByName("light").active = true
                    this.content.children[1].getChildByName("Use").active = true
                    this.content.children[1].getChildByName("AchieveBG3").active = false
                    this.content.children[1].getChildByName("AchieveBG2").active = true
                } else {
                    this.Refish(i)
                }
            } else {
                this.RefishUnLock(i)
                this.content.children[0].getChildByName("light").active = true
                this.content.children[0].getChildByName("Use").active = true
                this.content.children[i].getChildByName("AchieveBG3").active = true
                this.content.children[0].getChildByName("AchieveBG3").active = false
                this.content.children[0].getChildByName("AchieveBG2").active = true
            }
        }
    }

    Refish(index) {
        this.content.children[index].getChildByName("head_lock").active = true
        this.content.children[index].getChildByName("NickName_hui").active = true
        this.content.children[index].getChildByName("AchieveBG1").active = true
        this.content.children[index].getChildByName("AchieveBG2").active = false
        this.content.children[index].getChildByName("AchieveBG3").active = false
    }
    RefishUnLock(index) {
        // this.content.children[index].getChildByName("AchieveBG1").active = false
        // this.content.children[index].getChildByName("AchieveBG2").active = false
        this.content.children[index].getChildByName("AchieveBG3").active = true
        this.content.children[index].getChildByName("head_lock").active = false
        this.content.children[index].getChildByName("NickName_hui").active = false
    }
    // update (dt) {}
}
