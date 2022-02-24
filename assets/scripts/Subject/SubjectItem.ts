import SubjectView from "./SubjectView";

const {ccclass, property} = cc._decorator;
@ccclass
export default class SubjectItem extends cc.Component {
    // @property(cc.Label)
    // TitleLabel:cc.Label = null
    @property(cc.Prefab)
    AnswerPre:cc.Prefab = null
    static answerClone:any
    onLoad(){
        // this.node.on(cc.Node.EventType.TOUCH_END,this.ItemClick,this)
    }

    ItemClick(){
        SubjectItem.answerClone = cc.instantiate(this.AnswerPre)
        SubjectItem.answerClone.parent = this.node.parent.parent.parent.parent
        SubjectItem.answerClone.getChildByName("datikuang").getChildByName("QuestLabel").getComponent(cc.Label).string = SubjectView.AnswerJson.json[0].quest
        SubjectItem.answerClone.getChildByName("BGA").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[0].answer.A
        SubjectItem.answerClone.getChildByName("BGB").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[0].answer.B
        SubjectItem.answerClone.getChildByName("BGC").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[0].answer.C
        if(SubjectView.AnswerJson.json[0].answer.D == undefined || SubjectView.AnswerJson.json[0].answer.D == null){
            SubjectItem.answerClone.getChildByName("BGD").active = false
        }else{
            SubjectItem.answerClone.getChildByName("BGD").getChildByName("Answer").getComponent(cc.Label).string = SubjectView.AnswerJson.json[0].answer.D
        }
    }
    
    // titleLab(){

    // }
}
