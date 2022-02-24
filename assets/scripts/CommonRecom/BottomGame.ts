
import GameItem from "./BottomGameItem";
import GameBoxTool from "./GameBoxTool";
import configStore from "../SDK/configStore";
import BottomGameItem from "./BottomGameItem";

const { ccclass, property } = cc._decorator;

/** 底部游戏推荐 */
@ccclass
export default class BottomGame extends cc.Component {

    @property(cc.Prefab)
    suggestItemPrefab: cc.Prefab = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property({ type: cc.SpriteFrame, displayName: "引用图片" })
    uiSprite: cc.SpriteFrame[] = []

    speed: number = -50;

    hadInit: boolean = false;

    viewWidth: number = 0;

    contentWidth: number = 0;
    X: any = -100;
    contentX
    onLoad() {
        this.contentX = this.scrollView.node.getChildByName('view').children[0].x
        this.init();
    }
    init() {
        console.log('configStore.gameList_ZJXJJ_HYRWGDT,')
        if (!configStore.gameList_ZJXJJ_HYRWGDT || configStore.gameList_ZJXJJ_HYRWGDT.length < 1 || !configStore.ZJXJJ_SPKG || !configStore.ZJXJJ_HYRWGDT){
            return this.node.active = false
        }
        let gameDatas = [...configStore.gameList_ZJXJJ_HYRWGDT];
        switch (configStore.strategy_ZJXJJ_HYRWGDT) {
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
        for (let i = 0; i < gameDatas.length; i++) {
            let name = gameDatas[i].name;
            let gameItem: BottomGameItem = null;
            if (oldNode[i]) {
                //不重复创建互推位
                gameItem = oldNode[i].getComponent(BottomGameItem);
            } else {
                let num = i % 5
                let node = cc.instantiate(this.suggestItemPrefab);
                node.getComponent(cc.Sprite).spriteFrame = this.uiSprite[num]
                node.parent = this.scrollView.content;
                gameItem = node.getComponent(BottomGameItem);
            }
            //初始化互推单体
            gameItem.init(gameDatas[i]);

        }
    }
    moveChildreNode(dt) {
        if (this.content.childrenCount < 5)
            return
        var content = this.scrollView.node.getChildByName('view').children[0]
        var width = this.scrollView.node.getChildByName('view').children[0].getContentSize().width
        content.x += dt * this.X
        if (content.x >= this.contentX) {
            this.X = -110
        }
        if (content.x <= this.contentX - width) {
            this.X = 110
        }
    }
    update(dt) {
        this.moveChildreNode(dt);
    }
}
