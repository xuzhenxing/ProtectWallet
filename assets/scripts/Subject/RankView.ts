// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import wxUtils from "../api/wxUtils";
var lwsdk = require("lwsdk")

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankView extends cc.Component {

    @property(cc.Node)
    Close: cc.Node = null
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    Share: cc.Node = null

    @property([cc.SpriteFrame])
    rankItemBg: cc.SpriteFrame[] = []

    @property([cc.SpriteFrame])
    rankItemRank: cc.SpriteFrame[] = []

    @property(cc.Node)
    content: cc.Node = null
    @property(cc.Node)
    BG: cc.Node = null
    @property(cc.Prefab)
    rankItem: cc.Prefab = null

    @property(cc.Prefab)
    worldItem: cc.Prefab = null
    @property(cc.Node)
    selfNode: cc.Node = null
    @property(cc.Prefab)
    selfPre: cc.Prefab = null;
    @property(cc.Prefab)
    worldSelf: cc.Prefab = null


    @property(cc.Node)
    friendRank: cc.Node = null
    @property(cc.Node)
    worldRank: cc.Node = null
    @property(cc.Node)
    worldNode: cc.Node = null
    @property(cc.Node)
    worldView: cc.Node = null

    Num = 1
    // onLoad () {}
    Rank = null
    start() {
        let self = this
        this.Close.on(cc.Node.EventType.TOUCH_END, this.CloseClick, this)
        this.Share.on(cc.Node.EventType.TOUCH_END, this.ShareClick, this)
        this.friendRank.on(cc.Node.EventType.TOUCH_END, this.friendClick, this)
        this.worldRank.on(cc.Node.EventType.TOUCH_END, this.worldClick, this)
        // this.createRankList()
        if (window['wx']) {
            let openDataContext = window["wx"].getOpenDataContext();
            var sendDataFriend =
            {
                MAIN_MENU_ALL: 'ALL',
                ALL: window['a'].Level,
            }
            openDataContext.postMessage({
                messageType:2
                // ,
                // level: JSON.stringify(sendDataFriend)
                // world: JSON.stringify(sendDataWorld)
            })
        } else {
            console.log("获取横向展示排行榜数据。x1");
        }
        console.log("默认好友")
        console.log(window['a'].worldOrfriend)
        // if (window['a'].worldOrfriend == 0) {
            //self.friendClick()
        // } else {
             self.worldClick()
        // }
        

    }

    CloseClick() {
        this.node.destroy()
        lwsdk.hideAuthoriseButton()
    }
    wxRankShow() {
        if (this.Rank) {
            let a = wx.getStorageSync('beginLv')
            this.Rank.getComponent('wxRankList').uploadScore(1, 1)
            this.Rank.getComponent('wxRankList').onViewDetailRank()
            this.Rank.getComponent('wxRankList').updateRankList()
        }
    }
    ShareClick() {
        // lwsdk.setSceneEvent({ sceneName: "排行榜界面", eventName: "点击", eventId: "点击【炫耀一下】按钮" });
        var self = this
        console.log(100001)
        lwsdk.shareAppMessage({
            type: 1,
            success: function () {
                if (window['a'].can_power) {
                    window['a'].power += 3;
                    if (window['a'].power >= 99) {
                        window['a'].power = 99
                        wxUtils.showToast("已达到体力上限")
                        console.log(4444)
                    } else {
                        wxUtils.showToast("获取3体力")
                    }
                    window['a'].can_power = false
                    console.log(5555)
                    var PLabel = self.node.parent.getChildByName("PowerBG").getChildByName("powerLabel")
                    console.log(6666)
                    PLabel.getComponent(cc.Label).string = window['a'].power
                    console.log(7777)
                    // heartbeatSchedule.emitEvent()
                    lwsdk.setToServer({ dataKey: "girlData", dataType: "girlData", data: window['a'], expireTime: 3600 })
                    console.log(8888)
                } else {
                    wxUtils.showToast("今日分享获取体力已上限")
                }
            },
            fail: function () {
                wxUtils.showToast("分享失败，请重新分享")
            }
        })


    }

    friendClick() {
        console.log("friendClick")
        window['a'].worldOrfriend = 0
        this.friendRank.getChildByName("bg").active = true
        this.friendRank.getChildByName("title").active = true
        this.friendRank.getChildByName("title1").active = false
        this.worldRank.getChildByName("bg").active = false
        this.worldRank.getChildByName("title1").active = true
        this.worldRank.getChildByName("title").active = false
        this.worldNode.active = true
        if(this.worldNode.getChildByName("worldSelf")&&this.worldNode.getChildByName("worldSelf").getChildByName("rank")){
        this.worldNode.getChildByName("worldSelf").getChildByName("rank").active=false
        this.worldNode.getChildByName("worldSelf").getChildByName("ranksp").active=false
        }
        this.worldView.active = false
        lwsdk.setToServer({ dataKey: "girlData", dataType: "girlData", data: window['a'], expireTime: 3600 })

        let openDataContext = window["wx"].getOpenDataContext();
            
            openDataContext.postMessage({
                messageType:2
            })
    }
    worldClick() {
        console.log("worldClic")
        window['a'].worldOrfriend = 1
        let self = this
        this.friendRank.getChildByName("bg").active = false
        this.friendRank.getChildByName("title1").active = true
        this.friendRank.getChildByName("title").active = false
        this.worldRank.getChildByName("bg").active = true
        this.worldRank.getChildByName("title").active = true
        this.worldRank.getChildByName("title1").active = false
        this.worldNode.active = true
        console.log("this.worldNodethis.worldNode",this.worldNode)
        if(this.worldNode.getChildByName("worldSelf")&&this.worldNode.getChildByName("worldSelf").getChildByName("rank")){
        this.worldNode.getChildByName("worldSelf").getChildByName("rank").active=false
        this.worldNode.getChildByName("worldSelf").getChildByName("ranksp").active=false
        }
        this.worldView.active = true
        lwsdk.setToServer({ dataKey: "girlData", dataType: "girlData", data: window['a'], expireTime: 3600 })
        lwsdk.rankingSetScore({
            score: Number(window['a'].Level),
            success: res => {
            },
            fail: err => console.log(err)
        })
        // this.BG.active = true
        // this.createHead()
        // this.createworld()
        lwsdk.rankingGet({
            page: 1,
            offset: 30,
            success: res => {
                console.log(res, 'res=========')
                self.createworld(res.list, res.myself)
            }
        })
        
        if (window['wx']) {
            let openDataContext = window["wx"].getOpenDataContext();
            openDataContext.postMessage({
                messageType: 3
            })
        } else {
            console.log("获取横向展示排行榜数据。x1");
        }
    }

    createworld(data, myself) {
        this.worldView.removeAllChildren()
        // this.worldNode.removeAllChildren()
        let date = []
        for (let i = 0; i < data.length; i++) {
            date.push(data[i])
            // this.worldImage(data[i], (parseInt(data[i].rank)) == i+1, data.length, i)
        }
        let newData = date.sort((a, b) => {
            return a.rank - b.rank;
        })
        this.buildRank(newData, myself)
    }
    buildRank = (gameDatas, myself) => {
        gameDatas.forEach((date, rank) => {
            this.scheduleOnce(() => {
                this.worldImage(date, date.rank, gameDatas.length, (rank + 1 == date.rank), myself)
            }, .02)
        });
    }
    worldImage(data, rank, index, show, myself) {
        var ctx = cc.instantiate(this.worldItem)
        const nick = data.nickName
        const grade = data.score
        const grader = grade.toString().split("")
        let gradeV = "" // 大关
        let gradeL = "" // 小关
        let gradeRight = ""
        if (grader.length < 8 && grader.length > 5) {
            gradeV = grader[0] + ""
            gradeL = grader[1]
            gradeRight = Number(grader[2] + "" + grader[3] + "" + grader[4] + "." + grader[5] + "" + grader[6]).toFixed(2)
        } else if (grader.length < 5) {
            gradeV = grader[0] + ""
            gradeL = grader[1]
            gradeRight = Number(grader[2] + ".").toFixed(2)

        } else if (grader.length == 8) {
            gradeV = grader[0] + "" + grader[1]
            gradeL = grader[2]
            gradeRight = Number(grader[3] + "" + grader[4] + "" + grader[5] + "." + grader[6] + "" + grader[7]).toFixed(2)
        } else if(grader.length > 8 && grader.length < 11) {
            gradeV = grader[0] + "" + grader[1] + "" + grader[2]
            gradeL = grader[3]
            gradeRight = Number(grader[4] + "" + grader[5] + "" + grader[6] + "." + grader[7] + "" + grader[8]).toFixed(2)
        }else{
            gradeV = grader[0] + "" + grader[1]
            gradeL = grader[2]
            gradeRight = Number(grader[3] + "" + grader[4] + "" + grader[5] + "." + grader[6] + "" + grader[7]).toFixed(2)

        }
        if (gradeRight == "NaN") {
            gradeRight = Number(0 + ".").toFixed(2)
        }
        ctx.getChildByName('name').getComponent(cc.Label).string = nick
        ctx.getChildByName('rank').getComponent(cc.Label).string = rank
        ctx.getChildByName('Level').getChildByName("LevelLabel").getComponent(cc.Label).string = gradeV + "-" + gradeL
        // ctx.getChildByName('Level').getChildByName("LittleLabel").getComponent(cc.Label).string = gradeL + ""
        ctx.getChildByName('Right').getChildByName("RightLabel").getComponent(cc.Label).string = gradeRight + "%"
        if (myself.rank == rank) {
            ctx.getChildByName('BG').active = true
        } else {
            ctx.getChildByName('BG').active = false
        }
        if (rank < 4) {
            ctx.getChildByName('ranksp').getComponent(cc.Sprite).spriteFrame = this.rankItemRank[rank - 1]
        }
        else {
            ctx.getChildByName('ranksp').active = false
            ctx.getChildByName('rank').active = true
        }
        cc.loader.load(data.avatarUrl + '?aaa=aa.jpg', function (err, texture) {
            if (!err)
                ctx.getChildByName('head').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });
        this.worldView.addChild(ctx)
        if (this.Num==1) {
            this.Num=2
            var self = cc.instantiate(this.worldSelf)
            const nick = myself.nickName
            let grade = myself.score
            let grader = grade.toString().split("")
            let gradeV = "" // 大关
            let gradeL = "" // 小关
            let gradeRight = ""
            if (grader.length < 8 && grader.length > 5) {
                gradeV = grader[0] + ""
                gradeL = grader[1]
                gradeRight = Number(grader[2] + "" + grader[3] + "" + grader[4] + "." + grader[5] + "" + grader[6]).toFixed(2)
            } else if (grader.length < 5) {
                gradeV = grader[0] + ""
                gradeL = grader[1]
                gradeRight = Number(grader[2] + ".").toFixed(2)

            } else if (grader.length == 8) {
                gradeV = grader[0] + "" + grader[1]
                gradeL = grader[2]
                gradeRight = Number(grader[3] + "" + grader[4] + "" + grader[5] + "." + grader[6] + "" + grader[7]).toFixed(2)
            } else if(grader.length > 8 && grader.length < 11) {
                gradeV = grader[0] + "" + grader[1] + "" + grader[2]
                gradeL = grader[3]
                gradeRight = Number(grader[4] + "" + grader[5] + "" + grader[6] + "." + grader[7] + "" + grader[8]).toFixed(2)
            }else{
                gradeV = grader[0] + "" + grader[1]
                gradeL = grader[2]
                gradeRight = Number(grader[3] + "" + grader[4] + "" + grader[5] + "." + grader[6] + "" + grader[7]).toFixed(2)

            }
            if (gradeRight == "NaN") {
                gradeRight = Number(0 + ".").toFixed(2)
            }
            self.getChildByName('name').getComponent(cc.Label).string = nick
            self.getChildByName('rank').getComponent(cc.Label).string = myself.rank
            self.getChildByName('Level').getChildByName("LevelLabel").getComponent(cc.Label).string = gradeV + "-" + gradeL
            // self.getChildByName('Level').getChildByName("LittleLabel").getComponent(cc.Label).string = gradeL + ""
            self.getChildByName('Right').getChildByName("RightLabel").getComponent(cc.Label).string = gradeRight + "%"
            if (myself.rank < 4) {
                self.getChildByName('ranksp').getComponent(cc.Sprite).spriteFrame = this.rankItemRank[myself.rank - 1]
            }
            else {
                self.getChildByName('ranksp').active = false
                self.getChildByName('rank').active = true
            }
            cc.loader.load(myself.avatarUrl + '?aaa=aa.jpg', function (err, texture) {
                if (!err)
                    self.getChildByName('head').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
            this.worldNode.addChild(self)
            if(this.worldNode.getChildByName("worldSelf")&&this.worldNode.getChildByName("worldSelf").getChildByName("rank")){
                this.worldNode.getChildByName("worldSelf").getChildByName("rank").active=false
                this.worldNode.getChildByName("worldSelf").getChildByName("ranksp").active=false
            }
        }
    }


























    createHead(data) {
        for (let i = 0; i < data.length; i++) {
            this.headImage(data[i], data[i].rank, data.length)
        }
    }
    headImage(data, rank, index) {
        // console.log(this.worldView.childrenCount)
        if (this.worldView.childrenCount < index) {
            var head = cc.instantiate(this.rankItem)
            this.worldView.addChild(head)
            cc.loader.load(data.avavtarUrl + '?aaa=aa.jpg', function (err, texture) {
                if (!err)
                    head.getChildByName('head').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
            if (rank) {
                var self = cc.instantiate(this.selfPre)
                cc.loader.load(data.headimgurl + '?aaa=aa.jpg', function (err, texture) {
                    if (!err)
                        self.getChildByName('head').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
                this.worldNode.addChild(self)
            }
        } else {
            // console.log("cunzaijiedian ")
        }
    }
















}
