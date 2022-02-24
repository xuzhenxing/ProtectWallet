import GameItem from "./GameItem";
import configStore from "../SDK/configStore";
import GameBoxTool from "./GameBoxTool";
import random from "../SDK/random";

const { ccclass, property } = cc._decorator;
/** 结算页6宫格 */
@ccclass
export default class SuccessGame extends cc.Component {
    @property(cc.Prefab)
    itme: cc.Prefab = null;
    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    contentSize: number = 0;

    Y: number = 110;
    boxArr = [0, 1, 2, 3, 4, 5]
    boxRanArr = []
    contenty
    i = 0
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (!configStore.gameList_ZJXJJ_JSY6GG || configStore.gameList_ZJXJJ_JSY6GG.length < 1 || !configStore.ZJXJJ_SPKG || !configStore.ZJXJJ_JSY6GG)
            return this.close()
        this.contenty = this.scrollView.node.getChildByName('view').children[0].y
        this.init()
        this.schedule(function () {
            this.init()
        }, 3);
    }
    init() {
        let gameDatas = [...configStore.gameList_ZJXJJ_JSY6GG];
        // console.log(gameDatas,'gameDatas=========')
        switch (configStore.strategy_ZJXJJ_JSY6GG) {
            case 1:
                GameBoxTool.shuffle_1(gameDatas)
                break;
            case 2:
                GameBoxTool.shuffle_2(gameDatas)
                break;
            case 3:
                GameBoxTool.shuffle_3(gameDatas)
                break;
            case 4:
                GameBoxTool.shuffle_4(gameDatas)
                break;
            case 5:
                GameBoxTool.shuffle_5(gameDatas)
                break;
            case 6:
                GameBoxTool.shuffle_6(gameDatas)
                break;
            default:
                break;
        }
        let oldNode = this.content.children;
        for (let i = 0; i < 6; i++) {
            if (gameDatas[this.i])
                var gameData = gameDatas[this.i];
            else {
                var gameData = gameDatas[this.i % gameDatas.length];
            }
            let name = gameData.name;
            let gameItem: GameItem = null;
            if (oldNode[i]) {
                //不重复创建互推位
                gameItem = oldNode[i].getComponent(GameItem);
            } else {
                let node = cc.instantiate(this.itme);
                node.parent = this.content;
                gameItem = node.getComponent(GameItem);
            }
            this.i += 1
            gameItem.init(gameData);
        }
       
    }

    start() {
        this.boxRanArr = random.getRandomArrayElements(this.boxArr, 1)
        this.boxRanArr.forEach(element => {
            this.content.children[element].getChildByName("hand").active = true
            this.content.children[element].getChildByName("hand").runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0.9, 0.9), cc.scaleTo(0.5, 1, 1))))
        });
    }
    close() {
        this.node.destroy()
    }
    moveChildreNode(dt) {
        if (this.content.childrenCount < 9)
            return
        var content = this.scrollView.node.getChildByName('view').children[0]
        var height = this.scrollView.node.getChildByName('view').children[0].getContentSize().height
        content.y += dt * this.Y
        if (content.y <= this.contenty) {
            this.Y = 110
        }
        if (content.y >= height - this.contenty) {
            this.Y = -110
        }
    }
    update(dt) {
        this.moveChildreNode(dt);
    }


    // update (dt) {}
}
