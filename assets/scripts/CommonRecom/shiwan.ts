import userStore from "./userStore";
import wxUtils from "../api/wxUtils";
import configStore from "../SDK/configStore";
import GameBoxTool from "./GameBoxTool";
import shiwanItem from "./shiwanItem";
var DataManager = require("DataManager")

const { ccclass, property } = cc._decorator;
@ccclass
export default class shiwan extends cc.Component {

    @property(cc.Node)
    btnReceive: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    success: Function = null;

    fail: Function = null;
    closeTime = 0
    isShared = false
    num = [];
    baidubanner: any;
    x = null

    // LIFE-CYCLE CALLBACKS:


    @property(cc.Prefab)
    suggestItemPrefab: cc.Prefab = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;


    @property({ type: cc.SpriteFrame, displayName: "引用图片" })
    uiSprite: cc.SpriteFrame[] = []

    speed: number = -50;

    hadInit: boolean = false;

    viewWidth: number = 0;

    contentWidth: number = 0;
    X: any = -100;
    i
    contentX
    init() {
        // console.log('configStore.gameList_ZJXJJ_HYRWGDT,')
        if (!configStore.gameList_ZJXJJ_HYRWGDT || configStore.gameList_ZJXJJ_HYRWGDT.length < 1  || !configStore.ZJXJJ_HYRWGDT) {
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
            let node = cc.instantiate(this.suggestItemPrefab);
            node.parent = this.content;
            let gameItem: shiwanItem = null;
             if (oldNode[i]) {
                //不重复创建互推位
                gameItem = oldNode[i].getComponent(shiwanItem);
                // console.log(gameItem, "gameItem+=======")
            } else {
                let num = i % 5
                let node = cc.instantiate(this.suggestItemPrefab);
                node.getComponent(cc.Sprite).spriteFrame = this.uiSprite[num]
                node.parent = this.scrollView.content;
                gameItem = node.getComponent(shiwanItem);
                // console.log(gameItem, "gameItem++++++++")
            }
            //初始化互推单体
            gameItem.init(gameDatas[i]);
            // init({ name, path, icon, appid, location_id, config_id ,type }, iconIndex = 0, loaded?: Function) {
                var {  path, icon, appid, location_id, config_id ,type } = gameDatas[i]
                // this.spriteArray = null
                if (!icon[0]) {
                    var e = []
                    e.push(icon)
                    icon = e
                }
                this.success = () => {
                    this.Post("AdvertisingJump", location_id, config_id, icon[0].iconid, "跳转")
                    userStore.shareTag = "keys_icon";
                    console.log("跳转游戏成功", name);
                }
                this.Post("AdvertisingExposure", location_id, config_id, icon[0].iconid, "曝光")
                // if(userStore.user.shiwangame.length>0){
                //     for(var n=0;n<userStore.user.shiwangame.length;n++){
                //         // if(userStore.user.shiwangame[n]==i){
                //         //     node.getChildByName('BtnGet').opacity=125
                //         // }
                //     }
                // }
                // for(var n=0;n<userStore.user.shiwangame.length;n++){
                //     if(userStore.user.shiwangame[n]==i){
                //         node.getChildByName('BtnSet').active = true
                //         node.getChildByName('BtnGet').active = false
                //     }
                // }
                node.getChildByName('BtnGet').on(cc.Node.EventType.TOUCH_END, () => {
                    if(userStore.user.shiwangame.length>0){
                        for(var n=0;n<userStore.user.shiwangame.length;n++){
                            if(userStore.user.shiwangame[n]==i){
                                wxUtils.showToast('你已试玩过该游戏，无法获得奖励')
                                return
                            }
                        }
                    }
                    this.Post("AdvertisingClick", gameDatas[i].location_id, gameDatas[i].config_id,gameDatas[i].icon[0].iconid, "点击")
                    var self=this
                    window['wx'] && wx.navigateToMiniProgram({
                        appId: gameDatas[i].appid,
                        path:gameDatas[i].path,
                        success() {
                            self.i=i
                            userStore.shareTag = "keys_icon";
                            self.closeTime = new Date().getTime();
                            self.Post("AdvertisingJump", gameDatas[i].location_id, gameDatas[i].config_id, gameDatas[i].icon[0].iconid, "跳转")
                            console.log("跳转游戏成功", gameDatas[i].name);
                        }
                    })
                });
                // this.node.off(cc.Node.EventType.TOUCH_END);
                // this.node.on(cc.Node.EventType.TOUCH_END, () => {
                //     console.log("点击跳转", name ,this.node);
                //     userStore.shareTag = "keys_icon";
                //     this.Post("AdvertisingClick", location_id, config_id, icon[0].iconid,type, "点击")
                //     GameBoxTool.navigate({ appid, path }, this.success, this.fail);
                // });
                // try {
                //     if (icon[0].type == 2) {
                //         this.addSprite(icon[0].icon)
                //         console.log(icon[0].icon  ,"  this.addSprite(icon[0].icon)")
                //     } else {
                //         let iconUrl = icon[0].icon
                //         GameBoxTool.loadIcon(iconUrl).then((res) => {
                //             const tex: cc.Texture2D = res as cc.Texture2D;
                //             node.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                //             // loaded && loaded();
                //         });
                //         // console.log(this.icon, " this.icon  ")
                //     }
                // } catch (error) {
                //     console.log("加载互推游戏图片失败！", error);
        
                // }
            // }
            // let name = gameDatas[i].name;
            // let gameItem: shiwanItem = null;
            // if (oldNode[i]) {
            //     //不重复创建互推位
            //     gameItem = oldNode[i].getComponent(shiwanItem);
            //     // console.log(gameItem, "gameItem+=======")
            // } else {
            //     let num = i % 5
            //     let node = cc.instantiate(this.suggestItemPrefab);
            //     node.getComponent(cc.Sprite).spriteFrame = this.uiSprite[num]
            //     node.parent = this.scrollView.content;
            //     gameItem = node.getComponent(shiwanItem);
            //     // console.log(gameItem, "gameItem++++++++")
            // }
            // //初始化互推单体
            // gameItem.init(gameDatas[i]);

        }

        // if (window["wx"]) {
        //     let self = this;
        //     // wx.onShow(function () {
        //         if ( userStore.shareTag == "keys_icon") {
        //             let curTime = new Date().getTime()
        //             // if (curTime - self.closeTime >= 15000) {
        //                 console.log(oldNode,"console.log(self.i)" , )
        //                 if (oldNode[i] !== null) {
        //                     console.log(self.i)
        //                     self.content.children[self.i].getChildByName('BtnGet').active = false; //试玩
        //                     self.content.children[self.i].getChildByName('BtnSet').active = true;  //已试玩

        //                     userStore.user.shiwangame[self.i] = 1;
        //                 }
        //                 console.log("我已经试玩了")
        //                 self.isShared = false;
        //                 userStore.shareTag = "";
        //                 // self.closeTime = curTime;
        //                 self.i = null;

        //                 //给奖励
        //                 //if (window["wx"]) ald.sendEvent("game_获取试玩奖励")
        //                 DataManager.userData.Tip++
        //                 // wanjiaxinxi.PlayerInfo.labour = userStore.user.power
        //                 // ToastManager.Toast.make("获得" + 3 + "点体力")
        //                 //刷新体力
        //                 cc.systemEvent.dispatchEvent(new cc.Event.EventCustom("tiliinit", true))

        //                 wxUtils.showToast("恭喜你获得奖励");
        //             // } 
        //             // else {
        //             //     //if (window["wx"]) ald.sendEvent("game_获取试玩奖励失败")
        //             //     self.isShared = false;
        //             //     userStore.shareTag = "";
        //             //     self.closeTime = curTime;
        //             //     wx.showModal({
        //             //         title: '提示',
        //             //         content: '请体验15秒后领取奖励',
        //             //         showCancel: false,
        //             //         success(res) {
        //             //             if (res.confirm) {
        //             //                 console.log('用户点击确定')
        //             //             }
        //             //         }
        //             //     })
        //             // }
        //         }
        //     // })
        // }
        // for (var i = 0; i < userStore.user.shiwangame.length; i++) {
        //     if (userStore.user.shiwangame[i] == 1) {
        //         this.num.push(i)
        //     }
        // }
        // let self = this;
        // for (var i = 0; i < gameDatas.length; i++) {
        //     var item = gameDatas[i]
        //     if (this.num.includes(item.position - 1)) {
        //         // Box.getChildByName('BtnGet').active = false
        //         // Box.getChildByName('BtnSet').active = true;  //已试玩
        //         self.content.children[self.i].getChildByName('BtnGet').active = false; //试玩
        //         self.content.children[self.i].getChildByName('BtnSet').active = true;  //已试玩

        //     }
        // }
    }
    Post(log_type, location_id, config_id, icon_id,log) {
        var option = {
            'uid': sdk.getUser().uid,
            'location_id': location_id,
            'config_id': config_id,
            'icon_id': icon_id,
        };
        sdk.Post('https://log.llewan.com:1999/Log/common', {
            log_type: log_type,
            data: JSON.stringify(option)
        }, function (d) {
            sdk.log("sdk 广告" + log + d);
        });
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
    // spriteArray: cc.SpriteFrame = null
    onLoad() {
        this.btnReceive.active = false;
        this.contentX = this.scrollView.node.getChildByName('view').children[0].x
        this.init();
        this.scheduleOnce(() => {
            this.btnReceive.active = true;
        }, 2)


        if (window['wx']) {
            var self = this
            wx.onShow(function () {
                if (userStore.shareTag == "keys_icon") {
                    userStore.shareTag = ''
                    //分享后返回
                    let curTime = new Date().getTime();
                    console.log(curTime , self.closeTime)
                    if (curTime - self.closeTime >= 10000) {
                        // cc.game.emit(EventType.EventType.KeyPowerEffect, {
                        //     type: "add",
                        //     count: 2
                        // })
                        DataManager.userData.Tip+=2
                        wxUtils.showToast("恭喜你获得了奖励!")
                        userStore.user.shiwangame.push(self.i)
                        // self.content.children[self.i].getChildByName('BtnGet').active=false
                        // self.content.children[self.i].getChildByName('BtnSet').active=true
                    }
                    else{
                        wxUtils.showToast('请试玩10秒钟领取奖励')
                    }
                    self.closeTime = curTime
                }

            })
        }
        // if (window["wx"]) {
        //     let self = this;
        //     // wx.onShow(function () {
        //         if ( userStore.shareTag == "keys_icon") {
        //             let curTime = new Date().getTime()
        //             // if (curTime - self.closeTime >= 15000) {
        //                 console.log(self.content.children[this.i],"console.log(self.i)")
        //                 if (self.i !== null) {
        //                     console.log(self.i)
        //                     self.content.children[self.i].getChildByName('BtnGet').active = false; //试玩
        //                     self.content.children[self.i].getChildByName('BtnSet').active = true;  //已试玩

        //                     userStore.user.shiwangame[self.i] = 1;
        //                 }
        //                 console.log("我已经试玩了")
        //                 self.isShared = false;
        //                 userStore.shareTag = "";
        //                 // self.closeTime = curTime;
        //                 self.i = null;

        //                 //给奖励
        //                 //if (window["wx"]) ald.sendEvent("game_获取试玩奖励")
        //                 DataManager.userData.Tip++
        //                 // wanjiaxinxi.PlayerInfo.labour = userStore.user.power
        //                 // ToastManager.Toast.make("获得" + 3 + "点体力")
        //                 //刷新体力
        //                 cc.systemEvent.dispatchEvent(new cc.Event.EventCustom("tiliinit", true))

        //                 wxUtils.showToast("恭喜你获得奖励");
        //             // } 
        //             // else {
        //             //     //if (window["wx"]) ald.sendEvent("game_获取试玩奖励失败")
        //             //     self.isShared = false;
        //             //     userStore.shareTag = "";
        //             //     self.closeTime = curTime;
        //             //     wx.showModal({
        //             //         title: '提示',
        //             //         content: '请体验15秒后领取奖励',
        //             //         showCancel: false,
        //             //         success(res) {
        //             //             if (res.confirm) {
        //             //                 console.log('用户点击确定')
        //             //             }
        //             //         }
        //             //     })
        //             // }
        //         }
        //     // })
        // }

    }

    start() {
        this.node.active = true;
        // if (this.content.childrenCount == 0){
        //     this.BoxItme()
        // }
    }

    unique(arr) {
        let hash = [];
        for (let i = 0; i < arr.length; i++) {
            if (hash.indexOf(arr[i]) === -1) {
                hash.push(arr[i]);
            }
        }
        return hash;
    }


    // addSprite(gifsUrl) {
    //     GameBoxTool.loadIcon(gifsUrl).then((res) => {
    //         const tex: cc.Texture2D = res as cc.Texture2D;
    //         this.spriteArray = new cc.SpriteFrame(tex)
    //         this.x = this.spriteArray.getTexture() ? this.spriteArray.getTexture().width / 3 : 160
    //     });
    // }
    BoxItme() {
        // console.log(userStore.user.shiwangame.length, configStore.gameList_ZJXJJ_HYRWGDT)
        for (var i = 0; i < userStore.user.shiwangame.length; i++) {
            if (userStore.user.shiwangame[i] == 1) {
                this.num.push(i)
            }
        }
        // for(var i = 0; i < gamew.length;i ++){
        //          var item = gamew[i]
        //     }
        // console.log(this.num)
        // let gamew = this.shuzuquchong(configStore.gameList_ZJXJJ_HYRWGDT);
        // console.log('sss', gamew)
        // this.init(configStore.gameList_ZJXJJ_HYRWGDT)
        // for(var i = 0; i < gamew.length;i ++){
        //      var item = gamew[i]
        // }

        // this.init(item)
        // let gameItem: GameItem = null;
        //     gameItem.init(item);
        // gamew.forEach(item => {
        // console.log(item)
        // if (window["wx"]) ald.sendEvent("recom_总曝光", { 'game': item.name })
        // if (window["wx"]) ald.sendEvent("recom_百宝袋曝光", { 'game': item.name })
        // let Box = cc.instantiate(this.PlayeGameBox);
        // Box.parent = this.content;
        // console.log(Box)
        // console.log(item.icon[0])

        // try {
        //     console.log(item.icon[0].type)
        //     if (item.icon[0].type == 2) {
        //         console.log(item.icon[0].icon)
        //         this.addSprite(item.icon[0].icon)
        //         console.log(item.icon[0].icon  ," item.icon[0].icon")
        //     }
        //     else {
        //         cc.loader.load(item.icon[0].icon, (err, tex) => {
        //             // console.log(item.icon[0])
        //             Box.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex)
        //         })
        //         // let iconUrl = icon[0].icon
        //         // GameBoxTool.loadIcon(iconUrl).then((res) => {
        //         //     const tex: cc.Texture2D = res as cc.Texture2D;
        //         //     icon.spriteFrame = new cc.SpriteFrame(tex);
        //         //     loaded && loaded();
        //         // });
        //     }
        // } catch (error) {
        //     console.log("加载互推游戏图片失败！", error);

        // }
        //Box.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = item.icon;
        //Box.getChildByName('Name').getComponent(cc.Label).string = item.name;

        // if (this.num.includes(item.position - 1)) {
        //         Box.getChildByName('BtnGet').active = false
        //         Box.getChildByName('BtnSet').active = true;  //已试玩
        //     } else {
        //         Box.getChildByName('BtnGet').off(cc.Node.EventType.TOUCH_END)
        //         Box.getChildByName('BtnGet').on(cc.Node.EventType.TOUCH_END, () => {
        //             this.i = item.position - 1;
        //             wx.showLoading({
        //                 title: '加载中',
        //             })
        //             setTimeout(function () {
        //                 wx.hideLoading()
        //             }, 100)

        //             this.scheduleOnce(function () {
        //                 var self = this
        //                 wx.navigateToMiniProgram({
        //                     appId: item.appid,
        //                     path: item.path,
        //                     envVersion: 'release',
        //                     success(res) {
        //                         console.log("跳转成功")
        //                         self.isShared = true;
        //                         userStore.shareTag = "keys_icon";
        //                         self.closeTime = new Date().getTime()
        //                         // if (window["wx"]) ald.sendEvent("recom_总导流", { 'games': item.name })
        //                         // if (window["wx"]) ald.sendEvent("recom_百宝袋导流", { 'games': item.name })
        //                     },
        //                     fail(res) {
        //                         console.log("跳转失败")
        //                         self.isShared = false;
        //                         userStore.shareTag = "";
        //                         self.closeTime = new Date().getTime()
        //                         // if (window["wx"]) ald.sendEvent("recom_百宝袋导流失败", { 'games': item.name })

        //                     }
        //                 })
        // }, 0.1);
        //    })
        //    }
        // }
    }

    //数组哈希值去重
    shuzuquchong(gameboxes) {
        var newarray = {}
        var gameboxenew = []
        for (var i = 0; i < gameboxes.length; i++) {
            if (!newarray[gameboxes[i]['name']]) {
                newarray[gameboxes[i]['name']] = gameboxes[i]

                // console.log(newarray[gameboxes[i]['name']])
            }
        }
        for (var key in newarray) {
            if (newarray.hasOwnProperty(key)) {
                gameboxenew.push(newarray[key])
                // console.log(gameboxenew.push(newarray[key]))
            }
        }
        // console.log(gameboxenew)
        return gameboxenew
    }

    // Post(log_type, location_id, config_id, icon_id, type,log) {
    //     var option = {
    //         'uid': sdk.getUser().uid,
    //         'location_id': location_id,
    //         'config_id': config_id,
    //         'icon_id': icon_id,
    //         'type':type
    //     };
    //     sdk.Post('https://log.llewan.com:1999/Log/common', {
    //         log_type: log_type,
    //         data: JSON.stringify(option)
    //     }, function (d) {
    //         sdk.log("sdk 广告" + log + d);
    //     });
    // }
    onBtnReceive() {
        this.node.destroy();
    }

    // update (dt) {}

    onDestroy() {

    }
}
