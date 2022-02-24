import GameItem from "./BottomGameItem";
import configStore from "../SDK/configStore";
import GameBoxTool from "./GameBoxTool";

const { ccclass, property } = cc._decorator;
/** 抖动icon */
@ccclass
export default class SingleGame extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    mask: cc.Node = null;
    gameDatas
    numArray = []
    add = 0
    onLoad() {
        this.add = 0
        if (!configStore.gameList_ZJXJJ_DDicon || configStore.gameList_ZJXJJ_DDicon.length < 1 || !configStore.ZJXJJ_SPKG || !configStore.ZJXJJ_DDicon)
            return this.node.active = false
        this.gameDatas =[...configStore.gameList_ZJXJJ_DDicon];
        // console.log(this.gameDatas,"this.gameDatas")
        switch (configStore.strategy_ZJXJJ_DDicon) {
            case 1:
                GameBoxTool.shuffle_1(this.gameDatas)
                break;
            case 2:
                GameBoxTool.shuffle_2(this.gameDatas)
                break;
            case 3:
                GameBoxTool.shuffle_3(this.gameDatas)
                break;
            case 4:
                GameBoxTool.shuffle_4(this.gameDatas)
                break;
            case 5:
                GameBoxTool.shuffle_5(this.gameDatas)
                break;
            case 6:
                GameBoxTool.shuffle_6(this.gameDatas)
                break;
            default:
                break;
        }

        configStore.numHuTui++
        if (configStore.numHuTui >= this.gameDatas.length - 1) {
            configStore.numHuTui = 0
        }
        let j = configStore.numHuTui
        this.init(this.gameDatas[j])
        this.schedule(() => {
            if (configStore.numHuTui >= this.gameDatas.length - 1) {
                configStore.numHuTui = 0
            }
            configStore.numHuTui++
            let j = configStore.numHuTui
            this.init(this.gameDatas[j])
        }, 3);
    }

    randomNum() {
        if (this.add >= this.gameDatas.length) {
            this.numArray = []
            this.add = 0
        }
        this.add++
        var j = Math.floor(Math.random() * this.gameDatas.length)
        if (this.numArray.includes(j)) {
            this.numArray.push(j)
            this.randomNum()
            return
        }
        this.init(this.gameDatas[j])
    }

    init(gameDatas) {
        let gameItem = this.mask.getComponent(GameItem);
        gameItem.init(gameDatas);
    }

    start() {

    }


    // update (dt) {}
}
