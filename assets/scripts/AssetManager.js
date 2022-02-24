var n = require("GameDefine")
var a = cc.Class({
    extends: require("IDispose"),
    properties: {
        resourcePath: null,
        progressCallback: null,
        callback: null,
        isLocalLoad: !1,
        loadWay: null,
        resourceType: null,
        loadId: 0
    },
    statics: {
        staticLoadId: 0
    },
    Init: function Init(e, t, i, n, o, s) {
        this.resourcePath = e,
            this.progressCallback = t,
            a.staticLoadId += 1,
            this.loadId = a.staticLoadId,
            this.callback = i,
            this.isLocalLoad = n,
            this.loadWay = o,
            this.resourceType = s;
    },
    StartLoad: function StartLoad() {
        // debugger
        if (this.isLocalLoad || n.GameLoadModel == n.LoadModel.Local) {
            if (this.loadWay == n.LoadWay.Single) {
                if (null == this.resourceType) {
                    cc.loader.loadRes(this.resourcePath, this.LoadProgress.bind(this), this.LoadComplete.bind(this))
                    //  cc.loader.loadRes(this.resourcePath, this.resourceType, this.LoadComplete.bind(this))
                } else {
                    cc.loader.loadRes(this.resourcePath, this.resourceType, this.LoadComplete.bind(this))
                }
            } else {
                if (this.loadWay == n.LoadWay.Mutil) {
                    cc.loader.loadResArray(this.resourcePath, this.LoadProgress.bind(this), this.LoadComplete.bind(this))
                } else {
                    if (this.loadWay == n.LoadWay.Dir) {
                        cc.loader.loadResDir(this.resourcePath, this.LoadProgress.bind(this), this.LoadComplete.bind(this))
                    }
                }
            }
        } else {
            if (null == this.resourceType) {
                cc.loader.load(this.resourcePath, this.LoadProgress.bind(this), this.LoadComplete.bind(this))
            } else {
                cc.loader.load({
                    url: this.resourcePath,
                    type: this.resourceType
                }, this.LoadProgress.bind(this), this.LoadComplete.bind(this));
            }
        }

        // this.isLocalLoad || n.GameLoadModel == n.LoadModel.Local ?
        //     this.loadWay == n.LoadWay.Single ?
        //     null == this.resourceType ?
        //     cc.loader.loadRes(this.resourcePath, this.LoadProgress.bind(this), this.LoadComplete.bind(this)) :
        //     cc.loader.loadRes(this.resourcePath, this.resourceType, this.LoadComplete.bind(this)) :
        //     this.loadWay == n.LoadWay.Mutil ?
        //     cc.loader.loadResArray(this.resourcePath, this.LoadProgress.bind(this), this.LoadComplete.bind(this)) :
        //     this.loadWay == n.LoadWay.Dir &&
        //     cc.loader.loadResDir(this.resourcePath, this.LoadProgress.bind(this), this.LoadComplete.bind(this)) :
        //     null == this.resourceType ?
        //     cc.loader.load(this.resourcePath, this.LoadProgress.bind(this), this.LoadComplete.bind(this)) :
        //     cc.loader.load({
        //         url: this.resourcePath,
        //         type: this.resourceType
        //     }, this.LoadProgress.bind(this), this.LoadComplete.bind(this));
    },
    LoadProgress: function LoadProgress(e, t, i) {
        null != this.progressCallback && this.progressCallback(this.loadId, this.resourcePath, e, t, i);
    },
    LoadComplete: function LoadComplete(e, t) {
        null != this.callback && this.callback(this.loadId, this.resourcePath, t);
    },
    Dispose: function Dispose() {
        this.progressCallback = null, this.callback = null;
    }
});
cc.Class({
    extends: require("IUpdateAttachIDispose"),
    properties: {
        cacheMap: null,
        loadMap: null,
        gameApp: null
    },
    Init: function Init(e) {
        this.cacheMap = new Array(), this.loadMap = new Array(), this.gameApp = e;
    },
    LoadLocalAssetAsync: function LoadLocalAssetAsync(e, t, i) {
        if (null == this.cacheMap[e]) {
            var o = new a();
            o.Init(e, this.ProgressLoadComplete.bind(this), this.LoadComplete.bind(this), !0, n.LoadWay.Single, i), this.loadMap[o.loadId] = {
                path: e,
                callback: t
            }, o.StartLoad();
        } else t(this.cacheMap[e]);
    },
    LoadSingleAssetAsync: function LoadSingleAssetAsync(e, t, i) {
        if (null == this.cacheMap[e]) {
            var o = new a();
            o.Init(e, this.ProgressLoadComplete.bind(this), this.LoadComplete.bind(this), !1, n.LoadWay.Single, i), this.loadMap[o.loadId] = {
                path: e,
                callback: t
            }, o.StartLoad();
        } else t(this.cacheMap[e]);
    },
    LoadMutilAssetAsync: function LoadMutilAssetAsync(e, t, i) {
        for (var o = [], s = e.length - 1; s >= 0; s--) {
            var r = this.cacheMap.indexOf(e[s]);
            r > -1 && (o[o.length] = e[s], e.splice(r, 1));
        }
        var c = new a();
        c.Init(e, this.ProgressLoadComplete.bind(this), this.LoadComplete.bind(this), !1, n.LoadWay.Mutil, null), this.loadMap[c.loadId] = {
            path: path,
            progressCallback: t,
            callback: i,
            existPaths: o
        }, c.StartLoad();
    },
    ProgressLoadComplete: function ProgressLoadComplete(e, t, i, n, a) {
        var o = this.loadMap[e];
        null != o && null != o.progressCallback && o.progressCallback(i, n, a);
    },
    LoadComplete: function LoadComplete(e, t, i) {
        var n = this.loadMap[e];
        if (null != n && null != n.callback) {
            if (i.hasOwnProperty("length")) {
                for (var a = i.length, o = 0; o < a; o++) {
                    this.cacheMap[t[o]] = i[0];
                }
                if (null != n.existPaths) {
                    var s = n.existPaths.length;
                    for (o = 0; o < s; o++) {
                        i.push(this.cacheMap[n.existPaths[o]]);
                    }
                }
            } else this.cacheMap[t] = i;
            n.callback(i), delete this.loadMap[e];
        }
    },
    OnUpdate: function OnUpdate(e) {},
    ReleaseCacheResource: function ReleaseCacheResource() {
        for (var e in this.cacheMap) {
            cc.loader.releaseAsset(this.cacheMap[e]);
        }
        this.cacheMap = new Array();
    },
    Dispose: function Dispose() {}
})


/*AssetManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "51c5d1bgJVF344uSEzQ67Q7", "AssetManager");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("GameDefine"));
        var a = cc.Class({
            extends: e("IDispose"),
            properties: {
                resourcePath: null,
                progressCallback: null,
                callback: null,
                isLocalLoad: !1,
                loadWay: null,
                resourceType: null,
                loadId: 0
            },
            statics: {
                staticLoadId: 0
            },
            Init: function Init(e, t, i, n, o, s) {
                this.resourcePath = e, this.progressCallback = t, a.staticLoadId += 1, this.loadId = a.staticLoadId, this.callback = i, this.isLocalLoad = n, this.loadWay = o, this.resourceType = s;
            },
            StartLoad: function StartLoad() {
                this.isLocalLoad || n.default.GameLoadModel == n.default.LoadModel.Local ? this.loadWay == n.default.LoadWay.Single ? null == this.resourceType ? cc.loader.loadRes(this.resourcePath, this.LoadProgress.bind(this), this.LoadComplete.bind(this)) : cc.loader.loadRes(this.resourcePath, this.resourceType, this.LoadComplete.bind(this)) : this.loadWay == n.default.LoadWay.Mutil ? cc.loader.loadResArray(this.resourcePath, this.LoadProgress.bind(this), this.LoadComplete.bind(this)) : this.loadWay == n.default.LoadWay.Dir && cc.loader.loadResDir(this.resourcePath, this.LoadProgress.bind(this), this.LoadComplete.bind(this)) : null == this.resourceType ? cc.loader.load(this.resourcePath, this.LoadProgress.bind(this), this.LoadComplete.bind(this)) : cc.loader.load({
                    url: this.resourcePath,
                    type: this.resourceType
                }, this.LoadProgress.bind(this), this.LoadComplete.bind(this));
            },
            LoadProgress: function LoadProgress(e, t, i) {
                null != this.progressCallback && this.progressCallback(this.loadId, this.resourcePath, e, t, i);
            },
            LoadComplete: function LoadComplete(e, t) {
                null != this.callback && this.callback(this.loadId, this.resourcePath, t);
            },
            Dispose: function Dispose() {
                this.progressCallback = null, this.callback = null;
            }
        });
        cc.Class({
            extends: e("IUpdateAttachIDispose"),
            properties: {
                cacheMap: null,
                loadMap: null,
                gameApp: null
            },
            Init: function Init(e) {
                this.cacheMap = new Array(), this.loadMap = new Array(), this.gameApp = e;
            },
            LoadLocalAssetAsync: function LoadLocalAssetAsync(e, t, i) {
                if (null == this.cacheMap[e]) {
                    var o = new a();
                    o.Init(e, this.ProgressLoadComplete.bind(this), this.LoadComplete.bind(this), !0, n.default.LoadWay.Single, i), this.loadMap[o.loadId] = {
                        path: e,
                        callback: t
                    }, o.StartLoad();
                } else t(this.cacheMap[e]);
            },
            LoadSingleAssetAsync: function LoadSingleAssetAsync(e, t, i) {
                if (null == this.cacheMap[e]) {
                    var o = new a();
                    o.Init(e, this.ProgressLoadComplete.bind(this), this.LoadComplete.bind(this), !1, n.default.LoadWay.Single, i), this.loadMap[o.loadId] = {
                        path: e,
                        callback: t
                    }, o.StartLoad();
                } else t(this.cacheMap[e]);
            },
            LoadMutilAssetAsync: function LoadMutilAssetAsync(e, t, i) {
                for (var o = [], s = e.length - 1; s >= 0; s--) {
                    var r = this.cacheMap.indexOf(e[s]);
                    r > -1 && (o[o.length] = e[s], e.splice(r, 1));
                }
                var c = new a();
                c.Init(e, this.ProgressLoadComplete.bind(this), this.LoadComplete.bind(this), !1, n.default.LoadWay.Mutil, null), this.loadMap[c.loadId] = {
                    path: path,
                    progressCallback: t,
                    callback: i,
                    existPaths: o
                }, c.StartLoad();
            },
            ProgressLoadComplete: function ProgressLoadComplete(e, t, i, n, a) {
                var o = this.loadMap[e];
                null != o && null != o.progressCallback && o.progressCallback(i, n, a);
            },
            LoadComplete: function LoadComplete(e, t, i) {
                var n = this.loadMap[e];
                if (null != n && null != n.callback) {
                    if (i.hasOwnProperty("length")) {
                        for (var a = i.length, o = 0; o < a; o++) {
                            this.cacheMap[t[o]] = i[0];
                        }
                        if (null != n.existPaths) {
                            var s = n.existPaths.length;
                            for (o = 0; o < s; o++) {
                                i.push(this.cacheMap[n.existPaths[o]]);
                            }
                        }
                    } else this.cacheMap[t] = i;
                    n.callback(i), delete this.loadMap[e];
                }
            },
            OnUpdate: function OnUpdate(e) {},
            ReleaseCacheResource: function ReleaseCacheResource() {
                for (var e in this.cacheMap) {
                    cc.loader.releaseAsset(this.cacheMap[e]);
                }
                this.cacheMap = new Array();
            },
            Dispose: function Dispose() {}
        }), 
*/