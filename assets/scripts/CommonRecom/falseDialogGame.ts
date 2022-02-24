import GameBoxTool from "./GameBoxTool";
import GameItem from "./GameItem";
import configStore from "../SDK/configStore";
// var lwsdk = require("lwsdk")
const { ccclass, property } = cc._decorator;
/** 假最近使用 */
@ccclass
export default class falseDialogGame extends cc.Component {

    @property(cc.Prefab)
    itme: cc.Prefab = null

    @property(cc.Node)
    content: cc.Node = null

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;


    contenty
    Y: number = 110;

    // LIFE-CYCLE CALLBACKS:
    onEnable() {
        if (!configStore.gameList_ZJXJJ_FXCXLBY || configStore.gameList_ZJXJJ_FXCXLBY.length < 1 || !configStore.ZJXJJ_SPKG || !configStore.ZJXJJ_FXCXLBY)
            return this.backBtn()
    }

    onLoad() {
        this.scrollViewMove(this.scrollView, 4000, true, false,'scrollView')
        this.contenty = this.scrollView.node.getChildByName('view').children[0].y
        this.init()
    }
    init() {
        if (!configStore.gameList_ZJXJJ_FXCXLBY || configStore.gameList_ZJXJJ_FXCXLBY.length < 1 || !configStore.ZJXJJ_SPKG || !configStore.ZJXJJ_FXCXLBY)
            return this.backBtn()
        // UIManager.closePanel("MoneyBar")
        let gameDatas = [...configStore.gameList_ZJXJJ_FXCXLBY];
        switch (configStore.strategy_ZJXJJ_FXCXLBY) {
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
                oldNode[i].getChildByName('star').active = Math.random() < 0.2
                gameItem = oldNode[i].getComponent(GameItem);
            } else {
                let node = cc.instantiate(this.itme);
                node.parent = this.content;
                gameItem = node.getComponent(GameItem);
            }

            gameItem.init(gameData);

        }
    }
    backBtn() {
        console.log("假退出显示玩法界面banner")
        if(this.node.parent.name == "hutui"){
            console.log("假退出隐藏anner")
            // adSdk.hideBanner()
        }else{
            // adSdk.showBanner("玩法页面",true,true,10)

        }
        // if(this.node.parent.name == "boxPanel"){
        //     this.node.active = false
        // }else{
            this.node.destroy()
        // }
        // UIManager.show("MoneyBar")
    }
    // moveChildreNode(dt) {
    //     if (this.content.childrenCount < 10)
    //         return
    //     var content = this.scrollView.node.getChildByName('view').children[0]
    //     var height = this.scrollView.node.getChildByName('view').children[0].getContentSize().height
    //     content.y += dt * this.Y
    //     console.log(content.y  ,   "     "  ,  (this.contenty + 600)   ,"height"  ,height - (this.contenty + 800))
    //     if (content.y <= (this.contenty + 800)) {
    //         this.Y = 110
    //     }
    //     if (content.y >= height - (this.contenty + 800)) {
    //         this.Y = -110
    //     }
    // }
    // update(dt) {
    //     this.moveChildreNode(dt);
    // }

    private scrollViewMove(scrollView: cc.ScrollView, t: number, dir: boolean, isLeftToRight: boolean, isShwo: string): void {
        let callback = () => {
            if (isLeftToRight) {
                if(!scrollView)
                return
                if (dir) {
                    setTimeout(() => {
                        scrollView.scrollToLeft(t / 1000, false)
                        dir = !dir
                    }, 200);
                } else {
                    setTimeout(() => {
                        scrollView.scrollToRight(t / 1000, false)
                        dir = !dir
                    }, 200);
                }
            } else {
                if (dir) {
                    setTimeout(() => {
                        scrollView.scrollToBottom(t / 1000, false)
                        dir = !dir
                    }, 200);
                } else {
                    setTimeout(() => {
                        scrollView.scrollToTop(t / 1000, false)
                        dir = !dir
                    }, 200);
                }
            }
        }
        callback()
        let cb = setInterval(() => {
            if (!this[isShwo]) clearInterval(cb)
            callback()
        }, t)
    }
    // update (dt) {}
}
