// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var gameSDK = require("gameSDK");
var cfs = require("configStore");
var wxUtils = require("wxUtils");
// console.log(skinView.getInstance().creatItem(2))

cc.Class({
    extends: cc.Component,
    properties: {
        self: {
            type: cc.Node,
            default: null
        },
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.self.on(cc.Node.EventType.TOUCH_END, this.videoClick, this)
    },

    videoClick(i) {
        var self = this
        if (i.target.skinIcon == "skinCoat") {
            if (gm.DataManager.userData.skinCoat[i.target.i].isunlock == 0) {
                for (var s = 0; s < 8; s++) {
                    gm.DataManager.userData.skinCoat[s].isChoose = 1
                }
                if (i.target.skinNum == 0) {
                    i.target.skinNum = 0
                } else if (i.target.skinNum == 1) {
                    i.target.skinNum = 7
                } else if (i.target.skinNum == 2) {
                    i.target.skinNum = 3
                } else if (i.target.skinNum == 3) {
                    i.target.skinNum = 6
                } else if (i.target.skinNum == 4) {
                    i.target.skinNum = 2
                } else if (i.target.skinNum == 5) {
                    i.target.skinNum = 1
                } else if (i.target.skinNum == 6) {
                    i.target.skinNum = 5
                } else if (i.target.skinNum == 7) {
                    i.target.skinNum = 4
                }
                if (i.target.shankOrarm == 2) {
                    i.target.shankOrarm = 4
                } else if (i.target.shankOrarm == 6) {
                    i.target.shankOrarm = 1
                } else if (i.target.shankOrarm == 3) {
                    i.target.shankOrarm = 3
                } else if (i.target.shankOrarm == 7) {
                    i.target.shankOrarm = 2
                } else {
                    i.target.shankOrarm = 0
                }
                console.log(window['RoleSelf']._armature)
                // this.ChangeSkin(window.Role._armature, 'body', i.target.skinNum)
                // this.ChangeSkin(window.Role._armature, 'skirt', i.target.skinNum)
                // this.ChangeSkin(window.Role._armature, 'arm', i.target.skinNum)
                // this.ChangeSkin(window.Role._armature, 'arm1', i.target.skinNum)
                // this.ChangeSkin(window.Role._armature, 'forearm', i.target.shankOrarm)
                // this.ChangeSkin(window.Role._armature, 'forearm1', i.target.shankOrarm)
                this.ChangeSkin(window['RoleSelf']._armature, 'forearm1', i.target.shankOrarm)
                this.ChangeSkin(window['RoleSelf']._armature, 'body', i.target.skinNum)
                this.ChangeSkin(window['RoleSelf']._armature, 'skirt', i.target.skinNum)
                this.ChangeSkin(window['RoleSelf']._armature, 'arm', i.target.skinNum)
                this.ChangeSkin(window['RoleSelf']._armature, 'arm1', i.target.skinNum)
                this.ChangeSkin(window['RoleSelf']._armature, 'forearm', i.target.shankOrarm)
                this.ChangeSkin(window['RoleSelf']._armature, 'forearm1', i.target.shankOrarm)
                gm.DataManager.userData.skinCoat[i.target.i].isChoose = 0
                gm.DataManager.userData.skinCoat[i.target.i].isunlock = 0
                window['SkinView'].creatItem(1)
                // var Coat = this.self.children[2].getComponent(cc.Sprite).spriteFrame
                // self.GetGift(Coat);
            } else {
                var gold = this.self.children[1].children[2].getComponent(cc.Label).string
                    if (gm.DataManager.userData.gold >= gold) {
                        gm.DataManager.userData.gold -= gold
                        
                        for (var s = 0; s < 8; s++) {
                            gm.DataManager.userData.skinCoat[s].isChoose = 1
                        }
                        if (i.target.skinNum == 0) {
                            i.target.skinNum = 0
                        } else if (i.target.skinNum == 1) {
                            i.target.skinNum = 7
                        } else if (i.target.skinNum == 2) {
                            i.target.skinNum = 3
                        } else if (i.target.skinNum == 3) {
                            i.target.skinNum = 6
                        } else if (i.target.skinNum == 4) {
                            i.target.skinNum = 2
                        } else if (i.target.skinNum == 5) {
                            i.target.skinNum = 1
                        } else if (i.target.skinNum == 6) {
                            i.target.skinNum = 5
                        } else if (i.target.skinNum == 7) {
                            i.target.skinNum = 4
                        }
                        if (i.target.shankOrarm == 2) {
                            i.target.shankOrarm = 4
                        } else if (i.target.shankOrarm == 6) {
                            i.target.shankOrarm = 1
                        } else if (i.target.shankOrarm == 3) {
                            i.target.shankOrarm = 3
                        } else if (i.target.shankOrarm == 7) {
                            i.target.shankOrarm = 2
                        } else {
                            i.target.shankOrarm = 0
                        }
                        // this.ChangeSkin(window.Role._armature, 'body', i.target.skinNum)
                        // this.ChangeSkin(window.Role._armature, 'skirt', i.target.skinNum)
                        // this.ChangeSkin(window.Role._armature, 'arm', i.target.skinNum)
                        // this.ChangeSkin(window.Role._armature, 'arm1', i.target.skinNum)
                        // this.ChangeSkin(window.Role._armature, 'forearm', i.target.shankOrarm)
                        // this.ChangeSkin(window.Role._armature, 'forearm1', i.target.shankOrarm)
                        this.ChangeSkin(window['RoleSelf']._armature, 'forearm1', i.target.shankOrarm)
                        this.ChangeSkin(window['RoleSelf']._armature, 'body', i.target.skinNum)
                        this.ChangeSkin(window['RoleSelf']._armature, 'skirt', i.target.skinNum)
                        this.ChangeSkin(window['RoleSelf']._armature, 'arm', i.target.skinNum)
                        this.ChangeSkin(window['RoleSelf']._armature, 'arm1', i.target.skinNum)
                        this.ChangeSkin(window['RoleSelf']._armature, 'forearm', i.target.shankOrarm)
                        this.ChangeSkin(window['RoleSelf']._armature, 'forearm1', i.target.shankOrarm)
                        gm.DataManager.userData.skinCoat[i.target.i].isunlock = 0
                        gm.DataManager.userData.skinCoat[i.target.i].isChoose = 0
                        window['SkinView'].creatItem(1)
                        // heartbeatSchedule.default.emitEvent()
                        if (window['wx']) {
                            lwsdk.setToServer({dataKey:"girlData",dataType:"girlData",data:gm.DataManager.userData,expireTime:3600})
                        }
                        wxUtils.default.showToast("恭喜你获得了奖励!")
                        var Coat = this.self.children[2].getComponent(cc.Sprite).spriteFrame
                        // console.log(Coat)
                        self.GetGift(Coat);
                        window.Refish()
                    } else {
                        // wxUtils.default.showToast("金币不足!")
                        cc.loader.loadRes("Prefabs/GetGold",(err,pre)=>{
                            var clone = cc.instantiate(pre)
                            clone.parent = cc.director.getScene().getChildByName("SkinView")
                        })
                    }
            }
        } else if (i.target.skinIcon == "skinShoe") {
            if (gm.DataManager.userData.skinShoe[i.target.i].isunlock == 0) {

                for (var p = 0; p < 8; p++) {
                    gm.DataManager.userData.skinShoe[p].isChoose = 1
                }
                if (i.target.skinNum == 0) {
                    i.target.skinNum = 0
                } else if (i.target.skinNum == 1) {
                    i.target.skinNum = 4
                } else if (i.target.skinNum == 2) {
                    i.target.skinNum = 3
                } else if (i.target.skinNum == 3) {
                    i.target.skinNum = 7
                } else if (i.target.skinNum == 4) {
                    i.target.skinNum = 5
                } else if (i.target.skinNum == 5) {
                    i.target.skinNum = 1
                } else if (i.target.skinNum == 6) {
                    i.target.skinNum = 6
                } else if (i.target.skinNum == 7) {
                    i.target.skinNum = 2
                }
                if (i.target.shankOrarm == 6) {
                    i.target.shankOrarm = 2
                } else if (i.target.shankOrarm == 1) {
                    i.target.shankOrarm = 4
                } else if (i.target.shankOrarm == 0) {
                    i.target.shankOrarm = 1
                } else if (i.target.shankOrarm == 3) {
                    i.target.shankOrarm = 3
                } else {
                    i.target.shankOrarm = 1
                }
                // this.ChangeSkin(window.Role._armature, 'foot1', i.target.skinNum)
                // this.ChangeSkin(window.Role._armature, 'foot', i.target.skinNum)
                // this.ChangeSkin(window.Role._armature, 'shank', i.target.shankOrarm)
                // this.ChangeSkin(window.Role._armature, 'shank1', i.target.shankOrarm)
                this.ChangeSkin(window['RoleSelf']._armature, 'shank1', i.target.shankOrarm)
                this.ChangeSkin(window['RoleSelf']._armature, 'foot1', i.target.skinNum)
                this.ChangeSkin(window['RoleSelf']._armature, 'foot', i.target.skinNum)
                this.ChangeSkin(window['RoleSelf']._armature, 'shank', i.target.shankOrarm)
                gm.DataManager.userData.skinShoe[i.target.i].isChoose = 0
                gm.DataManager.userData.skinShoe[i.target.i].isunlock = 0
                window['SkinView'].creatItem(3)
                // heartbeatSchedule.default.emitEvent()
                var Shoe = this.self.children[2].getComponent(cc.Sprite).spriteFrame
                // console.log(Coat)
                // self.GetGift(Shoe);
            } else {
                var gold = this.self.children[1].children[2].getComponent(cc.Label).string
                    if (gm.DataManager.userData.gold >= gold) {
                        gm.DataManager.userData.gold -= gold
                        for (var p = 0; p < 8; p++) {
                            gm.DataManager.userData.skinShoe[p].isChoose = 1
                        }
                        if (i.target.skinNum == 0) {
                            i.target.skinNum = 0
                        } else if (i.target.skinNum == 1) {
                            i.target.skinNum = 4
                        } else if (i.target.skinNum == 2) {
                            i.target.skinNum = 3
                        } else if (i.target.skinNum == 3) {
                            i.target.skinNum = 7
                        } else if (i.target.skinNum == 4) {
                            i.target.skinNum = 5
                        } else if (i.target.skinNum == 5) {
                            i.target.skinNum = 1
                        } else if (i.target.skinNum == 6) {
                            i.target.skinNum = 6
                        } else if (i.target.skinNum == 7) {
                            i.target.skinNum = 2
                        }
                        if (i.target.shankOrarm == 6) {
                            i.target.shankOrarm = 2
                        } else if (i.target.shankOrarm == 1) {
                            i.target.shankOrarm = 4
                        } else if (i.target.shankOrarm == 0) {
                            i.target.shankOrarm = 1
                        } else if (i.target.shankOrarm == 3) {
                            i.target.shankOrarm = 3
                        } else {
                            i.target.shankOrarm = 1
                        }
                        // this.ChangeSkin(window.Role._armature, 'foot1', i.target.skinNum)
                        // this.ChangeSkin(window.Role._armature, 'foot', i.target.skinNum)
                        // this.ChangeSkin(window.Role._armature, 'shank', i.target.shankOrarm)
                        // this.ChangeSkin(window.Role._armature, 'shank1', i.target.shankOrarm)
                        gm.DataManager.userData.skinShoe[i.target.i].isunlock = 0
                        gm.DataManager.userData.skinShoe[i.target.i].isChoose = 0
                        window['SkinView'].creatItem(3)
                        // heartbeatSchedule.default.emitEvent()
                        if (window['wx']) {
                            lwsdk.setToServer({dataKey:"girlData",dataType:"girlData",data:gm.DataManager.userData,expireTime:3600})
                        }
                        var Shoe = this.self.children[2].getComponent(cc.Sprite).spriteFrame
                        // console.log(Coat)
                        self.GetGift(Shoe);
                        window.Refish()
                        wxUtils.default.showToast("恭喜你获得了奖励!")
                    } else {
                        // wxUtils.default.showToast("金币不足!")
                        console.log("金币不足")
                        cc.loader.loadRes("Prefabs/GetGold",(err,pre)=>{
                            var clone = cc.instantiate(pre)
                            clone.parent = cc.director.getScene().getChildByName("SkinView")
                        })
                    }
                
        }
    } else if (i.target.skinIcon == "skinHead") {
        if (gm.DataManager.userData.skinHead[i.target.i].isunlock == 0) {
            for (var o = 0; o < 8; o++) {
                gm.DataManager.userData.skinHead[o].isChoose = 1
            }
            if (i.target.skinNum == 0) {
                i.target.skinNum = 0
            } else if (i.target.skinNum == 1) {
                i.target.skinNum = 7
            } else if (i.target.skinNum == 2) {
                i.target.skinNum = 6
            } else if (i.target.skinNum == 3) {
                i.target.skinNum = 9
            } else if (i.target.skinNum == 4) {
                i.target.skinNum = 11
            } else if (i.target.skinNum == 5) {
                i.target.skinNum = 8
            } else if (i.target.skinNum == 6) {
                i.target.skinNum = 10
            } else if (i.target.skinNum == 7) {
                i.target.skinNum = 5
            }
            // this.ChangeSkin(window.Role._armature, 'head', i.target.skinNum)
            this.ChangeSkin(window['RoleSelf']._armature, 'head', i.target.skinNum)
            var self = this
            if (i.target.skinNum == 0) {
                // this.ChangeSkin(window.Role._armature, 'hair', 0)
                this.ChangeSkin(window['RoleSelf']._armature, 'hair', 0)
            } else {
                // this.ChangeSkin(window.Role._armature, 'hair', 1)
                this.ChangeSkin(window['RoleSelf']._armature, 'hair', 1)
            }
            gm.DataManager.userData.skinHead[i.target.i].isChoose = 0
            gm.DataManager.userData.skinHead[i.target.i].isunlock = 0
            window['SkinView'].creatItem(2)
            var Head = this.self.children[2].getComponent(cc.Sprite).spriteFrame
            // console.log(Coat)
            // self.GetGift(Head);
            // heartbeatSchedule.default.emitEvent()

        } else {
            var gold = this.self.children[1].children[2].getComponent(cc.Label).string
                if (gm.DataManager.userData.gold >= gold) {
                    gm.DataManager.userData.gold -= gold
                    for (var o = 0; o < 8; o++) {
                        gm.DataManager.userData.skinHead[o].isChoose = 1
                    }
                    if (i.target.skinNum == 0) {
                        i.target.skinNum = 0
                    } else if (i.target.skinNum == 1) {
                        i.target.skinNum = 7
                    } else if (i.target.skinNum == 2) {
                        i.target.skinNum = 6
                    } else if (i.target.skinNum == 3) {
                        i.target.skinNum = 9
                    } else if (i.target.skinNum == 4) {
                        i.target.skinNum = 11
                    } else if (i.target.skinNum == 5) {
                        i.target.skinNum = 8
                    } else if (i.target.skinNum == 6) {
                        i.target.skinNum = 10
                    } else if (i.target.skinNum == 7) {
                        i.target.skinNum = 5
                    }
                    // this.ChangeSkin(window.Role._armature, 'head', i.target.skinNum)
                    this.ChangeSkin(window['RoleSelf']._armature, 'head', i.target.skinNum)
                    if (i.target.skinNum == 0) {
                        // this.ChangeSkin(window.Role._armature, 'hair', 0)
                        this.ChangeSkin(window['RoleSelf']._armature, 'hair', 0)
                    } else {
                        // this.ChangeSkin(window.Role._armature, 'hair', 1)
                        this.ChangeSkin(window['RoleSelf']._armature, 'hair', 1)
                    }
                    gm.DataManager.userData.skinHead[i.target.i].isunlock = 0
                    gm.DataManager.userData.skinHead[i.target.i].isChoose = 0
                    window['SkinView'].creatItem(2)
                    // heartbeatSchedule.default.emitEvent()
                    if (window['wx']) {
                        lwsdk.setToServer({dataKey:"girlData",dataType:"girlData",data:gm.DataManager.userData,expireTime:3600})
                    }
                    wxUtils.default.showToast("恭喜你获得了奖励!")
                    var Head = this.self.children[2].getComponent(cc.Sprite).spriteFrame
                    // console.log(Coat)
                    self.GetGift(Head);
                    window.Refish()
                } else {
                    // wxUtils.default.showToast("金币不足!")
                    console.log("金币不足")
                    cc.loader.loadRes("Prefabs/GetGold",(err,pre)=>{
                        var clone = cc.instantiate(pre)
                        clone.parent = cc.director.getScene().getChildByName("SkinView")
                    })
                }
        }
    }
},
start() {

},
ChangeSkin(_armature, name, e) {
    if (CC_JSB) {
        _armature.getSlot(name).setDisplayIndex(e)
    } else {
        _armature.getSlot(name)._textureData = _armature.getSlot(name)._displayDatas[e].texture
        _armature.getSlot(name)._updateFrame()
    }
    // Global.ins().setClothes(_armature1, 'gong1', 1)s
},
GetGift(index) {
    cc.loader.loadRes("Prefabs/GetAward", (err, Pre) => {
        if (err) {
            console.error(err)
        }
        var Clone = cc.instantiate(Pre)
        Clone.parent = cc.director.getScene().getChildByName("SkinView")
        Clone.getChildByName("Get").getComponent(cc.Sprite).spriteFrame = index
    })
},
// update (dt) {},
});