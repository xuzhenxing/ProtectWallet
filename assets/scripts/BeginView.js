var n = require("util"),
    a = require("UIInfo"),
    o = require("ConstModName");
//  levelViews = require("levelView");
require("GameConfig"), require("GameDefine");
var wxUtils = require("wxUtils");
var dataBase = require("DataBase");
var cfs = require("configStore");
var lwsdk = require("lwsdk");
var gameSDK = require("gameSDK");
var BeginView = cc.Class({
    properties: {
        baseUIView: null,
        viewNode: null,
        componentTable: null,
        widgetTable: null,
        DataModule: null,
        initNum: 0,
        times: 0,
        ban:0

    },
    loadJson() {
        cc.loader.loadRes("Config/Quest", (err, AnswerJ) => {
            if (err) {
                console.log(err)
            }
            window['AnswerJSON'] = AnswerJ
            // console.log(window['AnswerJSON'])
        })
        cc.loader.loadRes("Config/Knowledge", (err, Know) => {
            if (err) {
                console.error(err)
            }
            window['knowledge'] = Know
            // console.log(window['knowledge'].json[0])
        })

        cc.loader.loadRes("Config/ChooseHint", (err, AnswerJ) => {
            if (err) {
                console.log(err)
            }
            window['ChooseHint'] = AnswerJ
        })
    },
    HandleEvent: function HandleEvent(e) {
        // switch (e.currentTarget.name) {
        //     case "BeginGameBtn":
        //         this.PlayCloseAni();
        //         break;
        //     case "FashionBtn":
        //         this.PlayCloseAni();
        //         break;
        //     case "MssionBtn":
        //         this.PlayCloseAni();
        //         break;
        //     case "SettingBtn":
        //         break
        // }
    },
    AddEvent: function AddEvent() {
        for (var e in this.widgetTable) {

            if (this.widgetTable.hasOwnProperty(e)) {
                var t = this.widgetTable[e];
                1 != t.name.indexOf("Btn") && t.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
            }
        }
    },
    Init: function Init(e) {
        this.loadJson()
        BeginView = this //新
        this.baseUIView = e,
            this.viewNode = this.baseUIView.viewNode,
            this.BindUI(),
            n.ParseWidgetByTable(this.viewNode, this.widgetTable),
            n.ParseComponentByTable(this.viewNode, this.componentTable),
            this.componentTable.NodeAni = this.viewNode.getComponent(cc.Animation),
            this.AddEvent(),

            // this.componentTable.MissionLabel.active = false
            // this.widgetTable.BeginGameBtn.on(cc.Node.EventType.TOUCH_END, this.beginClick, this),
            this.widgetTable.SettingBtn.on(cc.Node.EventType.TOUCH_END, this.settingClick, this),
            this.widgetTable.MssionBtn.on(cc.Node.EventType.TOUCH_END, this.mssionClick, this),
            this.widgetTable.FashionBtn.on(cc.Node.EventType.TOUCH_END, this.fashionClick, this),
            this.widgetTable.rankBtn.on(cc.Node.EventType.TOUCH_END, this.rankBtnClick, this) //新
        this.widgetTable.chengjiuBtn.on(cc.Node.EventType.TOUCH_END, this.ChengjiuClick, this) //新
        this.widgetTable.tiku.on(cc.Node.EventType.TOUCH_END, this.tikuClick, this) //新
        this.widgetTable.Share.on(cc.Node.EventType.TOUCH_END, this.ShareClick, this);
        this.widgetTable.backBtn.on(cc.Node.EventType.TOUCH_END, this.backClick, this);
        this.widgetTable.initBtn.on(cc.Node.EventType.TOUCH_END, this.initClick, this);
        this.widgetTable.Add.on(cc.Node.EventType.TOUCH_END, this.AddClick, this);
        // this.widgetTable.shiwan.on(cc.Node.EventType.TOUCH_END, this.shiwanClick, this)
        // this.widgetTable.GetBtn.on(cc.Node.EventType.TOUCH_END, this.getBtnClick, this)
        // this.widgetTable.close.on(cc.Node.EventType.TOUCH_END, this.closeClick, this)
        // this.widgetTable.bktj.on(cc.Node.EventType.TOUCH_END, this.bktjClick, this)
        this.widgetTable.jia.on(cc.Node.EventType.TOUCH_END, this.jiaClick, this) //新
        this.widgetTable.flash.active = false
        // this.widgetTable.tipPanel.active = false
        cc.log("Init>>>>>>>>>>>>1");
        this.showPowerNum() //新
        var open = this.widgetTable.SettingBtn.getChildByName("open")
        var close = this.widgetTable.SettingBtn.getChildByName("close")

        open.active = gm.DataManager.SettingData.sound
        close.active = !gm.DataManager.SettingData.sound

        this.widgetTable.powerLose.active = false
        cc.loader.loadResDir("coat", cc.SpriteFrame, (err, spriteArr) => {
            if (err) {
                console.log(err)
                return
            }
            window.spriteCoat = spriteArr;
            // console.log(window.spriteCoat)
        })
        cc.loader.loadResDir("head", cc.SpriteFrame, (err, spriteArr) => {
            if (err) {
                console.log(err)
                return
            }
            window.spriteHead = spriteArr;
            // console.log(window.spriteHead)
        })
        cc.loader.loadResDir("shoe", cc.SpriteFrame, (err, spriteArr) => {
            if (err) {
                console.log(err)
                return
            }
            window.spriteShoe = spriteArr;
        })
        
        setTimeout(() => {
            this.refishSkinMain()
        }, 100);
        let self = this
        if (window['wx']) {
            wx.getSetting({
                success(res) {
                    if (res.authSetting['scope.userInfo']) {} else {
                        var Info = wx.getSystemInfoSync()
                        var left = Info.windowWidth / 5
                        var top = Info.windowHeight - (Info.windowHeight / 7)
                        lwsdk.hideAuthoriseButton()
                        lwsdk.WxAuthLoginOpacity({
                            width: 70,
                            height: 70,
                            left: left,
                            top: top,
                            backgroundColor: "",
                            success: res => {
                                lwsdk.hideAuthoriseButton()
                                cc.loader.loadRes("ui/RankView", ((err, Pre) => {
                                    var RankPre = cc.instantiate(Pre)
                                    RankPre.parent = self.baseUIView.viewNode
                                }))
                            },
                            fail: err => console.log(222, err)
                        });
                    }
                }
            })
        }

        
    },
    paihang(){
        let openDataContext = wx.getOpenDataContext();
        var sendDataFriend =
            {
                MAIN_MENU_ALL: 'ALL',
                ALL: window['a'].Level
            }
        openDataContext.postMessage({
            messageType:0,
            level: window['a'].Level//JSON.stringify(sendDataFriend)
        })
    },


    BindUI: function BindUI() {
        let self = this;
        // cc.loader.loadResDir("Prefabs/Level", (err, pre) => {
        //     if (err) {
        //         console.error(err);
        //     }
        // });
        //cc.loader.loadRes("Prefabs/Level/Level_" + (gm.DataManager.userData.NowMission + 1), (err, pre) => {});


        cc.loader.loadRes("ui/MissionView", (err, pre) => {});
        console.log("开始游戏主界面")
        lwsdk.setSceneEvent({
            sceneName: "主界面",
            eventName: "页面触发",
            eventId: "laoding完成进入主界面"
        });
        // this.showPanel();  this.widgetTable.jia (新)   this.widgetTable.chengjiuBtn this.widgetTable.tiku  this.widgetTable.powerLabel (新) rankBtn
        this.widgetTable = new Array(),
            this.widgetTable.flash = "flash",
            this.widgetTable.powerLose = "powerLose",
            this.widgetTable.bg = "PowerBG/bg",
            this.widgetTable.rankBtn = "rankBtn",
            this.widgetTable.NikeName = "NikeName",
            this.widgetTable.chengjiuBtn = "chengjiuBtn",
            this.widgetTable.tiku = "questBtn",
            this.widgetTable.jia = "PowerBG/jia",
            this.widgetTable.Share = "Share",
            this.widgetTable.Add = "MoneyBgBtn/Add",
            this.widgetTable.BeginGameBtn = "BeginGameBtn",
            this.widgetTable.FashionBtn = "FashionBtn",
            this.widgetTable.MssionBtn = "MssionBtn",
            this.widgetTable.SettingBtn = "SettingBtn",
            this.widgetTable.MoneyBgBtn = "MoneyBgBtn",
            this.widgetTable.backBtn = "backBtn",
            this.widgetTable.initBtn = "initBtn",
            this.componentTable = new Array(),
            this.componentTable.MissionLabel = ["MissionLabel", "cc.Label"],
            this.componentTable.MoneyBgBtnNum = ["MoneyBgBtn/Num", "cc.Label"],
            this.componentTable.powerLabel = ["PowerBG/powerLabel", "cc.Label"],
            this.componentTable.goldLabel = ["goldBG/goldLabel", "cc.Label"],
            this.componentTable.time = ["PowerBG/time", "cc.Label"];
        window['RoleSelf'] = this.viewNode.getChildByName("Role").getComponent(dragonBones.ArmatureDisplay)

         cc.loader.loadRes("Prefabs/Level/Level_" + gm.DataManager.userData.NowMission, (err, pre) => {
             setTimeout(() => {
                console.log("ccccccccccccccccccccc");
                 self.widgetTable.BeginGameBtn.on(cc.Node.EventType.TOUCH_END, self.beginClick, self)
              }, 100);

          });
    },


    rankBtnClick() {
        let self=this
        if(this.ban==1){
            setTimeout(()=>{
                self.ban=0
            },2000)
            return
        }else{
            
        }
        self.ban=1
        // this.widgetTable.flash.active = true
        // let self = this
        if (window['wx']) {
            lwsdk.setToServer({
                dataKey: "girlData",
                dataType: "girlData",
                data: gm.DataManager.userData,
                expireTime: 3600
            })
        }
        if (window['wx']) {
            lwsdk.getFromServer({
                dataKey: "girlData",
                dataType: "girlData",
                success: (data) => {
                    console.log(data, "")
                },
                fail: () => {}
            });
        }

        lwsdk.setSceneEvent({
            sceneName: "主界面",
            eventName: "点击",
            eventId: "点击【排行榜】按钮"
        });
        // heartbeatSchedule.default.emitEvent()
        if (window['wx']) {
            wx.getSetting({
                success(res) {
                    if (res.authSetting['scope.userInfo']) {
                        console.log("用户已经获取过权限")
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        wx.getUserInfo({
                            success: function (res) {
                                cc.loader.loadRes("ui/RankView", ((err, Pre) => {
                                    self.widgetTable.flash.active = false
                                    var RankPre = cc.instantiate(Pre)
                                    RankPre.parent = self.baseUIView.viewNode
                                }))
                            }
                        })
                    } else {
                        var Info = wx.getSystemInfoSync()
                        var left = Info.windowWidth / 5
                        var top = Info.windowHeight - (Info.windowHeight / 7)
                        // lwsdk.hideAuthoriseButton()
                        lwsdk.WxAuthLoginOpacity({
                            width: 70,
                            height: 70,
                            left: left,
                            top: top,
                            backgroundColor: "",
                            success: res => {
                                lwsdk.hideAuthoriseButton()
                                cc.loader.loadRes("ui/RankView", ((err, Pre) => {
                                    var RankPre = cc.instantiate(Pre)
                                    RankPre.parent = self.baseUIView.viewNode
                                }))
                            },
                            fail: err => console.log(222, err)
                        });
                    }
                }
            })
        } else {
            cc.loader.loadRes("ui/RankView", ((err, Pre) => {
                var RankPre = cc.instantiate(Pre)
                RankPre.parent = self.baseUIView.viewNode
            }))
        }
    },
    ChengjiuClick() { //新
        lwsdk.hideAuthoriseButton()
        let self = this
        this.widgetTable.flash.active = true
        lwsdk.setSceneEvent({
            sceneName: "主界面",
            eventName: "点击",
            eventId: "点击【成就】按钮"
        });
        cc.loader.loadRes("ui/AchieveView", (err, AchPre) => {
            if (err) {
                console.error(err)
                return
            }
            var Achieve = cc.instantiate(AchPre)
            Achieve.parent = this.baseUIView.viewNode
            self.widgetTable.flash.active = false
        })
    },
    jiaClick() { //新
        console.log("1234567890");
        lwsdk.setSceneEvent({
            sceneName: "主界面",
            eventName: "点击",
            eventId: "点击【增加体力】按钮"
        });
        if (window['wx']) {
            gm.DataManager.userData.power += 50
            this.showPowerNum()
        } else {
            gm.DataManager.userData.power += 50
            this.showPowerNum()
        }
        if (window['wx']) {
            lwsdk.setToServer({
                dataKey: "girlData",
                dataType: "girlData",
                data: gm.DataManager.userData,
                expireTime: 3600
            })
        }
        cc.loader.loadRes("ui/PowerGet", (err, pre) => {
            var PowerGetPre = cc.instantiate(pre)
            PowerGetPre.parent = this.baseUIView.viewNode
        })
        lwsdk.hideAuthoriseButton()
    },
    tikuClick() {
        lwsdk.hideAuthoriseButton()
        let self = this
        this.widgetTable.flash.active = true
        lwsdk.setSceneEvent({
            sceneName: "主界面",
            eventName: "点击",
            eventId: "点击【题库】按钮"
        });
        if (this.baseUIView.viewNode.getChildByName("SubjectView")) {
            this.baseUIView.viewNode.getChildByName("SubjectView").active = true
            self.widgetTable.flash.active = false
        } else {
            cc.loader.loadRes("ui/SubjectView", (err, pre) => {
                var SubPre = cc.instantiate(pre)
                SubPre.parent = this.baseUIView.viewNode
                self.widgetTable.flash.active = false
            })
        }
    },
    bktjClick() {
        console.log("点击了互推", cfs.default.ZJXJJ_BKYXTJ)
        if (cfs.default.ZJXJJ_BKYXTJ) {
            cc.loader.loadRes("Prefabs/Panel/otherGames/HotGame", (err, spf) => {
                var juhe = cc.instantiate(spf);
                juhe.zIndex = 1000000;
                juhe.parent = this.baseUIView.viewNode;
                juhe.active = true
                if ((cc.view.getFrameSize().width / cc.view.getFrameSize().height) > 0.5) {
                    //小屏
                    juhe.position = cc.v2(0, 70);
                }
                // console.log(juhe.position)
                // juhe.parent = o.MOD_LuckBagView;
                // console.log(juhe, "Fashion.parent")
            });
        }
    },
    shiwanClick() {
        console.log("点击试玩")
        cc.loader.loadRes("Prefabs/shiwan", (err, spf) => {
            // console.log(err)
            var back = cc.instantiate(spf);
            back.parent = this.baseUIView.viewNode;
            back.position = cc.v2(0, 0);
            back.zIndex = 100000
        })
    },
    beginClick() {
        lwsdk.hideAuthoriseButton()
        window['show'] = false
        this.widgetTable.powerLose.active = true
        this.widgetTable.BeginGameBtn.off(cc.Node.EventType.TOUCH_END, this.beginClick, this),
            setTimeout(() => {
                this.widgetTable.powerLose.active = false
                this.widgetTable.BeginGameBtn.on(cc.Node.EventType.TOUCH_END, this.beginClick, this)
            }, 2500);
        lwsdk.setSceneEvent({
            sceneName: "主界面",
            eventName: "点击",
            eventId: "点击【开始游戏】按钮"
        });
        // adSdk.showBanner("玩法页面", true, true, 10)
        if (gm.DataManager.userData.skinHead && window.skinDragon !== null && window.skinDragon !== undefined && window.skinDragon) {
            this.refishSkin()
        }
        // setTimeout(() => {
        if (gm.DataManager.userData.power > 0) { //新
            gm.DataManager.userData.power--; //新
            // heartbeatSchedule.default.emitEvent()
            this.showPowerNum()
            // console.log('开始游戏BeginGameBtn   ZJXJJ-QLSP  ', cfs.default.ZJXJJ_QLSP)
            // if (gm.DataManager.userData.NowMission > 2) {
            //     if (cfs.default.ZJXJJ_QLSP) {
            //         gameSDK.gameSDK.showVideoAd(() => {}, "ZJXJJ-QLSP")
            //     }
            // } else {
            gm.UIManager.SendNotification(o.MOD_GameView, a.UIInfo_ShowView, null);
            this.PlayCloseAni();
            // }

        } else {
            cc.loader.loadRes("ui/PowerGet", (err, pre) => {
                var PowerGetPre = cc.instantiate(pre)
                PowerGetPre.parent = this.baseUIView.viewNode
            })
        }
        // }, 1000);

        // console.log(gm.DataManager.NowMission, gm.DataManager.MaxMission);
    },
    closeClick() {
        this.widgetTable.tipPanel.active = false
    },
    showPanel() {
        // if (levelViews.show == true) {
        // this.widgetTable.giftPanel.active = true
        // }
    },
    AddClick() {
        console.log("点击Add看视频按钮")
        this.widgetTable.tipPanel.active = true
    },
    getBtnClick() {
        // console.log("看视频获取体力  ，cfs.default.ZJXJJ_SPKG", cfs.default.ZJXJJ_SPKG)
        if (cfs.default.ZJXJJ_SPKG) {
            gameSDK.gameSDK.showVideoAd(() => {
                gm.DataManager.userData.Tip++;
                // heartbeatSchedule.default.emitEvent()
                if (window['wx']) {
                    lwsdk.setToServer({
                        dataKey: "girlData",
                        dataType: "girlData",
                        data: gm.DataManager.userData,
                        expireTime: 3600
                    })
                }
                wxUtils.default.showToast("恭喜你获得了奖励!")
            }, "ZJXJJ-GGJL")
        } else {
            wxUtils.default.showToast("今日暂无分享视频!")
        }
    },
    ShareClick() {
        var self = this
        lwsdk.setSceneEvent({
            sceneName: "主界面",
            eventName: "点击",
            eventId: "点击【分享】按钮"
        });
        console.log("点击分享按钮  cfs.default.ZJXJJ_SHARE", cfs.default.ZJXJJ_SHARE);
        if (window['wx']) {
            lwsdk.shareAppMessage({ //主动拉起分享
                type: 1,
                success: function () {
                    if (gm.DataManager.userData.can_power) {
                        gm.DataManager.userData.can_power = false
                        gm.DataManager.userData.power += 3;
                        if (gm.DataManager.userData.power >= 99) {
                            gm.DataManager.userData.power = 99
                            wxUtils.default.showToast("已达到体力上限")
                        } else {
                            wxUtils.default.showToast("获取3体力")
                        }
                        self.showPowerNum()
                        // heartbeatSchedule.default.emitEvent()
                        lwsdk.setToServer({
                            dataKey: "girlData",
                            dataType: "girlData",
                            data: gm.DataManager.userData,
                            expireTime: 3600
                        })
                    } else {
                        wxUtils.default.showToast("今日分享获取体力已上限")
                    }
                },
                fail: function () {
                    wxUtils.default.showToast("分享失败，请重新分享")
                }
            })
        } else {
            if (gm.DataManager.userData.can_power) { //新
                gm.DataManager.userData.power += 3;
                if (gm.DataManager.userData.power >= 99) {
                    gm.DataManager.userData.power = 99
                    wxUtils.default.showToast("已达到体力上限")
                } else {
                    wxUtils.default.showToast("获取3体力")
                }
                gm.DataManager.userData.can_power = false
                self.showPowerNum()
            }
        }


        if (cfs.default.ZJXJJ_SHARE) {
            lwsdk.shareAppMessage(1);
        }
        //  else {
        //     wxUtils.default.showToast("今日暂无分享!");
        // }
    },
    fashionClick() {
        lwsdk.hideAuthoriseButton()
        let self = this
        this.widgetTable.flash.active = true
        // adSdk.hideBanner()
        lwsdk.setSceneEvent({
            sceneName: "主界面",
            eventName: "点击",
            eventId: "点击【商店】按钮"
        });
        console.log('时尚FashionBtn');
        cc.loader.loadRes('Prefabs/SkinView', (err, spf) => {
            if (gm.DataManager.SettingData.sound) {
                cc.loader.loadRes("audio/" + "audio_bgm", cc.AudioClip, function (c, f) {
                    cc.audioEngine.playMusic(f, true);
                });
            }
            var Fashion = cc.instantiate(spf);
            Fashion.parent = cc.director.getScene();
            self.widgetTable.flash.active = false
            // console.log(Fashion.parent,"Fashion.parent")
            Fashion.position = cc.v2(360, 667);
        });
        // var fashion = cc.loader.loadRes('prefab/ui/SkinView');
        // fashion.parent = this.Node;
        // gm.UIManager.SendNotification(o.MOD_FashionView, a.UIInfo_ShowView, null), this.PlayCloseAni();
        // gm.UIManager.SendNotification(o.MOD_FashionView, a.UIInfo_ShowView, null);
    },
    mssionClick() {
        lwsdk.hideAuthoriseButton()
        lwsdk.setSceneEvent({
            sceneName: "主界面",
            eventName: "点击",
            eventId: "点击【关卡】按钮"
        });
        console.log('点击了MssionBtn');
        // adSdk.showBanner("关卡", true, true, 10)
        // var youlikeRec =  cc.instantiate(this.widgetTable.youlike);
        // youlikeRec.parent = cc.direction.getScene();
        gm.UIManager.SendNotification(o.MOD_MissionView, a.UIInfo_ShowView, null),
            this.PlayCloseAni();
    },
    settingClick() {
        console.log('点击了SettingBtn')
        var open = this.widgetTable.SettingBtn.getChildByName("open")
        var close = this.widgetTable.SettingBtn.getChildByName("close")
        open.active = !gm.DataManager.SettingData.sound
        close.active = gm.DataManager.SettingData.sound
        gm.DataManager.SettingData.sound = !gm.DataManager.SettingData.sound
        gm.DataBase.SaveSettingData()
        // if (open.active) {
        //     open.active = false
        //     close.active = true
        //     console.log(gm.DataManager.SettingData.sound)
        //     gm.DataManager.SettingData.sound = !gm.DataManager.SettingData.sound
        //     console.log(gm.DataManager.SettingData.sound)


        // }else{
        //     open.active = true
        //     close.active = false
        //     console.log(gm.DataManager.SettingData.sound)
        //     gm.DataManager.SettingData.sound = !gm.DataManager.SettingData.sound
        //     console.log(gm.DataManager.SettingData.sound)
        //     gm.DataBase.SaveSettingData()
        // }
        // gm.UIManager.SendNotification(o.MOD_SettingView, a.UIInfo_ShowView, null);
    },
    backClick() {
        // console.log("我点击了假退出   开始界面", cfs.default.ZJXJJ_FXCXLBY);
        // adSdk.hideBanner()
        if (cfs.default.ZJXJJ_FXCXLBY) {
            cc.loader.loadRes("Prefabs/Panel/otherGames/falseDialogGame", (err, spf) => {
                var back = cc.instantiate(spf);
                back.parent = this.baseUIView.viewNode;
                back.position = cc.v2(375, 667);
                back.zIndex = 100000
            })

        }

    },
    initClick() {

    },
    PlayCloseAni: function PlayCloseAni() {
        let self = this;
        // gm.UIManager.SendNotification(o.MOD_MissionView, a.UIInfo_ShowView, null),
        // console.log("kaishyouxianniu")
        // console.log(this.widgetTable.Share.position, " ===================", this.widgetTable.SettingBtn.position)
        this.componentTable.NodeAni.play("mainEndAnim");
        this.componentTable.NodeAni.once("finished", function () {
            gm.UIManager.SendNotification(o.MOD_BeginView, a.UIInfo_CloseView, null);
            self.widgetTable.MoneyBgBtn.active = !1;
        }, this);

    },
    OnUpdate: function OnUpdate(e) {

        let self = this
        null != this.componentTable && (this.componentTable.MoneyBgBtnNum.string = gm.DataManager.userData.Tip);
        if (gm.DataManager.userData.power < 5) {
            if (this.componentTable) {
                if (this.widgetTable.bg) {
                    this.widgetTable.bg.active = true
                }
            }
            this.times++
            if (this.times >= 60) {
                this.times = 0
                var s = gm.DataManager.userData.powerNum--
                var minute = Math.floor(s / 60)
                var second = s % 60
                if (second < 10) {
                    second = "0" + second
                    if (this.componentTable.powerLabel) {
                        self.showPowerNum()
                    }
                }
                this.componentTable.time.string = minute + ":" + second
                if (s < 1) {
                    gm.DataManager.userData.power++
                    gm.DataManager.userData.powerNum = 300
                    if (window['wx']) {
                        lwsdk.setToServer({
                            dataKey: "girlData",
                            dataType: "girlData",
                            data: gm.DataManager.userData,
                            expireTime: 3600
                        })
                    }
                    self.showPowerNum()
                }
            }
        } else {
            if (this.componentTable && this.widgetTable) {
                if (this.componentTable.time) {
                    this.componentTable.time.string = ''

                }
                if (this.widgetTable.bg) {
                    this.widgetTable.bg.active = false
                }
            }
        }
    },
    ShowView: function ShowView() { //\u5173\u5361 删掉  新

        if(window["wx"]){
            this.paihang()
        }
        this.widgetTable.MoneyBgBtn.active = !0, this.componentTable.MissionLabel.string = "" + gm.DataManager.userData.SetMission;
        // console.log(this.widgetTable.NikeName)
        // this.widgetTable.NikeName.getComponent(cc.SpriteFrame).SpriteFrame
        for (let i = 0; i < this.widgetTable.NikeName.childrenCount; i++) { //新
            if (gm.DataManager.userData.MaxMission > 0 && gm.DataManager.userData.MaxMission < 10) {
                if (i == 0) {
                    this.widgetTable.NikeName.children[0].active = true
                } else {
                    this.widgetTable.NikeName.children[i].active = false
                }
            } else if (gm.DataManager.userData.MaxMission >= 10 && gm.DataManager.userData.MaxMission < 20) {
                if (i == 1) {
                    this.widgetTable.NikeName.children[1].active = true
                } else {
                    this.widgetTable.NikeName.children[i].active = false
                }
            } else if (gm.DataManager.userData.MaxMission >= 20 && gm.DataManager.userData.MaxMission < 30) {
                if (i == 2) {
                    this.widgetTable.NikeName.children[2].active = true
                } else {
                    this.widgetTable.NikeName.children[i].active = false
                }
            } else if (gm.DataManager.userData.MaxMission >= 30 && gm.DataManager.userData.MaxMission < 40) {
                if (i == 3) {
                    this.widgetTable.NikeName.children[3].active = true
                } else {
                    this.widgetTable.NikeName.children[i].active = false
                }
            } else {
                if (i == 4) {
                    this.widgetTable.NikeName.children[4].active = true
                } else {
                    this.widgetTable.NikeName.children[i].active = false
                }
            }

        }
    },
    showPowerNum() { //新
        this.componentTable.powerLabel.string = gm.DataManager.userData.power + ""
        this.componentTable.goldLabel.string = gm.DataManager.userData.gold + ""
    },
    CloseView: function CloseView() {},
    HandleNotification: function HandleNotification(e) {
        // cc.log("notification" + e.name + ":" + e.body),
        e.name;
    },
    RegisterNotification: function RegisterNotification() {
        this.baseUIView.PushNotification(a.UIInfo_RefreshView);
    },
    Dispose: function Dispose() {},
    refishSkin() {
        // console.log(window.skinDragon)
        var t = this
        for (var i = 0; i < 8; i++) {
            if (gm.DataManager.userData.skinHead[i].isChoose == 0) {
                var z = i
                if (z == 0) {
                    z = 0
                } else if (z == 1) {
                    z = 7
                } else if (z == 2) {
                    z = 6
                } else if (z == 3) {
                    z = 9
                } else if (z == 4) {
                    z = 11
                } else if (z == 5) {
                    z = 8
                } else if (z == 6) {
                    z = 10
                } else if (z == 7) {
                    z = 5
                }
                this.ChangeSkin(window.skinDragon._armature, 'head', z)
                if (z == 0) {
                    this.ChangeSkin(window.skinDragon._armature, 'hair', 0)
                } else {
                    this.ChangeSkin(window.skinDragon._armature, 'hair', 1)
                }

            }
            if (gm.DataManager.userData.skinCoat[i].isChoose == 0) {
                var x = i
                if (x == 0) {
                    x = 0
                } else if (x == 1) {
                    x = 7
                } else if (x == 2) {
                    x = 3
                } else if (x == 3) {
                    x = 6
                } else if (x == 4) {
                    x = 2
                } else if (x == 5) {
                    x = 1
                } else if (x == 6) {
                    x = 5
                } else if (x == 7) {
                    x = 4
                }
                var s = i
                if (s == 2) {
                    s = 4
                } else if (s == 6) {
                    s = 1
                } else if (s == 3) {
                    s = 3
                } else if (s == 7) {
                    s = 2
                } else {
                    s = 0
                }
                this.ChangeSkin(window.skinDragon._armature, 'body', x)
                this.ChangeSkin(window.skinDragon._armature, 'skirt', x)
                this.ChangeSkin(window.skinDragon._armature, 'arm', x)
                this.ChangeSkin(window.skinDragon._armature, 'arm1', x)
                this.ChangeSkin(window.skinDragon._armature, 'forearm', s)
                this.ChangeSkin(window.skinDragon._armature, 'forearm1', s)
            }
            if (gm.DataManager.userData.skinShoe[i].isChoose == 0) {
                var p = i
                if (p == 0) {
                    p = 0
                } else if (p == 1) {
                    p = 4
                } else if (p == 2) {
                    p = 3
                } else if (p == 3) {
                    p = 7
                } else if (p == 4) {
                    p = 5
                } else if (p == 5) {
                    p = 1
                } else if (p == 6) {
                    p = 6
                } else if (p == 7) {
                    p = 2
                }

                var o = i
                if (o == 6) {
                    o = 2
                } else if (o == 1) {
                    o = 4
                } else if (o == 0) {
                    o = 1
                } else if (o == 3) {
                    o = 3
                } else {
                    o = 1
                }
                this.ChangeSkin(window.skinDragon._armature, 'foot1', p)
                this.ChangeSkin(window.skinDragon._armature, 'foot', p)
                this.ChangeSkin(window.skinDragon._armature, 'shank', o)
                this.ChangeSkin(window.skinDragon._armature, 'shank1', o)
            }
        }
    },
    ChangeSkin(_armature, name, e) {
        if (CC_JSB) {
            _armature.getSlot(name).setDisplayIndex(e)
        } else {
            // console.log(this.ri.armature().getSlot(name))._displayDatas[0].texture
            _armature.getSlot(name)._textureData = _armature.getSlot(name)._displayDatas[e].texture
            _armature.getSlot(name)._updateFrame()
        }
    },
    refishSkinMain() {
        // console.log(window.skinDragon)
        var t = this
        for (var i = 0; i < 8; i++) {
            if (gm.DataManager.userData.skinHead[i].isChoose == 0) {
                var z = i
                if (z == 0) {
                    z = 0
                } else if (z == 1) {
                    z = 7
                } else if (z == 2) {
                    z = 6
                } else if (z == 3) {
                    z = 9
                } else if (z == 4) {
                    z = 11
                } else if (z == 5) {
                    z = 8
                } else if (z == 6) {
                    z = 10
                } else if (z == 7) {
                    z = 5
                }
                this.ChangeSkin(window['RoleSelf']._armature, 'head', z)
                if (z == 0) {
                    this.ChangeSkin(window['RoleSelf']._armature, 'hair', 0)
                } else {
                    this.ChangeSkin(window['RoleSelf']._armature, 'hair', 1)
                }

            }
            if (gm.DataManager.userData.skinCoat[i].isChoose == 0) {
                var x = i
                if (x == 0) {
                    x = 0
                } else if (x == 1) {
                    x = 7
                } else if (x == 2) {
                    x = 3
                } else if (x == 3) {
                    x = 6
                } else if (x == 4) {
                    x = 2
                } else if (x == 5) {
                    x = 1
                } else if (x == 6) {
                    x = 5
                } else if (x == 7) {
                    x = 4
                }
                var s = i
                if (s == 2) {
                    s = 4
                } else if (s == 6) {
                    s = 1
                } else if (s == 3) {
                    s = 3
                } else if (s == 7) {
                    s = 2
                } else {
                    s = 0
                }
                this.ChangeSkin(window['RoleSelf']._armature, 'body', x)
                this.ChangeSkin(window['RoleSelf']._armature, 'skirt', x)
                this.ChangeSkin(window['RoleSelf']._armature, 'arm', x)
                this.ChangeSkin(window['RoleSelf']._armature, 'arm1', x)
                this.ChangeSkin(window['RoleSelf']._armature, 'forearm', s)
                this.ChangeSkin(window['RoleSelf']._armature, 'forearm1', s)
            }
            if (gm.DataManager.userData.skinShoe[i].isChoose == 0) {
                var p = i
                if (p == 0) {
                    p = 0
                } else if (p == 1) {
                    p = 4
                } else if (p == 2) {
                    p = 3
                } else if (p == 3) {
                    p = 7
                } else if (p == 4) {
                    p = 5
                } else if (p == 5) {
                    p = 1
                } else if (p == 6) {
                    p = 6
                } else if (p == 7) {
                    p = 2
                }

                var o = i
                if (o == 6) {
                    o = 2
                } else if (o == 1) {
                    o = 4
                } else if (o == 0) {
                    o = 1
                } else if (o == 3) {
                    o = 3
                } else {
                    o = 1
                }
                this.ChangeSkin(window['RoleSelf']._armature, 'foot1', p)
                this.ChangeSkin(window['RoleSelf']._armature, 'foot', p)
                this.ChangeSkin(window['RoleSelf']._armature, 'shank', o)
                this.ChangeSkin(window['RoleSelf']._armature, 'shank1', o)
            }
        }
    },
})
window.Refish = function () {
    // console.log("123456")
    BeginView.showPowerNum()
}
module.exports = BeginView
/*BeginView: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "0d104pn2z9MAYxb/Z3zabMv", "BeginView");
        var n = s(e("util")),
            a = s(e("UIInfo")),
            o = s(e("ConstModName"));
        s(e("GameConfig")), s(e("GameDefine"));

        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            properties: {
                baseUIView: null,
                viewNode: null,
                widgetTable: null,
                componentTable: null,
                DataModule: null
            },
            Init: function Init(e) {
                this.baseUIView = e, this.viewNode = this.baseUIView.viewNode, this.BindUI(), n.default.ParseWidgetByTable(this.viewNode, this.widgetTable), n.default.ParseComponentByTable(this.viewNode, this.componentTable), this.componentTable.NodeAni = this.viewNode.getComponent(cc.Animation), this.AddEvent(), cc.log("Init>>>>>>>>>>>>");
            },
            BindUI: function BindUI() {
                this.widgetTable = new Array(), this.widgetTable.BeginGameBtn = "BeginGameBtn", this.widgetTable.FashionBtn = "FashionBtn", this.widgetTable.MssionBtn = "MssionBtn", this.widgetTable.SettingBtn = "SettingBtn", this.widgetTable.MoneyBgBtn = "MoneyBgBtn", this.componentTable = new Array(), this.componentTable.MissionLabel = ["MissionLabel", "cc.Label"], this.componentTable.MoneyBgBtnNum = ["MoneyBgBtn/Num", "cc.Label"];
            },
            HandleEvent: function HandleEvent(e) {
                switch (e.currentTarget.name) {
                    case "BeginGameBtn":
                        gm.UIManager.SendNotification(o.default.MOD_GameView, a.default.UIInfo_ShowView, null), this.PlayCloseAni();
                        break;
                    case "FashionBtn":
                        gm.UIManager.SendNotification(o.default.MOD_FashionView, a.default.UIInfo_ShowView, null), this.PlayCloseAni();
                        break;
                    case "MssionBtn":
                        gm.UIManager.SendNotification(o.default.MOD_MissionView, a.default.UIInfo_ShowView, null), this.PlayCloseAni();
                        break;
                    case "SettingBtn":
                        gm.UIManager.SendNotification(o.default.MOD_SettingView, a.default.UIInfo_ShowView, null);
                }
            },
            PlayCloseAni: function PlayCloseAni() {
                this.widgetTable.MoneyBgBtn.active = !1, this.componentTable.NodeAni.play("mainEndAnim"), this.componentTable.NodeAni.once("finished", function () {
                    gm.UIManager.SendNotification(o.default.MOD_BeginView, a.default.UIInfo_CloseView, null);
                }, this);
            },
            AddEvent: function AddEvent() {
                for (var e in this.widgetTable) {
                    if (this.widgetTable.hasOwnProperty(e)) {
                        var t = this.widgetTable[e]; - 1 != t.name.indexOf("Btn") && t.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
                    }
                }
            },
            OnUpdate: function OnUpdate(e) {
                null != this.componentTable && (this.componentTable.MoneyBgBtnNum.string = gm.DataManager.userData.Tip);
            },
            ShowView: function ShowView() {
                this.widgetTable.MoneyBgBtn.active = !0, this.componentTable.MissionLabel.string = "\u5173\u5361" + gm.DataManager.userData.NowMission;
            },
            CloseView: function CloseView() {},
            HandleNotification: function HandleNotification(e) {
                cc.log("notification" + e.name + ":" + e.body), e.name;
            },
            RegisterNotification: function RegisterNotification() {
                cc.log("RegisterNotification>>>>>>>>>>>>"), this.baseUIView.PushNotification(a.default.UIInfo_RefreshView);
            },
            Dispose: function Dispose() {}
        }), 
*/