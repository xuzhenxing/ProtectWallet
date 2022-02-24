import GameBoxTool from "./GameBoxTool";
import configStore from "../SDK/configStore";


const { ccclass, property } = cc._decorator;
/** 好友热玩按钮 */
@ccclass
export default class HotGameButton extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (!configStore.gameList_ZJXJJ_BKYXTJ || configStore.gameList_ZJXJJ_BKYXTJ.length < 1 || !configStore.ZJXJJ_SPKG || !configStore.ZJXJJ_BKYXTJ)
            return this.node.active = false
        this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0.9, 0.9), cc.scaleTo(0.5, 1, 1))))
    }

    start() {

    }
    HotGameButton() {
        GameBoxTool.showHotGame()
    }

    // update (dt) {}
}
