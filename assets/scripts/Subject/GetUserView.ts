// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Close:cc.Node = null 
    @property(cc.Node)
    Sure:cc.Node = null
    start () {
        this.Sure.on(cc.Node.EventType.TOUCH_END,this.SureClick,this)
        this.Close.on(cc.Node.EventType.TOUCH_END,this.CloseClick,this)
    }
    SureClick(){
        cc.loader.loadRes("ui/RankView",((err,Pre)=>{
            var RankPre = cc.instantiate(Pre)
            RankPre.parent = this.node.parent
            // cc.find("Canvas")
            this.node.parent.getChildByName("GetUserView").destroy()
          
        }))
    }
    CloseClick(){
        this.node.destroy()
    }

    // update (dt) {}
}
