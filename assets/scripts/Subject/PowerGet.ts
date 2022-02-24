// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import wxUtils from "../api/wxUtils";
import SubjectView from "./SubjectView";

const { ccclass, property } = cc._decorator;
@ccclass
export default class PowerGet extends cc.Component {


    @property(cc.Node)
    Close: cc.Node = null
    @property(cc.Node)
    share: cc.Node = null
    @property(cc.Node)
    quest: cc.Node = null
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.Close.on(cc.Node.EventType.TOUCH_END, this.CloseClick, this)
        // this.share.on(cc.Node.EventType.TOUCH_END, this.shareClick, this)
        // this.quest.on(cc.Node.EventType.TOUCH_END, this.questClick, this)
        console.log(window['a'].can_power, window['a'].quest_pawer)
        if (window['a'].can_power) {
            this.share.getChildByName("bg").active = false
            this.share.getComponent(cc.Button).interactable = true
        } else {
            this.share.getChildByName("bg").active = true
            this.share.getComponent(cc.Button).interactable = false
        }
        if (window['a'].quest_pawer) {
            this.quest.getChildByName("bg").active = false
            this.quest.getComponent(cc.Button).interactable = true
        } else {
            this.quest.getChildByName("bg").active = true
            this.quest.getComponent(cc.Button).interactable = false
        }
        SubjectView.loadJson()
    }
    CloseClick() {
        this.node.destroy()
    }
    no_shareClick() {
        wxUtils.showToast("今日分享获取体力已上限")
    }
    no_questClick() {
        wxUtils.showToast("今日答题获取体力已上限")
    }
    shareClick() {

        let self = this

        if (window['wx']) {
        } else {
            // if (window['a'].can_power) {
            //     window['a'].power += 3;
            //     window['a'].can_power = false
            //     if (window['a'].power >= 99) {
            //         window['a'].power = 99
            //         wxUtils.showToast("已达到体力上限")
            //     } else {
            //         wxUtils.showToast("获取3体力")
            //     }
            // }else {
            //     wxUtils.showToast("今日分享获取体力已上限")
            // }
            // if (this.node.parent.name == "BeginView") {
            //     var PLabel = this.node.parent.getChildByName("PowerBG").getChildByName("powerLabel")
            //     PLabel.getComponent(cc.Label).string = window['a'].power
            // }
            // window['a'].can_power = false
            // self.node.destroy()
        }
    }
    questClick() {
        let self = this
        let sR = SubjectView.AnswerJson.json[0].Simple
        let sM = SubjectView.AnswerJson.json[1].Middle
        let sD = SubjectView.AnswerJson.json[2].Difficulty
        var indexR = 0
        var indexM = 0
        var indexD = 0
        for (var i in sR) {
            indexR++
        }
        for (var i in sM) {
            indexM++
        }
        for (var i in sD) {
            indexD++
        }
        var RSimple = Math.floor(Math.random() * (indexR - 2) + 1);
        var RMiddle = Math.floor(Math.random() * (indexM - 2) + 1);
        var RDifficulty = Math.floor(Math.random() * (indexD - 2) + 1);
        window['RSimple'] = RSimple
        window['RMiddle'] = RMiddle
        window['RDifficulty'] = RDifficulty
        cc.loader.loadRes("ui/AnswerView", (err, AnsPre) => {
            var answerClone = cc.instantiate(AnsPre)
            answerClone.parent = this.node.parent
            if (window['a'].MaxMission <= 20) {
                answerClone.getChildByName("datikuang").getChildByName("QuestLabel").getComponent(cc.Label).string = SubjectView.AnswerJson.json[0].Simple[RSimple].quest
                answerClone.getChildByName("BGA").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[0].Simple[RSimple].answer.A
                answerClone.getChildByName("BGB").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[0].Simple[RSimple].answer.B
                answerClone.getChildByName("BGC").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[0].Simple[RSimple].answer.C
                if (SubjectView.AnswerJson.json[0].Simple[RSimple].answer.D == undefined || SubjectView.AnswerJson.json[0].Simple[RSimple].answer.D == null) {
                    answerClone.getChildByName("BGD").active = false
                } else {
                    answerClone.getChildByName("BGD").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[0].Simple[RSimple].answer.D
                }
            } else if (window['a'].MaxMission > 20 && window['a'].MaxMission <= 50) {
                answerClone.getChildByName("datikuang").getChildByName("QuestLabel").getComponent(cc.Label).string = SubjectView.AnswerJson.json[1].Middle[RMiddle].quest
                answerClone.getChildByName("BGA").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[1].Middle[RMiddle].answer.A
                answerClone.getChildByName("BGB").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[1].Middle[RMiddle].answer.B
                answerClone.getChildByName("BGC").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[1].Middle[RMiddle].answer.C
                if (SubjectView.AnswerJson.json[1].Middle[RMiddle].answer.D == undefined || SubjectView.AnswerJson.json[1].Middle[RMiddle].answer.D == null) {
                    answerClone.getChildByName("BGD").active = false
                } else {
                    answerClone.getChildByName("BGD").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[1].Middle[RMiddle].answer.D
                }
            } else {
                answerClone.getChildByName("datikuang").getChildByName("QuestLabel").getComponent(cc.Label).string = SubjectView.AnswerJson.json[2].Difficulty[RDifficulty].quest
                answerClone.getChildByName("BGA").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[2].Difficulty[RDifficulty].answer.A
                answerClone.getChildByName("BGB").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[2].Difficulty[RDifficulty].answer.B
                answerClone.getChildByName("BGC").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[2].Difficulty[RDifficulty].answer.C
                if (SubjectView.AnswerJson.json[2].Difficulty[RDifficulty].answer.D == undefined || SubjectView.AnswerJson.json[2].Difficulty[RDifficulty].answer.D == null) {
                    answerClone.getChildByName("BGD").active = false
                } else {
                    answerClone.getChildByName("BGD").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[2].Difficulty[RDifficulty].answer.D
                }
            }
            self.node.destroy()
        })
    }
    // update (dt) {}
}
