const lwsdk = require("./SDK/lwsdk");

window.Role = {
    type: dragonBones.ArmatureDisplay,
    default: null
}
var SkinView = cc.Class({
    extends: cc.Component,
    properties: {
        coatBtn: {
            type: cc.Node,
            default: null
        },
        headBtn: {
            type: cc.Node,
            default: null
        },
        shoeBtn: {
            type: cc.Node,
            default: null
        },
        closeBtn: {
            type: cc.Node,
            default: null
        },
        content: {
            type: cc.Node,
            default: null
        },
        itemPre: {
            type: cc.Prefab,
            default: null
        },
        Role1: {
            type: dragonBones.ArmatureDisplay,
            default: null
        },
        Gold: {
            type: cc.Label,
            default: null
        },
    },

    //埃及 == ai  包租婆 == bao  李小龙  == li   超人 == ch  淑女 == shu  格格 == ge  海盗  == hai
    ChangeSkin(_armature, name, e) {
        if (CC_JSB) {
            // let factory = _armature.CCFactory.getInstance();
            // console.log(factory)  
            _armature.getSlot(name).setDisplayIndex(e)
        } else {
            // console.log(this.ri.armature().getSlot(name))._displayDatas[0].texture
            _armature.getSlot(name)._textureData = _armature.getSlot(name)._displayDatas[e].texture
            _armature.getSlot(name)._updateFrame()
        }
    },
    onLoad() {
        // window.Role = this.Role1
        window['SkinView'] = this
        this.refirshGold()
        // console.log("皮肤界面的onLoad")
        // console.log(window.Role._armature)
        this.init()
        this.getNowSkin()
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
                // this.ChangeSkin(window.Role._armature, 'head', z)
                if (z == 0) {
                    this.ChangeSkin(window.skinDragon._armature, 'hair', 0)
                    // this.ChangeSkin(window.Role._armature, 'hair', 0)
                } else {
                    this.ChangeSkin(window.skinDragon._armature, 'hair', 1)
                    // this.ChangeSkin(window.Role._armature, 'hair', 1)
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
                // this.ChangeSkin(window.Role._armature, 'body', x)
                // this.ChangeSkin(window.Role._armature, 'skirt', x)
                // this.ChangeSkin(window.Role._armature, 'arm', x)
                // this.ChangeSkin(window.Role._armature, 'arm1', x)
                // this.ChangeSkin(window.Role._armature, 'forearm', s)
                // this.ChangeSkin(window.Role._armature, 'forearm1', s)
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
                    o = 0
                } else if (o == 1) {
                    o = 4
                } else if (o == 0) {
                    o = 2
                } else if (o == 3) {
                    o = 3
                } else {
                    o = 1
                }
                // this.ChangeSkin(window.Role._armature, 'foot1', p)
                // this.ChangeSkin(window.Role._armature, 'foot', p)
                // this.ChangeSkin(window.Role._armature, 'shank', o)
                // this.ChangeSkin(window.Role._armature, 'shank1', o)
                this.ChangeSkin(window.skinDragon._armature, 'foot1', p)
                this.ChangeSkin(window.skinDragon._armature, 'foot', p)
                this.ChangeSkin(window.skinDragon._armature, 'shank', o)
                this.ChangeSkin(window.skinDragon._armature, 'shank1', o)
            }

        }

    },
    getNowSkin() {

    },
    init() {
        this.coatBtn.on(cc.Node.EventType.TOUCH_END, this.coatClick, this)
        this.headBtn.on(cc.Node.EventType.TOUCH_END, this.headClick, this)
        this.shoeBtn.on(cc.Node.EventType.TOUCH_END, this.shoeClick, this)
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.closeClick, this)
        this.headBtn.getChildByName("UnSelect").active = false
        this.creatItem(2)
    },
    coatClick() {
        this.coatBtn.getChildByName("UnSelect").active = false
        this.headBtn.getChildByName("UnSelect").active = true
        this.shoeBtn.getChildByName("UnSelect").active = true
        console.log("衣服按钮")
        this.creatItem(1)
    },
    headClick() {
        this.headBtn.getChildByName("UnSelect").active = false
        this.coatBtn.getChildByName("UnSelect").active = true
        this.shoeBtn.getChildByName("UnSelect").active = true
        console.log("发型按钮")
        this.creatItem(2)
    },
    shoeClick() {
        this.shoeBtn.getChildByName("UnSelect").active = false
        this.coatBtn.getChildByName("UnSelect").active = true
        this.headBtn.getChildByName("UnSelect").active = true
        console.log("鞋子按钮")
        this.creatItem(3)
    },
    closeClick() {
        // adSdk.showBanner("玩法页面", true, true, 10)
        lwsdk.showAuthoriseButton()
        this.node.destroy()
    },
    creatItem(index) {
        this.refirshGold()
        // console.log(window.spriteCoat)
        if (index == 1) {
            if (index != 1) {} else {
                this.content.removeAllChildren()
            }
            var spriteShoe = window.spriteCoat
            var userData = gm.DataManager.userData.skinCoat
            var skinIndex = "skinCoat"

        } else if (index == 2) {
            if (index != 2) {} else {
                this.content.removeAllChildren()
            }
            spriteShoe = window.spriteHead
            userData = gm.DataManager.userData.skinHead
            skinIndex = "skinHead"
        } else {
            if (index != 3) {} else {
                this.content.removeAllChildren()
            }
            // this.ChangeSkin(window.Role._armature,'shoe',4)
            spriteShoe = window.spriteShoe
            userData = gm.DataManager.userData.skinShoe
            skinIndex = "skinShoe"
        }
        for (var i = 0; i < spriteShoe.length; i++) {
            this.shoeItem = cc.instantiate(this.itemPre)
            this.shoeItem.parent = this.content
            this.shoeItem.i = i
            this.shoeItem.skinNum = i
            this.shoeItem.shankOrarm = i
            if (spriteShoe == window.spriteCoat) {
                var Shoe = i
                // console.log("设置不同层级衣服",i,Shoe)
                // this.shoeItem.setSiblingIndex(0)
                if (Shoe == 0) {
                    Shoe = 5
                    this.shoeItem.getChildByName("Select").getComponent(cc.Sprite).spriteFrame = spriteShoe[Shoe]
                } else if (Shoe == 5) {
                    Shoe = 0
                    this.shoeItem.getChildByName("Select").getComponent(cc.Sprite).spriteFrame = spriteShoe[Shoe]
                } else {
                    this.shoeItem.getChildByName("Select").getComponent(cc.Sprite).spriteFrame = spriteShoe[Shoe]
                }
            } else if (spriteShoe == window.spriteShoe) {
                var shoe = i
                // console.log("设置不同层级鞋子",shoe)
                if (shoe == 0) {
                    shoe = 6
                    this.shoeItem.getChildByName("Select").getComponent(cc.Sprite).spriteFrame = spriteShoe[shoe]
                } else if (shoe == 6) {
                    shoe = 0
                    this.shoeItem.getChildByName("Select").getComponent(cc.Sprite).spriteFrame = spriteShoe[shoe]
                } else {
                    this.shoeItem.getChildByName("Select").getComponent(cc.Sprite).spriteFrame = spriteShoe[shoe]
                }
            } else {
                this.shoeItem.getChildByName("Select").getComponent(cc.Sprite).spriteFrame = spriteShoe[i]
            }
            var gold = this.shoeItem.getChildByName("Lock").getChildByName("NeedGold")
            this.shoeItem.getChildByName("Lock").getChildByName("NeedGold").getComponent(cc.Label).string = 500 + (i * 50)
            this.shoeItem.skinIcon = skinIndex
            // this.ChangeSkin(window.Role._armature,'head',this.shoeItem.i)
            if (userData[i].isunlock == 0) {
                this.shoeItem.getChildByName("Lock").active = false
                this.shoeItem.getChildByName("Cloch").active = true
            } else {
                this.shoeItem.getChildByName("Cloch").active = false
                this.shoeItem.getChildByName("Lock").active = true
            }
            if (userData[i].isChoose == 0) {
                this.shoeItem.getChildByName("Fashion").active = true
                this.shoeItem.getChildByName("Cloch").active = false
            } else {
                this.shoeItem.getChildByName("Cloch").active = true
                this.shoeItem.getChildByName("Fashion").active = false
            }
        }
    },
    refirsh() {
        console.log("刷新ui")
    },
    refirshGold() {
        this.Gold.getComponent(cc.Label).string = gm.DataManager.userData.gold
    },
});