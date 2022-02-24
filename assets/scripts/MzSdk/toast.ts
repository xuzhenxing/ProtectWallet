
const { ccclass, property } = cc._decorator;

@ccclass
export default class toast extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    lab

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    start() {
        this.label.string = this.lab
        this.scheduleOnce(() => {
            this.node.destroy
        }, 2)
       
    }
    bindDate(e) {
        console.log(this.lab,"this.lab")
        this.lab = e
    }

    // update (dt) {}
}
