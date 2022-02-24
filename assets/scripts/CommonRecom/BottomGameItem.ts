import GameBoxTool from "./GameBoxTool";
import configStore from "../SDK/configStore";
const { ccclass, property } = cc._decorator;

@ccclass
export default class BottomGameItem extends cc.Component {

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Label)
    nameText: cc.Label = null;//可以不用

    @property(dragonBones.ArmatureDisplay)
    err: dragonBones.ArmatureDisplay = null;//是否开启特效

    @property(cc.Node)
    title: cc.Node = null;//是否开启标签

    @property(cc.Node)
    star: cc.Node = null;//是否开启标签

    @property(cc.Prefab)
    falseDialog: cc.Prefab = null;

    success: Function = null;

    fail: Function = null;


    spriteArray: cc.SpriteFrame = null

    x = null
    spriteTime = 0
    spriteIndex = 0
    onEnable() {
        if (this.node.name == 'mask')
            this.playTipAnimation()
    }

    resetSprite(index, x) {
        if (this.spriteArray === null) return
        var Sprite = this.spriteArray.clone()
        if (index >= 1 && index < 4) {
            Sprite.setRect(cc.rect(x * (index - 1), 0, x, x))
        } else if (index >= 4 && index < 7) {
            Sprite.setRect(cc.rect(x * (index - 4), x, x, x))
        } else if (index >= 7 && index < 9) {
            Sprite.setRect(cc.rect(x * (index - 7), x * 2, x, x))
        } else {
            Sprite.setRect(cc.rect(0, 0, x, x))
        }
        return Sprite
    }

    update(dt) {
        this.spriteTime += dt
        if (this.spriteArray != null && this.spriteTime > 0.2) {
            this.spriteTime = 0
            this.spriteIndex >= 9 ? this.spriteIndex = 1 : this.spriteIndex++
            this.icon.spriteFrame = this.resetSprite(this.spriteIndex, this.x)
        }
    }
    addSprite(gifsUrl) {
        GameBoxTool.loadIcon(gifsUrl).then((res) => {
            const tex: cc.Texture2D = res as cc.Texture2D;
            this.spriteArray = new cc.SpriteFrame(tex)
            this.x = this.spriteArray.getTexture() ? this.spriteArray.getTexture().width / 3 : 160
        });
    }
    init({ name, path, icon, appid, location_id, config_id  }, iconIndex = 0, loaded?: Function) {
        this.spriteArray = null
        if (!icon[0]) {
            var e = []
            e.push(icon)
            icon = e
        }
        if (this.nameText) {
            this.nameText.string = name;
        }

        if (this.err && icon[0].tx_switch) {
            this.err.node.active = true
            this.err.playAnimation('animation', 0)
        }
        else {
            if (this.err)
                this.err.node.active = false
        }
        if (this.title && icon[0].label_switch) {
            this.title.active = true
        }
        else {
            if (this.title)
                this.title.active = false
        }
        if (this.star && icon[0].tx_switch) {
            this.star.active = true
        }
        else {
            if (this.star)
                this.star.active = false
        }

        //ald.sendEvent("recom_总曝光", { 'game': name })
        this.success = () => {
            this.Post("AdvertisingJump", location_id, config_id, icon[0].iconid, "跳转")
            console.log("跳转游戏成功", name);
        }
        this.fail = () =>{
            if(this.node.parent.parent.name == "home"){
                if (configStore.ZJXJJ_FXCXLBY) {
                    // adSdk.hideBanner()
                    cc.loader.loadRes("Prefabs/Panel/otherGames/falseDialogGame", (err, spf) => {
                        var back = cc.instantiate(spf);
                        back.parent = cc.director.getScene().children[1].children[3].getChildByName("BeginView");
                        back.position = cc.v2(0, 667);
                        back.zIndex = 100000
                    })
                }
            }
        }
        // this.fail = () => {
        //     console.log(UIManager.clazzMap["MainPanel"])
        //     cc.instantiate(this.falseDialog).parent = UIManager.clazzMap["MainPanel"].node
        //     console.log("跳转游戏失败", name);
        // }
        this.Post("AdvertisingExposure", location_id, config_id, icon[0].iconid, "曝光")
        this.node.off(cc.Node.EventType.TOUCH_END);
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
           
            console.log("点击跳转", name);
            this.Post("AdvertisingClick", location_id, config_id, icon[0].iconid, "点击")
            GameBoxTool.navigate({ appid, path }, this.success, this.fail);
        });

        try {
            if (icon[0].type == 2) {

                this.addSprite(icon[0].icon)
                // console.log(icon[0].icon  ,"  icon[0].icon  ===== ==== ===")
            } else {
                let iconUrl = icon[0].icon
                GameBoxTool.loadIcon(iconUrl).then((res) => {
                    const tex: cc.Texture2D = res as cc.Texture2D;
                    this.icon.spriteFrame = new cc.SpriteFrame(tex);
                    // console.log(this.icon)
                    loaded && loaded();
                });
            }
        } catch (error) {
            console.log("加载互推游戏图片失败！", error);

        }
    }

    playTipAnimation() {
        this.node.runAction(cc.sequence(cc.delayTime(1), cc.rotateTo(.1, 10), cc.rotateTo(.2, -10), cc.rotateTo(.1, 0), cc.rotateTo(.1, 10), cc.rotateTo(.2, -10), cc.rotateTo(.1, 0), cc.rotateTo(.1, 10), cc.rotateTo(.2, -10), cc.rotateTo(.1, 0), cc.delayTime(3)).repeatForever());
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
}
