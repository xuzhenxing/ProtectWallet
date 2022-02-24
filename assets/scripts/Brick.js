


cc.Class({
    extends: cc.Component,
    properties: {
        Brick: cc.Sprite,
        Ash: cc.Sprite,
        Rip: cc.Sprite,
        Blood: cc.Integer
    },
    SetBrick: function SetBrick(e, t, i) {
        this.Blood = e, this.Brick.Sprite.spriteFrame = GameConfig.ItemsAltas.getSpriteFrame(t), this.Ash.Sprite.spriteFrame = GameConfig.ItemsAltas.getSpriteFrame(i), this.Rip.Sprite.spriteFrame = null;
    },
    BloodChange: function BloodChange(e) {
        this.Blood -= e, this.Rip.Sprite.spriteFrame = GameConfig.ItemsAltas.getSpriteFrame(storeItem.icon);
    }
})


/*Brick: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "9c6a5APllhLE7WGyNEjFMaL", "Brick"), cc.Class({
            extends: cc.Component,
            properties: {
                Brick: cc.Sprite,
                Ash: cc.Sprite,
                Rip: cc.Sprite,
                Blood: cc.Integer
            },
            SetBrick: function SetBrick(e, t, i) {
                this.Blood = e, this.Brick.Sprite.spriteFrame = GameConfig.ItemsAltas.getSpriteFrame(t), this.Ash.Sprite.spriteFrame = GameConfig.ItemsAltas.getSpriteFrame(i), this.Rip.Sprite.spriteFrame = null;
            },
            BloodChange: function BloodChange(e) {
                this.Blood -= e, this.Rip.Sprite.spriteFrame = GameConfig.ItemsAltas.getSpriteFrame(storeItem.icon);
            }
        }), 
*/