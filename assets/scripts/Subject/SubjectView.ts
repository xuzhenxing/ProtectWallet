
var lwsdk = require("lwsdk")
const {ccclass, property} = cc._decorator;
@ccclass
export default class SubjectView extends cc.Component {


    @property(cc.Prefab)
    SubItem:cc.Prefab = null
    @property(cc.Node)
    content:cc.Node = null
    @property(cc.Node)
    Close:cc.Node = null

    static AnswerJson:any
    // @property(cc.Node)
    // Answer:cc.Node = null
    static instance = null;
    static getInstance(){
        return this.instance  || (this.instance = new SubjectView()),this.instance
    }
    onLoad(){
        this.createQuest()
        this.Close.on(cc.Node.EventType.TOUCH_END,this.CloseClick,this)
    }
    static loadJson(){
        cc.loader.loadRes("Config/Quest",(err,AnswerJ)=>{
            if(err){
                console.log(err)
            }
            // console.log(AnswerJ)
            SubjectView.AnswerJson = AnswerJ
            // window['AnswerJSON'] = AnswerJ
            // console.log(SubjectView.AnswerJson.json)
            // this.AnswerJson = <FishType[]>AnswerJ.json;
        })
    }
    CloseClick(){
        lwsdk.showAuthoriseButton()
        this.node.active = false
    }
    HideNode(){
        this.node.active = false
    }
    createQuest(){
        console.log(this.content.childrenCount)
        if (this.content.childrenCount) {
            this.node.active = true
        }else{
            var knowledgeLength = window['a'].MaxMission * 2
            // console.log(knowledgeLength)
            if (knowledgeLength > window['knowledge'].json.length) {
                knowledgeLength = window['knowledge'].json.length
            }
            for (let i = 0; i < knowledgeLength; i++) {
                var clone = cc.instantiate(this.SubItem)
                clone.parent = this.content
                clone.getChildByName("questionLabel").getComponent(cc.Label).string = window['knowledge'].json[i].knowledge
                if(window['knowledge'].json[i].hard == 1){
                    clone.getChildByName("dif").getChildByName("difnum1").active = false
                    clone.getChildByName("dif").getChildByName("difnum2").active = false
                }else if (window['knowledge'].json[i].hard == 2){
                    clone.getChildByName("dif").getChildByName("difnum2").active = false
                }else{
    
                }
            }
        }
        // console.log(this.node)
    }
}
