import GameItem from "./GameItem";
// import bannerManager from "../api/bannerManager";
import configStore from "../SDK/configStore";
import GameBoxTool from "./GameBoxTool";
// console.log(window['levelFailView'])
const { ccclass, property } = cc._decorator;
/** 聚合页 */
@ccclass
export default class JuHeGame extends cc.Component {
    static e = null
    @property(cc.Prefab)
    itme: cc.Prefab = null;
    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    contentSize: number = 0;

    Y: number = 110;

    contenty
    @property(cc.Prefab)
    itme_top: cc.Prefab = null;
    @property(cc.Node)
    content_top: cc.Node = null;
    @property(cc.ScrollView)
    scrollView_top: cc.ScrollView = null;

    @property(cc.Node)
    back: cc.Node = null;
    @property(cc.Node)
    Btn1:cc.Node = null
    @property(cc.SpriteFrame)
    nameBG: cc.SpriteFrame[] = []
    contentSize_top: number = 0;

    num = 0
    X: number = -110;

    contentX
    // LIFE-CYCLE CALLBACKS:
    gameData = true
    onEnable() {
        // adSdk.hideBanner()
        // bannerManager.commonHide()
        this.gameData = true
        this.back.active = true
        this.Btn1.active = false
        this.scheduleOnce(function () {
            this.Btn1.active = true
        }, 3);
    }

    
    onLoad() {
        // UIManager.closePanel("MoneyBar")
        // console.log("configStore.gameList_ZJXJJ_HYRWGDT", configStore.gameList_ZJXJJ_HYRWGDT)
        this.back.on(cc.Node.EventType.TOUCH_END,this.close,this)
        this.Btn1.on(cc.Node.EventType.TOUCH_END,this.backClick,this)
        this.contenty = this.scrollView.node.getChildByName('view').children[0].y
        this.contentX = this.scrollView_top.node.getChildByName('view').children[0].x
        this.init()
        this.init_top()
    }
    init() {
        // console.log("configStore.gameList_ZJXJJ_HYRWGDT", configStore.gameList_ZJXJJ_HYRWGDT)
        console.log("configStore.ZJXJJ_SPKG", configStore.ZJXJJ_SPKG)
        console.log("configStore.ZJXJJ_HYRMTGY", configStore.ZJXJJ_HYRWGDT)
        if (!configStore.gameList_ZJXJJ_HYRWGDT ||
            configStore.gameList_ZJXJJ_HYRWGDT.length < 1 ||
            !configStore.ZJXJJ_SPKG ||
            !configStore.ZJXJJ_HYRWGDT)
            return this.gameData = false, this.close()
        let gameDatas = [...configStore.gameList_ZJXJJ_HYRWGDT];
        switch (configStore.strategy_ZJXJJ_HYRMTGY) {
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
                node.getChildByName('nameBG').getComponent(cc.Sprite).spriteFrame = this.nameBG[i % this.nameBG.length]
            }

            gameItem.init(gameData);

        }
    }
    init_top() {
        let gameDatas = [...configStore.gameList_ZJXJJ_HYRWGDT];
        switch (configStore.strategy_ZJXJJ_HYRMTGY) {
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
        let oldNode = this.content_top.children;
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
                let node = cc.instantiate(this.itme_top);
                node.parent = this.content_top;
                gameItem = node.getComponent(GameItem);
                node.getChildByName('nameBG').getComponent(cc.Sprite).spriteFrame = this.nameBG[i % this.nameBG.length]
            }

            gameItem.init(gameData);
            // console.log(gameData,"gameData聚合页")
            gameItem.success = () => {
                console.log("跳转游戏成功", name);
                //TODO:
                this.Post("AdvertisingClick", gameData[i].location_id, gameData[i].config_id, gameData[i].icon[0].iconid, "点击")
            }
            gameItem.fail = () => {
                console.log("跳转游戏失败", name);
                //打开聚合页
                //ald.sendEvent("最近使用互推游戏跳转失败", { 'game': name })
            }
        }
    }

    start() {

    }
    onDisable() {
        JuHeGame.e && (JuHeGame.e(), JuHeGame.e = null)
    }
    close() {
        if (this.gameData) {
            let gameDatas = [...configStore.gameList_ZJXJJ_HYRWGDT];
            let j = Math.floor(Math.random() * gameDatas.length);
            var appid = gameDatas[j].appid
            var path = gameDatas[j].path
            var name = gameDatas[j].name
            var success = () => {
                console.log("跳转游戏成功", name);
                this.Post("AdvertisingClick", gameDatas[j].location_id, gameDatas[j].config_id, gameDatas[j].icon[0].iconid, "点击")
                GameBoxTool.navigate({ appid, path }, success, fail);
            }
            var fail = () => {
                console.log("跳转游戏失败", name);
            }
            GameBoxTool.navigate({ appid, path }, success, fail);
        }
        else {
            this.node.destroy()
        }
    }

    moveChildreNode(dt) {
        if (this.content.childrenCount < 10)
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
    moveChildreNode_top(dt) {
        if (this.content_top.childrenCount < 5)
            return
        var content = this.scrollView_top.node.getChildByName('view').children[0]
        var width = this.scrollView_top.node.getChildByName('view').children[0].getContentSize().width
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
        this.moveChildreNode_top(dt);
    }

    backClick(){
        // console.log(window['levelFailView'])
        console.log("聚合按钮关闭banner隐藏 , configStore.ZJXJJ_CJJL" ,configStore.ZJXJJ_CJJL)
        // adSdk.hideBanner()
        if(configStore.ZJXJJ_CJJL){
            if(window['levelFailView']){
                window['levelFailView'].showDian()
            }else if(window['levelView']){
                window['levelView'].showDian()
            }else{
                window['levelView'].showDian()
            }

        }
        // window['levelView'].showDian()
        this.node.destroy()
    }
    onDestroy() {
        this.node.destroy()
        // this.unscheduleAllCallbacks()
        // adSdk.showInterstitialAd("adunit-d8077f2cbf5e3257")
        // if (!configStore.ZJXJJ_BDJSY) {
        //     bannerManager.commonShow(true)
        // } else {
        //     if (/**"PlayerManager.info.fb % 2 === 0 &&" */!configStore.ZJXJJ_SMJL) {
        //         bannerManager.commonShow(true)
        //         console.log("延迟")
        //         let event = new cc.Event("showDelay", true)
        //         cc.systemEvent.dispatchEvent(event)
        //     } else {
        //     }
        // }
        // let event2 = new cc.Event("showbanner", true)
        // cc.systemEvent.dispatchEvent(event2)
        // let event3 = new cc.Event("showBox", true)
        // cc.systemEvent.dispatchEvent(event3)
    }

    Post(log_type, location_id, config_id, icon_id, log) {
        var option = {
            'uid': sdk.getUser().uid,
            'location_id': location_id,
            'config_id': config_id,
            'icon_id': icon_id
        };
        sdk.Post('https://log.llewan.com:1999/Log/common', {
            log_type: log_type,
            data: JSON.stringify(option)
        }, function (d) {
            sdk.log("sdk 广告" + log + d);
        });
    }
}
