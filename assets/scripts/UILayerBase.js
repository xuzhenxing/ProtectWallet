

cc.Class({
    initLayer: function initLayer() {
        this.uiLayerFunc(), this.uiPopLayerFunc(), this.uiStaticPopLayerFunc(), this.uiSysTipsLayerFunc(), this.uiToastLayerFunc();
    },
    uiLayerFunc: function uiLayerFunc() {
        var e = new cc.Node("uiLayer");
        this.addWidget(e);
        var t = e.addComponent("UILayer");
        game.uiLayer = t, game.canvas.addChild(e);
    },
    uiPopLayerFunc: function uiPopLayerFunc() {
        var e = new cc.Node("uiPopLayer");
        this.addWidget(e);
        var t = e.addComponent("UIPopLayer");
        game.uiPopLayer = t, game.canvas.addChild(e);
    },
    uiStaticPopLayerFunc: function uiStaticPopLayerFunc() {
        var e = new cc.Node("uiStaticPopLayer");
        this.addWidget(e);
        var t = e.addComponent("UIStaticPopLayer");
        game.uiStaticPopLayer = t, game.canvas.addChild(e);
    },
    uiSysTipsLayerFunc: function uiSysTipsLayerFunc() {
        var e = new cc.Node("uiSysTipsLayer");
        this.addWidget(e);
        var t = e.addComponent("UISysTipsLayer");
        game.uiSysTipsLayer = t, game.canvas.addChild(e);
    },
    uiToastLayerFunc: function uiToastLayerFunc() {
        var e = new cc.Node("uiToastLayer");
        this.addWidget(e);
        var t = e.addComponent("UIToastLayer");
        game.uiToastLayer = t, game.canvas.addChild(e);
    },
    addWidget: function addWidget(e) {
        e.width = 640, e.height = 1136;
        var t = e.addComponent(cc.Widget);
        t.left = 0, t.right = 0, t.top = 0, t.bottom = 0, t.alignMode = cc.Widget.AlignMode.ALWAYS, t.isAlignLeft = !0, t.isAlignRight = !0, t.isAlignTop = !0, t.isAlignBottom = !0;
    },
    Dispose: function Dispose() {
        delete game.uiLayer, delete game.uiPopLayer, delete game.uiStaticPopLayer, delete game.uiSysTipsLayer, delete game.uiToastLayer;
    }
})

/*UILayerBase: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "35c37aTLOxAEL59+xpcDl4Y", "UILayerBase"), cc.Class({
            initLayer: function initLayer() {
                this.uiLayerFunc(), this.uiPopLayerFunc(), this.uiStaticPopLayerFunc(), this.uiSysTipsLayerFunc(), this.uiToastLayerFunc();
            },
            uiLayerFunc: function uiLayerFunc() {
                var e = new cc.Node("uiLayer");
                this.addWidget(e);
                var t = e.addComponent("UILayer");
                game.uiLayer = t, game.canvas.addChild(e);
            },
            uiPopLayerFunc: function uiPopLayerFunc() {
                var e = new cc.Node("uiPopLayer");
                this.addWidget(e);
                var t = e.addComponent("UIPopLayer");
                game.uiPopLayer = t, game.canvas.addChild(e);
            },
            uiStaticPopLayerFunc: function uiStaticPopLayerFunc() {
                var e = new cc.Node("uiStaticPopLayer");
                this.addWidget(e);
                var t = e.addComponent("UIStaticPopLayer");
                game.uiStaticPopLayer = t, game.canvas.addChild(e);
            },
            uiSysTipsLayerFunc: function uiSysTipsLayerFunc() {
                var e = new cc.Node("uiSysTipsLayer");
                this.addWidget(e);
                var t = e.addComponent("UISysTipsLayer");
                game.uiSysTipsLayer = t, game.canvas.addChild(e);
            },
            uiToastLayerFunc: function uiToastLayerFunc() {
                var e = new cc.Node("uiToastLayer");
                this.addWidget(e);
                var t = e.addComponent("UIToastLayer");
                game.uiToastLayer = t, game.canvas.addChild(e);
            },
            addWidget: function addWidget(e) {
                e.width = 640, e.height = 1136;
                var t = e.addComponent(cc.Widget);
                t.left = 0, t.right = 0, t.top = 0, t.bottom = 0, t.alignMode = cc.Widget.AlignMode.ALWAYS, t.isAlignLeft = !0, t.isAlignRight = !0, t.isAlignTop = !0, t.isAlignBottom = !0;
            },
            Dispose: function Dispose() {
                delete game.uiLayer, delete game.uiPopLayer, delete game.uiStaticPopLayer, delete game.uiSysTipsLayer, delete game.uiToastLayer;
            }
        }), 
*/