
const { ccclass, property } = cc._decorator;
@ccclass
export default class GetAwaird extends cc.Component {

    @property(cc.Node)
    Close: cc.Node = null;
    start() {
        this.Close.on(cc.Node.EventType.TOUCH_END, this.CloseClick, this)
    }
    CloseClick() {
        this.node.destroy()
    }
}
