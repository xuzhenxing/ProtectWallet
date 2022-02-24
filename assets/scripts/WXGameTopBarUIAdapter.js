

//  var n = cc._decorator,
//  a = n.ccclass,
//  o = (n.property, function (e) {
//      function t() {
//          return null !== e && e.apply(this, arguments) || this;
//      }
//      return __extends(t, e), t.prototype.start = function () {
//          console.log("CC_WECHATGAME"), console.log(CC_WECHATGAME), this.ReSize();
//      }, t.prototype.ReSize = function () {
//          if (CC_WECHATGAME) {
//              var e = wx.getMenuButtonBoundingClientRect();
//              if (console.log("menuInfo"), console.log(e), 0 == e.top) return void this.scheduleOnce(function () {
//                  this.ReSize();
//              }.bind(this), .1);
//              var t = wx.getSystemInfoSync();
//              console.log("systemInfo"), console.log(t);
//              var i = this.node.parent.height * (e.top / t.screenHeight);
//              console.log("paddingTop"), console.log(i), this.node.height = this.node.parent.height * (e.height / t.screenHeight), console.log("this.node.height"), console.log(this.node.height);
//              var n = this.node.getComponent(cc.Widget);
//              n.top = i, n.isAbsoluteTop = !0, n.isAlignTop = !0, n.updateAlignment();
//          }
//      }, t = __decorate([a], t);
//  }(cc.Component))
 var o=cc.Class({
    extends: cc.Component,
    start() {
        console.log("CC_WECHATGAME"), console.log(CC_WECHATGAME), this.ReSize();
    },
    ReSize() {
        if (CC_WECHATGAME) {
            var e = wx.getMenuButtonBoundingClientRect();
            if (console.log("menuInfo"), console.log(e), 0 == e.top) return void this.scheduleOnce(function () {
                this.ReSize();
            }.bind(this), .1);
            var t = wx.getSystemInfoSync();
            console.log("systemInfo"), console.log(t);
            var i = this.node.parent.height * (e.top / t.screenHeight);
            console.log("paddingTop"), console.log(i), this.node.height = this.node.parent.height * (e.height / t.screenHeight), console.log("this.node.height"), console.log(this.node.height);
            var n = this.node.getComponent(cc.Widget);
            n.top = i, n.isAbsoluteTop = !0, n.isAlignTop = !0, n.updateAlignment();
        }
    }
 })
module.exports = o
/*WXGameTopBarUIAdapter: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "67c2c6xCyFMDoklwx+K/nGz", "WXGameTopBarUIAdapter"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            a = n.ccclass,
            o = (n.property, function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                return __extends(t, e), t.prototype.start = function () {
                    console.log("CC_WECHATGAME"), console.log(CC_WECHATGAME), this.ReSize();
                }, t.prototype.ReSize = function () {
                    if (CC_WECHATGAME) {
                        var e = wx.getMenuButtonBoundingClientRect();
                        if (console.log("menuInfo"), console.log(e), 0 == e.top) return void this.scheduleOnce(function () {
                            this.ReSize();
                        }.bind(this), .1);
                        var t = wx.getSystemInfoSync();
                        console.log("systemInfo"), console.log(t);
                        var i = this.node.parent.height * (e.top / t.screenHeight);
                        console.log("paddingTop"), console.log(i), this.node.height = this.node.parent.height * (e.height / t.screenHeight), console.log("this.node.height"), console.log(this.node.height);
                        var n = this.node.getComponent(cc.Widget);
                        n.top = i, n.isAbsoluteTop = !0, n.isAlignTop = !0, n.updateAlignment();
                    }
                }, t = __decorate([a], t);
            }(cc.Component));
        i.default = o, 
*/