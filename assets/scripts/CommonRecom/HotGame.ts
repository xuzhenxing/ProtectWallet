import GameItem from "./GameItem";
import configStore from "../SDK/configStore";
import GameBoxTool from "./GameBoxTool";
// import bannerManager from "../api/bannerManager";

const { ccclass, property } = cc._decorator;
/** 好友在玩 */
@ccclass
export default class HotGame extends cc.Component {
    @property(cc.Prefab)
    itme: cc.Prefab = null;
    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    contentSize: number = 0;

    Y: number = 110;

    contenty
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log(configStore.ZJXJJ_WYWC, "ZJXJJ_WYWC")
        if (configStore.ZJXJJ_WYWC) {
            // adSdk.hideBanner()
            this.scheduleOnce(() => {
                console.log("延迟一秒调用banner误触")
                // adSdk.showBanner("位移误触", true, true, 140)
            }, 1)
            this.scheduleOnce(() => {
                // adSdk.hideBanner()
                console.log("延迟两秒恢复banner误触")
                // adSdk.showBanner("位移误触", true, true, 10)
            }, 3)
        }else{
            // adSdk.showBanner("位移误触", true, true, 10)
        }

        this.contenty = this.scrollView.node.getChildByName('view').children[0].y
        this.init()
    }
    init() {

        console.log(!configStore.gameList_ZJXJJ_BKYXTJ, configStore.ZJXJJ_BKYXTJ, "ZJXJJ_BKYXTJ 爆款游戏推荐配置")
        if (!configStore.gameList_ZJXJJ_BKYXTJ || configStore.gameList_ZJXJJ_BKYXTJ.length < 1 || !configStore.ZJXJJ_BKYXTJ)
            return this.close()
        let gameDatas = configStore.gameList_ZJXJJ_BKYXTJ;
        switch (configStore.strategy_ZJXJJ_BKYXTJ) {
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
        let games: string[] = [];
        for (let i = 0; i < gameDatas.length; i++) {
            let gameData = gameDatas[i];
            let name = gameData.name;
            games.push(name);

            let gameItem: GameItem = null;
            if (oldNode[i]) {
                //不重复创建互推位
                gameItem = oldNode[i].getComponent(GameItem);
            } else {
                let node = cc.instantiate(this.itme);
                node.parent = this.content;
                gameItem = node.getComponent(GameItem);
            }
            gameItem.init(gameData);
        }
        this.node.getChildByName("close").active = true //ZJXJJ-WYWC

        // if(configStore.ZJXJJ_WYWC){
        // }

        // adSdk.showBanner("爆款游戏推荐",true,true,5)
        // bannerManager.commonShow(true)
    }

    start() {

    }
    close() {
        this.node.destroy()
        // configStore.is_newHotGame = false
        // adSdk.hideBanner()
        // bannerManager.commonHide()
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
