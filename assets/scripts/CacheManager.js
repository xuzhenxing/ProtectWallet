var n=require("GameDefine")
cc.Class({
    extends: require("IDispose"),
    properties: {
        nodePools: null,
        activeNodePools: null,
        cachePools: null,
        node: null
    },
    Init: function Init(e) {
        this.node = new cc.Node("CacheManager"), this.node.parent = e.node, this.nodePools = new Array(), this.activeNodePools = new Array(), this.cachePools = new Array();
        for (var t = cc.Enum.getList(n.CacheType), i = t.length, a = 0; a < i; a++) {
            this.nodePools[t[a].value] = new Array(), this.activeNodePools[t[a].value] = new Array(), this.cachePools[t[a].value] = new cc.Node(t[a].value.toString()), this.cachePools[t[a].value].parent = this.node;
        }
    },
    AddActiveNode: function AddActiveNode(e, t) {
        var i = t.name;
        null != this.activeNodePools[e][i] ? this.activeNodePools[e][i].push(t) : (this.activeNodePools[e][i] = new Array(), this.activeNodePools[e][i].push(t));
    },
    GetCacheResource: function GetCacheResource(e, t, i) {
        var n = null;
        if (null != this.nodePools[e] && null != this.nodePools[e][t]) {
            var a = this.nodePools[e][t];
            if (a.length > 1) null != a[0] && cc.isValid(a[0]) ? (n = a[0], a.shift(), this.AddActiveNode(e, n)) : (a.shift(), n = this.GetCacheResource(e, t));
            else if (1 == a.length) {
                if (null == a[0] || !cc.isValid(a[0])) return a.shift(), null;
                (n = cc.instantiate(a[0])).name = a[0].name, this.AddActiveNode(e, n);
            }
        }
        return null != n && (null != i && (n.position = i), n.active = !0), n;
    },
    CacheResource: function CacheResource(e, t) {
        if (null != t && null != this.nodePools && null != this.nodePools[e]) {
            if (null == this.nodePools[e][t.name] && (this.nodePools[e][t.name] = new Array()), null != this.activeNodePools[e][t.name] && this.activeNodePools[e][t.name].indexOf(t) > -1) {
                var i = this.activeNodePools[e][t.name];
                i.splice(i.indexOf(t), 1);
            } - 1 == this.nodePools[e][t.name].indexOf(t) && this.nodePools[e][t.name].push(t), t.parent = this.cachePools[e].node,t.active = !1;
            
        }
    },
    Dispose: function Dispose() {
        for (var e in this.nodePools) {
            if (e != n.CacheType.DontDestroy && this.nodePools.hasOwnProperty(e)) {
                var t = this.nodePools[e];
                for (var i in t) {
                    if (t.hasOwnProperty(i)) t[i].forEach(function (e) {
                        null != e && cc.isValid(e) && e.destroy();
                    });
                }
            }
        }
        for (var a in this.activeNodePools) {
            if (a != n.CacheType.DontDestroy && this.activeNodePools.hasOwnProperty(a)) {
                var o = this.activeNodePools[a];
                for (var s in o) {
                    if (o.hasOwnProperty(s)) {
                        var r = o[s];
                        r.forEach(function (e) {
                            null != e && cc.isValid(e) && e.destroy();
                        }), r.splice(0, r.length);
                    }
                }
            }
        }
        for (var c in this.cachePools) {
            if (c != n.cacheType.DontDestroy)
                for (var l in this.nodePools[c]) {
                    if (this.nodePools[c].hasOwnProperty(l)) {
                        var u = this.nodePools[c][l];
                        u.splice(0, u.length);
                    }
                }
        }
    }
})


/*CacheManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "c9203Jm8bNBJYEAyUGjOKHY", "CacheManager");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("GameDefine"));
        cc.Class({
            extends: e("IDispose"),
            properties: {
                nodePools: null,
                activeNodePools: null,
                cachePools: null,
                node: null
            },
            Init: function Init(e) {
                this.node = new cc.Node("CacheManager"), this.node.parent = e.node, this.nodePools = new Array(), this.activeNodePools = new Array(), this.cachePools = new Array();
                for (var t = cc.Enum.getList(n.default.CacheType), i = t.length, a = 0; a < i; a++) {
                    this.nodePools[t[a].value] = new Array(), this.activeNodePools[t[a].value] = new Array(), this.cachePools[t[a].value] = new cc.Node(t[a].value.toString()), this.cachePools[t[a].value].parent = this.node;
                }
            },
            AddActiveNode: function AddActiveNode(e, t) {
                var i = t.name;
                null != this.activeNodePools[e][i] ? this.activeNodePools[e][i].push(t) : (this.activeNodePools[e][i] = new Array(), this.activeNodePools[e][i].push(t));
            },
            GetCacheResource: function GetCacheResource(e, t, i) {
                var n = null;
                if (null != this.nodePools[e] && null != this.nodePools[e][t]) {
                    var a = this.nodePools[e][t];
                    if (a.length > 1) null != a[0] && cc.isValid(a[0]) ? (n = a[0], a.shift(), this.AddActiveNode(e, n)) : (a.shift(), n = this.GetCacheResource(e, t));
                    else if (1 == a.length) {
                        if (null == a[0] || !cc.isValid(a[0])) return a.shift(), null;
                        (n = cc.instantiate(a[0])).name = a[0].name, this.AddActiveNode(e, n);
                    }
                }
                return null != n && (null != i && (n.position = i), n.active = !0), n;
            },
            CacheResource: function CacheResource(e, t) {
                if (null != t && null != this.nodePools && null != this.nodePools[e]) {
                    if (null == this.nodePools[e][t.name] && (this.nodePools[e][t.name] = new Array()), null != this.activeNodePools[e][t.name] && this.activeNodePools[e][t.name].indexOf(t) > -1) {
                        var i = this.activeNodePools[e][t.name];
                        i.splice(i.indexOf(t), 1);
                    } - 1 == this.nodePools[e][t.name].indexOf(t) && this.nodePools[e][t.name].push(t), t.parent = this.cachePools[e].node, t.active = !1;
                }
            },
            Dispose: function Dispose() {
                for (var e in this.nodePools) {
                    if (e != n.default.CacheType.DontDestroy && this.nodePools.hasOwnProperty(e)) {
                        var t = this.nodePools[e];
                        for (var i in t) {
                            if (t.hasOwnProperty(i)) t[i].forEach(function (e) {
                                null != e && cc.isValid(e) && e.destroy();
                            });
                        }
                    }
                }
                for (var a in this.activeNodePools) {
                    if (a != n.default.CacheType.DontDestroy && this.activeNodePools.hasOwnProperty(a)) {
                        var o = this.activeNodePools[a];
                        for (var s in o) {
                            if (o.hasOwnProperty(s)) {
                                var r = o[s];
                                r.forEach(function (e) {
                                    null != e && cc.isValid(e) && e.destroy();
                                }), r.splice(0, r.length);
                            }
                        }
                    }
                }
                for (var c in this.cachePools) {
                    if (c != n.default.cacheType.DontDestroy)
                        for (var l in this.nodePools[c]) {
                            if (this.nodePools[c].hasOwnProperty(l)) {
                                var u = this.nodePools[c][l];
                                u.splice(0, u.length);
                            }
                        }
                }
            }
        });
        
*/