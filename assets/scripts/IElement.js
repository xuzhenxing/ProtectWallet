

var n = require("IUpdateAttachIDispose"),
a = require("GameDefine");
cc.Class({
    extends: n,
    properties: {
        enabled: !1,
        isDispose: !1,
        isCanDestroy: !1,
        cacheNode: {
            get: function get() {
                return this._cacheNode;
            },
            set: function set(e) {
                this._cacheNode = e;
            }
        },
        name: {
            get: function get() {
                return this._name;
            },
            set: function set(e) {
                this._name = e;
            }
        },
        uid: {
            get: function get() {
                return this._uid;
            },
            set: function set(e) {
                this._uid = e;
            }
        },
        elementConfig: {
            get: function get() {
                return this._elementConfig;
            },
            set: function set(e) {
                this._elementConfig = e;
            }
        },
        model: {
            get: function get() {
                return this._model;
            },
            set: function set(e) {
                this._model = e;
            }
        },
        components: {
            get: function get() {
                return this._components;
            },
            set: function set(e) {
                this._components = e;
            }
        }
    },
    Init: function Init(e) {
        this.enabled = !0, this.isDispose = !1, this.elementConfig = e, this.uid = this.elementConfig.id, this.components = [], this.LoadModel();
    },
    LoadModel: function LoadModel() {
        this.cacheNode = new cc.Node(this.elementConfig.name + "_" + this.uid), this.cacheNode.parent = this.elementConfig.parent, this.cacheNode.scale = cc.Vec2.ONE, this.cacheNode.angle = this.elementConfig.rotation, this.cacheNode.position = this.elementConfig.position;
        var e = this,
            t = this.elementConfig.resourcePath,
            i = t.replace(/\//g, "#"),
            n = gm.CacheManager.GetCacheResource(a.CacheType.Model, i);
        null == n ? gm.AssetManager.LoadSingleAssetAsync(t, function (t) {
            var n = cc.instantiate(t);
            n.name = i, 1 != e.isDispose ? e.LoadComplete(n) : gm.CacheManager.CacheResource(a.CacheType.Model, n);
        }) : e.LoadComplete(n);
    },
    OnUpdate: function OnUpdate(e) {
        if (0 != this.enabled) {
            this._super(e);
            for (var t = this.components.length, i = 0; i < t; i++) {
                this.components[i].OnUpdate(e);
            }
        }
    },
    LoadComplete: function LoadComplete(e) {
        this.model = e, this.model.parent = this.cacheNode, this.model.position = new cc.Vec2(0, 0), this.model.scale = cc.Vec2.ONE, this.model.angle = 0;
    },
    SetPosition: function SetPosition(e) {
        this.cacheNode.position = e;
    },
    SetScale: function SetScale(e) {
        this.cacheNode.scale = e;
    },
    GetWorldPos: function GetWorldPos() {
        return this.cacheNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
    },
    SetParent: function SetParent(e, t) {
        this.cacheNode.parent = e, this.cacheNode.active = t;
    },
    SetRotation: function SetRotation(e) {
        this.cacheNode.angle = e;
    },
    OnBeginContact: function OnBeginContact(e, t, i) {},
    OnEndContact: function OnEndContact(e, t, i) {},
    OnPreSolve: function OnPreSolve(e, t, i) {},
    OnPostSolve: function OnPostSolve(e, t, i) {},
    Dispose: function Dispose() {
        if (1 != this.isDispose) {
            this._super();
            for (var e = this.components.length, t = 0; t < e; t++) {
                this.components[t].Dispose();
            }
            this.components = null, null != this.model && (this.model.stopAllActions(), gm.CacheManager.CacheResource(a.CacheType.Model, this.model)), this.cacheNode.destroy(), this.cacheNode = null, this.model = null, this.elementConfig = null, this.isDispose = !0, this.enabled = !1;
        }
    }
})
/*IElement: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "f074b9MWexB2JNJZ4pPrPUi", "IElement");
        var n = o(e("IUpdateAttachIDispose")),
            a = o(e("GameDefine"));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: n.default,
            properties: {
                enabled: !1,
                isDispose: !1,
                isCanDestroy: !1,
                cacheNode: {
                    get: function get() {
                        return this._cacheNode;
                    },
                    set: function set(e) {
                        this._cacheNode = e;
                    }
                },
                name: {
                    get: function get() {
                        return this._name;
                    },
                    set: function set(e) {
                        this._name = e;
                    }
                },
                uid: {
                    get: function get() {
                        return this._uid;
                    },
                    set: function set(e) {
                        this._uid = e;
                    }
                },
                elementConfig: {
                    get: function get() {
                        return this._elementConfig;
                    },
                    set: function set(e) {
                        this._elementConfig = e;
                    }
                },
                model: {
                    get: function get() {
                        return this._model;
                    },
                    set: function set(e) {
                        this._model = e;
                    }
                },
                components: {
                    get: function get() {
                        return this._components;
                    },
                    set: function set(e) {
                        this._components = e;
                    }
                }
            },
            Init: function Init(e) {
                this.enabled = !0, this.isDispose = !1, this.elementConfig = e, this.uid = this.elementConfig.id, this.components = [], this.LoadModel();
            },
            LoadModel: function LoadModel() {
                this.cacheNode = new cc.Node(this.elementConfig.name + "_" + this.uid), this.cacheNode.parent = this.elementConfig.parent, this.cacheNode.scale = cc.Vec2.ONE, this.cacheNode.angle = this.elementConfig.rotation, this.cacheNode.position = this.elementConfig.position;
                var e = this,
                    t = this.elementConfig.resourcePath,
                    i = t.replace(/\//g, "#"),
                    n = gm.CacheManager.GetCacheResource(a.default.CacheType.Model, i);
                null == n ? gm.AssetManager.LoadSingleAssetAsync(t, function (t) {
                    var n = cc.instantiate(t);
                    n.name = i, 1 != e.isDispose ? e.LoadComplete(n) : gm.CacheManager.CacheResource(a.default.CacheType.Model, n);
                }) : e.LoadComplete(n);
            },
            OnUpdate: function OnUpdate(e) {
                if (0 != this.enabled) {
                    this._super(e);
                    for (var t = this.components.length, i = 0; i < t; i++) {
                        this.components[i].OnUpdate(e);
                    }
                }
            },
            LoadComplete: function LoadComplete(e) {
                this.model = e, this.model.parent = this.cacheNode, this.model.position = new cc.Vec2(0, 0), this.model.scale = cc.Vec2.ONE, this.model.angle = 0;
            },
            SetPosition: function SetPosition(e) {
                this.cacheNode.position = e;
            },
            SetScale: function SetScale(e) {
                this.cacheNode.scale = e;
            },
            GetWorldPos: function GetWorldPos() {
                return this.cacheNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
            },
            SetParent: function SetParent(e, t) {
                this.cacheNode.parent = e, this.cacheNode.active = t;
            },
            SetRotation: function SetRotation(e) {
                this.cacheNode.angle = e;
            },
            OnBeginContact: function OnBeginContact(e, t, i) {},
            OnEndContact: function OnEndContact(e, t, i) {},
            OnPreSolve: function OnPreSolve(e, t, i) {},
            OnPostSolve: function OnPostSolve(e, t, i) {},
            Dispose: function Dispose() {
                if (1 != this.isDispose) {
                    this._super();
                    for (var e = this.components.length, t = 0; t < e; t++) {
                        this.components[t].Dispose();
                    }
                    this.components = null, null != this.model && (this.model.stopAllActions(), gm.CacheManager.CacheResource(a.default.CacheType.Model, this.model)), this.cacheNode.destroy(), this.cacheNode = null, this.model = null, this.elementConfig = null, this.isDispose = !0, this.enabled = !1;
                }
            }
        }), 
*/