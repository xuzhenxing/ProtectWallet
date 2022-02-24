import SubjectView from "./SubjectView";
import wxUtils from "../api/wxUtils";
var lwsdk = require("lwsdk")
var uimanager = require("UIManager")
var n = require("ConstModName"),
    a = require("UIInfo");
const { ccclass, property } = cc._decorator;
@ccclass
export default class AnswerView extends cc.Component {
    @property(cc.Node)
    Close: cc.Node = null
    @property(cc.Node)
    AnswerA: cc.Node = null
    @property(cc.Node)
    AnswerB: cc.Node = null
    @property(cc.Node)
    AnswerC: cc.Node = null
    @property(cc.Node)
    AnswerD: cc.Node = null
    ChooseAnswer: any
    @property(cc.Node)
    goldFly: cc.Node = null
    is_fly = false
    i = 1
    start() {
        this.goldFly.active = false
        this.Close.on(cc.Node.EventType.TOUCH_END, this.CloseClick, this)
        if (this.AnswerA.active) {
            // this.AnswerA.on(cc.Node.EventType.TOUCH_END, this.AnswerAClick, this)
        } else {
            console.log("按钮隐藏A")
        }
        if (this.AnswerB.active) {
            // this.AnswerB.on(cc.Node.EventType.TOUCH_END, this.AnswerBClick, this)
        } else {
            console.log("按钮隐藏B")
        }
        if (this.AnswerC.active) {
            // this.AnswerC.on(cc.Node.EventType.TOUCH_END, this.AnswerCClick, this)
        } else {
            console.log("按钮隐藏C")
        }
        if (this.AnswerD.active) {
            // this.AnswerD.on(cc.Node.EventType.TOUCH_END, this.AnswerDClick, this)
        } else {
            console.log("按钮隐藏D")
        }
        SubjectView.loadJson()
    }
    CloseClick() {
        lwsdk.showAuthoriseButton()
        this.node.destroy()
        if (this.node.parent.name == "GameView") {
            window['gm'].UIManager.SendNotification(n.MOD_GameView, a.UIInfo_ShowWin, null)
        }
    }
    AnswerAClick() {
        window['a'].pass++
        this.ChooseAnswer = "A"
        this.AnswerB.getComponent(cc.Button).interactable = false
        this.AnswerC.getComponent(cc.Button).interactable = false
        this.AnswerD.getComponent(cc.Button).interactable = false
        if (window['a'].MaxMission <= 20) {
            var Answer = SubjectView.AnswerJson.json[0].Simple[window['RSimple']].Right
        } else if (window['a'].MaxMission > 20 && window['a'].MaxMission <= 50) {
            var Answer = SubjectView.AnswerJson.json[1].Middle[window['RMiddle']].Right
        } else {
            var Answer = SubjectView.AnswerJson.json[2].Difficulty[window['RDifficulty']].Right
        }
        this.AnswerA.getChildByName("bg").active = true
        this.AnswerA.getChildByName("gq_wroung").active = true
        var aA = this.AnswerA.getChildByName("gq_wroung")
        aA.scale = 0; cc.tween(aA).to(1, { scale: 1 }).start()
        if ("A" == Answer) {
            window['a'].Right++
            this.is_fly = true
            this.goldFly.active = true
            this.AnswerA.getChildByName("gq_gou").active = true
            this.AnswerA.getChildByName("gq_wroung").active = false
            var aA = this.AnswerA.getChildByName("gq_gou")
            aA.scale = 0; cc.tween(aA).to(1, { scale: 1 }).start()
        }
        this.scheduleOnce(() => {
            if ("B" == Answer) {
                this.AnswerB.getChildByName("gq_gou").active = true
            } else if ("C" == Answer) {
                this.AnswerC.getChildByName("gq_gou").active = true
            } else if ("D" == Answer) {
                this.AnswerD.getChildByName("gq_gou").active = true
            }
        }, 1)
        this.scheduleOnce(() => {
            if ("A" == Answer) {
                window['a'].gold += 50
                wxUtils.showToast("恭喜获得50金币")
            }
            this.saveData()
        }, 3)
    }
    AnswerBClick() {
        window['a'].pass++
        this.ChooseAnswer = "B"
        this.AnswerA.getComponent(cc.Button).interactable = false
        this.AnswerC.getComponent(cc.Button).interactable = false
        this.AnswerD.getComponent(cc.Button).interactable = false
        if (window['a'].MaxMission <= 20) {
            var Answer = SubjectView.AnswerJson.json[0].Simple[window['RSimple']].Right
        } else if (window['a'].MaxMission > 20 && window['a'].MaxMission <= 50) {
            var Answer = SubjectView.AnswerJson.json[1].Middle[window['RMiddle']].Right
        } else {
            var Answer = SubjectView.AnswerJson.json[2].Difficulty[window['RDifficulty']].Right
        }
        this.AnswerB.getChildByName("bg").active = true
        // var bgB = this.AnswerB.getChildByName("bg")
        // bgB.opacity = 0; cc.tween(bgB).to(2, { opacity: 255 }).start();
        this.AnswerB.getChildByName("gq_wroung").active = true
        var aA = this.AnswerB.getChildByName("gq_wroung")
        aA.scale = 0; cc.tween(aA).to(1, { scale: 1 }).start()
        if ("B" == Answer) {
            window['a'].Right++
            this.is_fly = true
            this.goldFly.active = true
            this.AnswerB.getChildByName("gq_wroung").active = false
            this.AnswerB.getChildByName("gq_gou").active = true
            var aA = this.AnswerB.getChildByName("gq_gou")
            aA.scale = 0; cc.tween(aA).to(1, { scale: 1 }).start()
        }
        this.scheduleOnce(() => {
            if ("A" == Answer) {
                this.AnswerA.getChildByName("gq_gou").active = true
            } else if ("C" == Answer) {
                this.AnswerC.getChildByName("gq_gou").active = true
            } else if ("D" == Answer) {
                this.AnswerD.getChildByName("gq_gou").active = true
            }
        }, 1)

        this.scheduleOnce(() => {
            if ("B" == Answer) {
                window['a'].gold += 50
                wxUtils.showToast("恭喜获得50金币")
            }
            this.saveData()
        }, 3)
    }
    AnswerCClick() {
        window['a'].pass++
        this.ChooseAnswer = "C"
        this.AnswerB.getComponent(cc.Button).interactable = false
        this.AnswerA.getComponent(cc.Button).interactable = false
        this.AnswerD.getComponent(cc.Button).interactable = false
        if (window['a'].MaxMission <= 20) {
            var Answer = SubjectView.AnswerJson.json[0].Simple[window['RSimple']].Right
        } else if (window['a'].MaxMission > 20 && window['a'].MaxMission <= 50) {
            var Answer = SubjectView.AnswerJson.json[1].Middle[window['RMiddle']].Right
        } else {
            var Answer = SubjectView.AnswerJson.json[2].Difficulty[window['RDifficulty']].Right
        }
        this.AnswerC.getChildByName("bg").active = true
        // var bgC = this.AnswerC.getChildByName("bg")
        // bgC.opacity = 0; cc.tween(bgC).to(2, { opacity: 255 }).start();

        this.AnswerC.getChildByName("gq_wroung").active = true
        var aA = this.AnswerC.getChildByName("gq_wroung")
        aA.scale = 0; cc.tween(aA).to(1, { scale: 1 }).start()
        if ("C" == Answer) {
            window['a'].Right++
            this.is_fly = true
            this.goldFly.active = true
            this.AnswerC.getChildByName("gq_wroung").active = false
            this.AnswerC.getChildByName("gq_gou").active = true
            var aA = this.AnswerC.getChildByName("gq_gou")
            aA.scale = 0; cc.tween(aA).to(1, { scale: 1 }).start()
        }
        this.scheduleOnce(() => {
            if ("A" == Answer) {
                this.AnswerA.getChildByName("gq_gou").active = true
            } else if ("B" == Answer) {
                this.AnswerB.getChildByName("gq_gou").active = true
            } else if ("D" == Answer) {
                this.AnswerD.getChildByName("gq_gou").active = true
            }
        }, 1)

        this.scheduleOnce(() => {
            if ("C" == Answer) {
                window['a'].gold += 50
                wxUtils.showToast("恭喜获得50金币")
            }
            this.saveData()
        }, 3)
    }
    AnswerDClick() {
        window['a'].pass++
        this.ChooseAnswer = "D"
        this.AnswerB.getComponent(cc.Button).interactable = false
        this.AnswerC.getComponent(cc.Button).interactable = false
        this.AnswerA.getComponent(cc.Button).interactable = false
        if (window['a'].MaxMission <= 20) {
            var Answer = SubjectView.AnswerJson.json[0].Simple[window['RSimple']].Right
        } else if (window['a'].MaxMission > 20 && window['a'].MaxMission <= 50) {
            var Answer = SubjectView.AnswerJson.json[1].Middle[window['RMiddle']].Right
        } else {
            var Answer = SubjectView.AnswerJson.json[2].Difficulty[window['RDifficulty']].Right
        }
        this.AnswerD.getChildByName("bg").active = true
        // var bgD = this.AnswerD.getChildByName("bg")
        // bgD.opacity = 0; cc.tween(bgD).to(2, { opacity: 255 }).start();

        this.AnswerD.getChildByName("gq_wroung").active = true
        var aA = this.AnswerD.getChildByName("gq_wroung")
        aA.scale = 0; cc.tween(aA).to(1, { scale: 1 }).start()

        if ("D" == Answer) {
            window['a'].Right++
            this.is_fly = true
            this.goldFly.active = true
            this.AnswerD.getChildByName("gq_wroung").active = false
            this.AnswerD.getChildByName("gq_gou").active = true
            var aA = this.AnswerD.getChildByName("gq_gou")
            aA.scale = 0; cc.tween(aA).to(1, { scale: 1 }).start()
        }
        this.scheduleOnce(() => {
            if ("A" == Answer) {
                this.AnswerA.getChildByName("gq_gou").active = true
            } else if ("B" == Answer) {
                this.AnswerB.getChildByName("gq_gou").active = true
            } else if ("C" == Answer) {
                this.AnswerC.getChildByName("gq_gou").active = true
            }
        }, 1)
        this.scheduleOnce(() => {
            if ("D" == Answer) {
                window['a'].gold += 50
                wxUtils.showToast("恭喜获得50金币")
            }
            this.saveData()
        }, 3)
    }
    update() {
        if (this.is_fly) {
            this.goldFly.y += 13
            if (this.goldFly.y >= 570) {
                this.is_fly = false
                this.goldFly.active = false
                this.goldFly.y = 0
            }

        }
    }

    saveData() {
        let self = this
        lwsdk.showAuthoriseButton()
        this.node.destroy()
        window['show'] = true
        if (this.node.parent.name == "GameView") {
            window['gm'].UIManager.SendNotification(n.MOD_GameView, a.UIInfo_ShowWin, null)
        }
        window['show'] = false
        if (window['a'].get_tip) {
            window['a'].get_tip = false
            window['a'].Tip++
        }
        if (window['a'].quest_pawer) {
            window['a'].power += 3;
            if (self.node.parent.name == "BeginView") {
                var PLabel = self.node.parent.getChildByName("PowerBG").getChildByName("powerLabel")
                PLabel.getComponent(cc.Label).string = window['a'].power
            }
            if (window['a'].power >= 99) {
                window['a'].power = 99
                wxUtils.showToast("已达到体力上限")
            } else {
                wxUtils.showToast("获取3体力")
            }
            window['a'].quest_pawer = false
        } else if (window['a'].quest_pawer == false) {
            window['a'].quest_pawer = false
        }
        if (self.node.parent.name == "LevelView") {
            console.log("LevelView")
        } else if (self.node.parent.name == "LevelFailView") {
            console.log("LevelFailView")
        } else if (self.node.parent.name == "BeginView") {
            var goldLab = self.node.parent.getChildByName("goldBG").getChildByName("goldLabel")
            goldLab.getComponent(cc.Label).string = window['a'].gold
        }
        window['a'].accuracy = ((window['a'].Right / window['a'].pass) * 100).toFixed(2)
        if (window['a'].accuracy != 100) {
            window['a'].Level = Number(window['a'].MaxMission + "" + window['a'].LittleMission + "0" + (window['a'].accuracy * 100)).toFixed(0)
        } else {
            window['a'].Level = Number(window['a'].MaxMission + "" + window['a'].LittleMission + "" + (window['a'].accuracy * 100)).toFixed(0)
        }
        if (window['wx']) {
            lwsdk.setToServer({ dataKey: "girlData", dataType: "girlData", data: window['a'], expireTime: 3600 })
        }
    }
}
