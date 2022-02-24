var n = require("GameConfig"),
    a = require("GameDefine"),
    o = require("ConstModName"),
    s = require("UIInfo"),
    r = require("AdType");
var loadhutui = require('loadhutui');
var lwsdk = require("lwsdk")
var wxUtils = require("wxUtils");

var SubPackgeNameStr=["anim","audio","dragon","effects","texture","girl","Prefabs","textures","audios"]
var SdkManager = require("SdkManager");
var gameApp = cc.Class({
    extends: require("Game"),
    properties: {
        GameLoading: {
            type: cc.Node,
            default: null
        },
        prossess: {
            type: cc.Node,
            default: null
        },
        background: {
            type: cc.Node,
            default: null
        },

    },
    run: function run() {
        console.log("开始")
        lwsdk.setSceneEvent({
            sceneName: "loading界面",
            eventName: "页面触发",
            eventId: "开始加载"
        });

        let self=this
        SdkManager.default.initSDK(() => {
            console.log("Sdk初始化完成啦")
        })
        if (window['wx']) {
            this.LoadSubPac("girl");
        }
        
        // console.log(heartbeatSchedule, "=======")
        else {
            // gameUserInitData.init(function () {
            a.GameLoadModel = a.LoadModel.Local, cc.game.addPersistRootNode(this.node), this.updateList = [], this.updateLength = 0;
            window.gm = {};
            var t = window.gm = window.gm || {};
            t.AdManager = require("ADManager"),
                this.CheckWXCanvas(),
                t.canvas = cc.find("Canvas"),
                t.GameApp = this,
                t.GlobalMessage = require("GlobalMessage"),
                t.DataManager = require("DataManager"),
                t.CacheManager = new(require("CacheManager"))(),
                t.EffectManager = new(require("EffectManager"))(),
                t.DataBase = new(require("DataBase"))(),
                t.GameData = new(require("GameData"))(),
                t.UIManager = new(require("UIManager"))(),
                t.StorageManager = require("StorageManager"),
                t.HttpRequest = require("HttpRequest"),
                t.Base64 = require("Base"),
                t.BattlePlayManager = new(require("BattlePlayManager"))(),
                t.AssetManager = new(require("AssetManager"))(),
                t.SceneManager = new(require("SceneManager"))(),
                t.EffectManager = new(require("EffectManager"))(),
                t.AudioPlayManager = new(require("AudioPlayManager"))(),
                t.UIManager.Init(this),
                t.SceneManager.Init(this),
                t.DataBase.Init(),
                t.AdManager.init(),
                t.GameData.Init(),
                t.CacheManager.Init(this),
                this.addUpdate(t.UIManager),
                this.addUpdate(t.SceneManager),
                t.AssetManager.Init(this),
                t.EffectManager.Init(this)
                
                t.CacheManager.CacheResource(a.CacheType.UI, this.GameLoading)
                t.SceneManager.GotoScene("MainView", this.LoadComplete.bind(this))

                setTimeout(() => {
                    if(self.background){
                        self.background.active=false
                    }
                    
                }, 3000)
                
                //this.LoadComplete()
                this.addUpdate(t.EffectManager), this.addUpdate(t.BattlePlayManager),
                this.addUpdate(t.AdManager);
            lwsdk.onShareAppMessage({
                type: 0
            }) //默认右上角分享    
            // }.bind(this))
            // heartbeatSchedule.default.emitEvent()
        
        }

    },
    LoadSubPac(SubPackge) {
       // let self = this;
        //cc.find("Canvas/GameLoading/Progress").getComponent(CC.Sprite).progress.fillRange=0
        // SdkManager.default.loadsub(() => {
        //     // self.LoadSubPac2("LevelUI")
        // })



        let self = this;
        for(let  i=0;i<SubPackgeNameStr.length;i++){
            wx.loadSubpackage({
                name: SubPackgeNameStr[i], // name 可以填 name 或者 root
                success: function (res) {
                    console.log("加载分包成功", res)
                    console.log(i,SubPackgeNameStr.length-1)
                    self.prossess.getComponent(cc.Sprite).fillRange+=0.1
                    if(i==SubPackgeNameStr.length-1){
                        // fun&&fun()
                        self.LoadSubPac2("LevelUI")
                    }
                    // 分包加载成功后通过 success 回调
                },
                fail: function (res) {
                    console.log("加载分包失败", res)
                    // 分包加载失败通过 fail 回调
                }
            })
        }
        
        // 
        // const loadTask = wx.loadSubpackage({
        //     name: SubPackgeNameStr, // name 可以填 name 或者 root
        //     success: function (res) {
        //         console.log("加载分包成功", res)
        //         self.LoadSubPac2("LevelUI")
        //         // 分包加载成功后通过 success 回调
        //     },
        //     fail: function (res) {
        //         console.log("加载分包失败", res)
        //         // 分包加载失败通过 fail 回调
        //     }
        // })
    },
    LoadSubPac2(SubPackgeNameStr) {
        let self = this;
        // const loadTask2 = 
        wx.loadSubpackage({
            name: SubPackgeNameStr, // name 可以填 name 或者 root
            success: function (res) {
                console.log("加载分包成功", res)
                // 分包加载成功后通过 success 回调
                // cc.loader.loadResDir("Prefabs/Level", (err, pre) => {
                //     if (err) {
                //         console.error(err);
                //     }
                // });
                // cc.loader.loadRes("ui/MissionView", (err, pre) => {});
                cc.loader.loadRes("ui/GameView", (err, pre) => {
                    console.log("===========================开始");
                    //  cc.loader.loadRes('Prefabs/Level/Level_33', (err, spf) => {
                    if (window['wx']) {
                        const loadTask2=lwsdk.init({
                            debug: true,
                            game: 'qbswz-weixin',
                            version: '1.0.0',
                            dev_platform: 'weixin',
                            canShare: true,
                            success: () => {
                                console.log("进入成功")
                                lwsdk.getFromServer({
                                    dataKey: "girlData",
                                    dataType: "girlData",
                                    success: (data) => {
                                        lwsdk.getFromServer({
                                            dataKey: "girlSet",
                                            dataType: "girlDataSet",
                                            success: () => {},
                                            fail: () => {

                                            }
                                        });

                                        a.GameLoadModel = a.LoadModel.Local,
                                            cc.game.addPersistRootNode(self.node),
                                            self.updateList = [],
                                            self.updateLength = 0;
                                        window.gm = {};
                                        var t = window.gm = window.gm || {};
                                        t.AdManager = require("ADManager"),
                                            self.CheckWXCanvas(),
                                            t.canvas = cc.find("Canvas"),
                                            t.GameApp = self,
                                            t.GlobalMessage = require("GlobalMessage"),
                                            t.DataManager = require("DataManager"),
                                            t.CacheManager = new(require("CacheManager"))(),
                                            t.EffectManager = new(require("EffectManager"))(),
                                            t.DataBase = new(require("DataBase"))(),
                                            t.GameData = new(require("GameData"))(),
                                            t.UIManager = new(require("UIManager"))(),
                                            t.StorageManager = require("StorageManager"),
                                            t.HttpRequest = require("HttpRequest"),
                                            t.Base64 = require("Base"),
                                            t.BattlePlayManager = new(require("BattlePlayManager"))(),
                                            t.AssetManager = new(require("AssetManager"))(),
                                            t.SceneManager = new(require("SceneManager"))(),
                                            t.EffectManager = new(require("EffectManager"))(),
                                            t.DataBase.Init(data),
                                            t.AudioPlayManager = new(require("AudioPlayManager"))(),
                                            t.UIManager.Init(self),
                                            t.SceneManager.Init(self),
                                            t.AdManager.init(),
                                            t.GameData.Init(),
                                            t.CacheManager.Init(self),
                                            self.addUpdate(t.UIManager),
                                            self.addUpdate(t.SceneManager),
                                            t.AssetManager.Init(self),
                                            t.EffectManager.Init(self),
                                            t.CacheManager.CacheResource(a.CacheType.UI, self.GameLoading),
                                            t.SceneManager.GotoScene("MainView", self.LoadComplete.bind(self)),
                                            self.addUpdate(t.EffectManager),
                                            self.addUpdate(t.BattlePlayManager),
                                            self.addUpdate(t.AdManager);
                                            setTimeout(() => {
                                                // if(cc.find("Canvas/BeginView")){
                                                    if(self.background){

                                                        self.background.active=false
                                                    }
                                                // }else{
                                                //     setTimeout(() => {
                                                //         if(self.background){

                                                //             self.background.active=false
                                                //         }
                                                //     },2000)
                                                // }
                            
                                            }, 1000)
                                            
                                        lwsdk.onShareAppMessage({
                                            type: 0
                                        })
                                    },
                                    fail: () => {
                                        setTimeout(() => {
                                            run();
                                            wxUtils.default.showToast("网络错误，重连中----")
                                        }, 3000)
                                    }
                                });
                            },
                            fail: (err) => {
                                console.log("进入失败",err)
                                // //  setTimeout(() => {
                                    a.GameLoadModel = a.LoadModel.Local, cc.game.addPersistRootNode(self.node), self.updateList = [], self.updateLength = 0;
                                    window.gm = {};
                                    var t = window.gm = window.gm || {};
                                    t.AdManager = require("ADManager"),
                                        self.CheckWXCanvas(),
                                        t.canvas = cc.find("Canvas"),
                                        t.GameApp = self,
                                        t.GlobalMessage = require("GlobalMessage"),
                                        t.DataManager = require("DataManager"),
                                        t.CacheManager = new(require("CacheManager"))(),
                                        t.EffectManager = new(require("EffectManager"))(),
                                        t.DataBase = new(require("DataBase"))(),
                                        t.GameData = new(require("GameData"))(),
                                        t.UIManager = new(require("UIManager"))(),
                                        t.StorageManager = require("StorageManager"),
                                        t.HttpRequest = require("HttpRequest"),
                                        t.Base64 = require("Base"),
                                        t.BattlePlayManager = new(require("BattlePlayManager"))(),
                                        t.AssetManager = new(require("AssetManager"))(),
                                        t.SceneManager = new(require("SceneManager"))(),
                                        t.EffectManager = new(require("EffectManager"))(),
                                        t.AudioPlayManager = new(require("AudioPlayManager"))(),
                                        t.UIManager.Init(self),
                                        t.SceneManager.Init(self),
                                        t.DataBase.Init(),
                                        t.AdManager.init(),
                                        t.GameData.Init(),
                                        t.CacheManager.Init(self),
                                        self.addUpdate(t.UIManager),
                                        self.addUpdate(t.SceneManager),
                                        t.AssetManager.Init(self),
                                        t.EffectManager.Init(self),
                                        t.CacheManager.CacheResource(a.CacheType.UI, self.GameLoading),
                                         t.SceneManager.GotoScene("MainView", self.LoadComplete.bind(self)),
                                        // self.LoadComplete()
                                        self.addUpdate(t.EffectManager), self.addUpdate(t.BattlePlayManager),
                                        self.addUpdate(t.AdManager);


                                        setTimeout(() => {
                                            if(self.background){
                                                self.background.active=false
                                            }
                        
                                        }, 1000)
                                    lwsdk.onShareAppMessage({
                                        type: 0
                                    }) //默认右上角分享 
                                //     setTimeout(() => { 
                                //     wxUtils.default.showToast("网络错误，重连中")
                                // }, 100)
                            }
                        })

                    }
                    //  });
                })

            },
            fail: function (res) {
                console.log("加载分包失败", res)
                // 分包加载失败通过 fail 回调
            }
        })
    },
    loadUI() {


    },
    LoadComplete: function LoadComplete() {

        if (gm.DataManager.SettingData.sound) {
            cc.loader.loadRes("audio/" + "audio_bgm", cc.AudioClip, function (c, f) {
                cc.audioEngine.playMusic(f, true);
            });
        }
        // cc.loader.loadRes("Prefabs/Level/Level_" + gm.DataManager.userData.NowMission, function (i, o) {
        // })
        // gm.AudioPlayManager.StopAudio(a.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(a.AudioChannelType.Channel_Background, "audios/audio_bgm", -1);
        gm.UIManager.SendNotification(o.MOD_BeginView, s.UIInfo_ShowView, null);
    },
    enterGame: function enterGame() {
        gm.UIManager.replaceUI("module/login/login", {
            data: "",
            callback: function callback() {
                cc.log("\u754C\u9762\u66FF\u6362\u5B8C\u6210\u52A0\u8F7D\u5B8C\u6210");
            }
        }, !0);
    },
    buttonClick: function buttonClick() {
        game.scene.replaceScene("testScene", {
            name: "ccs"
        });
    },
    SendInfoToWXOpenContext: function SendInfoToWXOpenContext(e, t) {
        null != gm.wx && wx.getOpenDataContext().postMessage({
            type: e,
            data: t
        });
    },
    CheckWXCanvas: function CheckWXCanvas() {
        return
        gm.AdManager.AdsType == r.WeChat && (gm.WXInterface = require("WXInterface"), gm.wx = "undefined" != typeof wx ? wx : null, gm.WXInterface.showShareMenu({
            withShareTicket: !0,
            success: function success(e) {
                cc.log("showShareMenu success:" + e);
            },
            fail: function fail(e) {
                cc.log("showShareMenu fail:" + e);
            },
            complete: function complete(e) {
                cc.log("showShareMenu complete:" + e);
            }
        }), gm.WXInterface.onShareAppMessage({
            query: "type=2"
        }), gm.WXInterface.onHide(function () {}), gm.WXInterface.onShow(function (e) {
            "1001" == e.scene || e.scene;
        })), gm.AdManager.AdsType == r.QQ && (gm.QQInterface = require("QQInterface"), gm.qq = "undefined" != typeof qq ? qq : null, gm.QQInterface.showShareMenu({
            withShareTicket: !0,
            success: function success(e) {
                cc.log("showShareMenu success:" + e);
            },
            fail: function fail(e) {
                cc.log("showShareMenu fail:" + e);
            },
            complete: function complete(e) {
                cc.log("showShareMenu complete:" + e);
            }
        }), gm.QQInterface.onShareAppMessage({
            query: "type=2"
        }), gm.QQInterface.onHide(function () {
            console.log("onHideonHideonHide"), null != gm.DataManager && (gm.DataManager.userData.LastInviteTime = Math.floor(new Date().getTime() / 1e3));
        }), gm.QQInterface.onShow(function (e) {
            if (console.log(e), null != gm.DataManager) {
                var t = Math.floor(new Date().getTime() / 1e3) - gm.DataManager.userData.LastInviteTime;
                gm.UIManager.SendNotification(s.UIInfo_FreeInvite, t);
            }
        })), gm.AdManager.AdsType == r.TT && (gm.TTInterface = require("TTInterface"), gm.tt = "undefined" != typeof tt ? tt : null), gm.AdManager.AdsType == r.Baidu && (gm.BaiduInterface = require("BaiduInterface"), gm.swan = "undefined" != typeof swan ? swan : null);
        var t = cc.Canvas.instance,
            i = (t.designResolution.height, t.designResolution.width, cc.view.getVisibleSize());
        n.ScreenWidth = i.width, n.ScreenHeight = i.height;
    },
    update: function update(e) {
        if (this.updateList && this.updateList.length > 0)
            for (var t = this.updateList.length, i = 0; i < t; i++) {
                var n = this.updateList[i].OnUpdate;
                n && n.call(this.updateList[i], e);
            }
        null == this._GameTimer && (this._GameTimer = 0, this._CheckTime = 0), this._GameTimer += e, this._GameTimer > 5 && (this._CheckTime++, /** gm.AdManager.dataRecode("GameTime ", 1e9 + 5 * this._CheckTime), */ this._GameTimer = 0);
    },
    addUpdate: function addUpdate(e) {
        e && this.updateList.push(e);
    },
    removeUpdate: function removeUpdate(e) {
        var t = this.updateList.indexOf(e);
        t >= 0 && this.updateList.splice(t, 1);
    },
    Dispose: function Dispose() {
        this.layer.Dispose();
    }
})
window['gameApp'] = gameApp

/*GameApp: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "5b141UP8dhHzL0+5Slbflmu", "GameApp");
        var n = c(e("GameConfig")),
            a = c(e("GameDefine")),
            o = c(e("ConstModName")),
            s = c(e("UIInfo")),
            r = c(e("AdType"));

        function c(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: e("Game"),
            properties: {
                GameLoading: {
                    type: cc.Node,
                    default: null
                }
            },
            run: function run() {
                a.default.GameLoadModel = a.default.LoadModel.Local, cc.game.addPersistRootNode(this.node), this.updateList = [], this.updateLength = 0;
                var t = window.gm = window.gm || {};
                t.AdManager = e("ADManager"), this.CheckWXCanvas(), t.canvas = cc.find("Canvas"), t.GameApp = this, t.GlobalMessage = e("GlobalMessage"), t.DataManager = e("DataManager"), t.CacheManager = new(e("CacheManager"))(), t.EffectManager = new(e("EffectManager"))(), t.DataBase = new(e("DataBase"))(), t.GameData = new(e("GameData"))(), t.UIManager = new(e("UIManager"))(), t.StorageManager = e("StorageManager"), t.HttpRequest = e("HttpRequest"), t.Base64 = e("Base"), t.BattlePlayManager = new(e("BattlePlayManager"))(), t.AssetManager = new(e("AssetManager"))(), t.SceneManager = new(e("SceneManager"))(), t.EffectManager = new(e("EffectManager"))(), t.AudioPlayManager = new(e("AudioPlayManager"))(), t.DataBase.Init(), t.AdManager.init(), t.GameData.Init(), t.CacheManager.Init(this), t.AudioPlayManager.Init(this), t.AssetManager.Init(this), t.UIManager.Init(this), t.SceneManager.Init(this), t.EffectManager.Init(this), this.addUpdate(t.UIManager), this.addUpdate(t.SceneManager), this.addUpdate(t.EffectManager), this.addUpdate(t.BattlePlayManager), this.addUpdate(t.AdManager), t.CacheManager.CacheResource(a.default.CacheType.UI, this.GameLoading), t.SceneManager.GotoScene("MainView", this.LoadComplete.bind(this));
            },
            LoadComplete: function LoadComplete() {
                gm.AudioPlayManager.StopAudio(a.default.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(a.default.AudioChannelType.Channel_Background, "audios/audio_bgm", -1), gm.UIManager.SendNotification(o.default.MOD_BeginView, s.default.UIInfo_ShowView, null);
            },
            enterGame: function enterGame() {
                gm.UIManager.replaceUI("module/login/login", {
                    data: "",
                    callback: function callback() {
                        cc.log("\u754C\u9762\u66FF\u6362\u5B8C\u6210\u52A0\u8F7D\u5B8C\u6210");
                    }
                }, !0);
            },
            buttonClick: function buttonClick() {
                game.scene.replaceScene("testScene", {
                    name: "ccs"
                });
            },
            SendInfoToWXOpenContext: function SendInfoToWXOpenContext(e, t) {
                null != gm.wx && wx.getOpenDataContext().postMessage({
                    type: e,
                    data: t
                });
            },
            CheckWXCanvas: function CheckWXCanvas() {
                gm.AdManager.AdsType == r.default.WeChat && (gm.WXInterface = e("WXInterface"), gm.wx = "undefined" != typeof wx ? wx : null, gm.WXInterface.showShareMenu({
                    withShareTicket: !0,
                    success: function success(e) {
                        cc.log("showShareMenu success:" + e);
                    },
                    fail: function fail(e) {
                        cc.log("showShareMenu fail:" + e);
                    },
                    complete: function complete(e) {
                        cc.log("showShareMenu complete:" + e);
                    }
                }), gm.WXInterface.onShareAppMessage({
                    query: "type=2"
                }), gm.WXInterface.onHide(function () {}), gm.WXInterface.onShow(function (e) {
                    "1001" == e.scene || e.scene;
                })), gm.AdManager.AdsType == r.default.QQ && (gm.QQInterface = e("QQInterface"), gm.qq = "undefined" != typeof qq ? qq : null, gm.QQInterface.showShareMenu({
                    withShareTicket: !0,
                    success: function success(e) {
                        cc.log("showShareMenu success:" + e);
                    },
                    fail: function fail(e) {
                        cc.log("showShareMenu fail:" + e);
                    },
                    complete: function complete(e) {
                        cc.log("showShareMenu complete:" + e);
                    }
                }), gm.QQInterface.onShareAppMessage({
                    query: "type=2"
                }), gm.QQInterface.onHide(function () {
                    console.log("onHideonHideonHide"), null != gm.DataManager && (gm.DataManager.userData.LastInviteTime = Math.floor(new Date().getTime() / 1e3));
                }), gm.QQInterface.onShow(function (e) {
                    if (console.log(e), null != gm.DataManager) {
                        var t = Math.floor(new Date().getTime() / 1e3) - gm.DataManager.userData.LastInviteTime;
                        gm.UIManager.SendNotification(s.default.UIInfo_FreeInvite, t);
                    }
                })), gm.AdManager.AdsType == r.default.TT && (gm.TTInterface = e("TTInterface"), gm.tt = "undefined" != typeof tt ? tt : null), gm.AdManager.AdsType == r.default.Baidu && (gm.BaiduInterface = e("BaiduInterface"), gm.swan = "undefined" != typeof swan ? swan : null);
                var t = cc.Canvas.instance,
                    i = (t.designResolution.height, t.designResolution.width, cc.view.getVisibleSize());
                n.default.ScreenWidth = i.width, n.default.ScreenHeight = i.height;
            },
            update: function update(e) {
                for (var t = this.updateList.length, i = 0; i < t; i++) {
                    var n = this.updateList[i].OnUpdate;
                    n && n.call(this.updateList[i], e);
                }
                null == this._GameTimer && (this._GameTimer = 0, this._CheckTime = 0), this._GameTimer += e, this._GameTimer > 5 && (this._CheckTime++, gm.AdManager.dataRecode("GameTime ", 1e9 + 5 * this._CheckTime), this._GameTimer = 0);
            },
            addUpdate: function addUpdate(e) {
                e && this.updateList.push(e);
            },
            removeUpdate: function removeUpdate(e) {
                var t = this.updateList.indexOf(e);
                t >= 0 && this.updateList.splice(t, 1);
            },
            Dispose: function Dispose() {
                this.layer.Dispose();
            }
        }),
*/