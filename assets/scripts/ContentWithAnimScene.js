

// var n = cc._decorator,
// a = n.ccclass,
// o = n.property,
// s = function (e) {
//     function t() {
//         var t = null !== e && e.apply(this, arguments) || this;
//         return t.progressBar = null, t.progressLabel = null, t.closeToLeftNode = null, t.closeToTopNode = null, t.closeToRightNode = null, t.closeToBottomNode = null, t._isShowed = !0, t._closeToLeftNodeShowPos = null, t._closeToLeftNodeHidePos = null, t._closeToTopNodeShowPos = null, t._closeToTopNodeHidePos = null, t._closeToRightNodeShowPos = null, t._closeToRightNodeHidePos = null, t._closeToBottomNodeShowPos = null, t._closeToBottomNodeHidePos = null, t;
//     }
//     return __extends(t, e), t.prototype.start = function () {
//         var e = this;
//         this.closeToLeftNode.getComponent(cc.Widget).updateAlignment(), this._closeToLeftNodeShowPos = this.closeToLeftNode.position, this._closeToLeftNodeHidePos = this.closeToLeftNode.position.sub(cc.v2(this.closeToLeftNode.width, 0)), this.closeToTopNode.getComponent(cc.Widget).updateAlignment(), this._closeToTopNodeShowPos = this.closeToTopNode.position, this._closeToTopNodeHidePos = this.closeToTopNode.position.add(cc.v2(0, this.closeToTopNode.height)), this.closeToRightNode.getComponent(cc.Widget).updateAlignment(), this._closeToRightNodeShowPos = this.closeToRightNode.position, this._closeToRightNodeHidePos = this.closeToRightNode.position.add(cc.v2(this.closeToRightNode.width, 0)), this.closeToBottomNode.getComponent(cc.Widget).updateAlignment(), this._closeToBottomNodeShowPos = this.closeToBottomNode.position, this._closeToBottomNodeHidePos = this.closeToBottomNode.position.sub(cc.v2(0, this.closeToBottomNode.height)), this.progressBar.totalLength = this.progressBar.node.width, this.progressBar.progress = 0, this.schedule(function () {
//             e.progressBar.progress > 1 && (e.progressBar.progress = 0), e.progressBar.progress = e.progressBar.progress + .01, e.progressLabel.string = "\u6B63\u5728\u52A0\u8F7D " + Math.floor(100 * e.progressBar.progress) + "%";
//         }, .1);
//     }, t.prototype.onClick = function () {
//         this._handleNodeShowOrHide(this.closeToLeftNode, this._closeToLeftNodeShowPos, this._closeToLeftNodeHidePos), this._handleNodeShowOrHide(this.closeToTopNode, this._closeToTopNodeShowPos, this._closeToTopNodeHidePos), this._handleNodeShowOrHide(this.closeToRightNode, this._closeToRightNodeShowPos, this._closeToRightNodeHidePos), this._handleNodeShowOrHide(this.closeToBottomNode, this._closeToBottomNodeShowPos, this._closeToBottomNodeHidePos), this._isShowed = !this._isShowed;
//     }, t.prototype._handleNodeShowOrHide = function (e, t, i) {
//         e.stopAllActions(), this._isShowed ? e.runAction(cc.moveTo(.32, i).easing(cc.easeCircleActionOut())) : e.runAction(cc.moveTo(.32, t).easing(cc.easeCircleActionOut()));
//     }, __decorate([o(cc.ProgressBar)], t.prototype, "progressBar", void 0), __decorate([o(cc.Label)], t.prototype, "progressLabel", void 0), __decorate([o(cc.Node)], t.prototype, "closeToLeftNode", void 0), __decorate([o(cc.Node)], t.prototype, "closeToTopNode", void 0), __decorate([o(cc.Node)], t.prototype, "closeToRightNode", void 0), __decorate([o(cc.Node)], t.prototype, "closeToBottomNode", void 0), t = __decorate([a], t);
// }(cc.Component)
var s=cc.Class({
    extends: cc.Component,
    properties: {
        
        progressBar:cc.ProgressBar, 
        progressLabel:cc.Label,
        peo:cc.Node,
        closeToLeftNode:cc.Node, 
        closeToTopNode:cc.Node, 
        closeToRightNode:cc.Node, 
        closeToBottomNode:cc.Node,
        
    },
    onLoad(){
        _isShowed = !0, 
        _closeToLeftNodeShowPos = null, 
        _closeToLeftNodeHidePos = null, 
        _closeToTopNodeShowPos = null, 
        _closeToTopNodeHidePos = null, 
        _closeToRightNodeShowPos = null, 
        _closeToRightNodeHidePos = null, 
        _closeToBottomNodeShowPos = null, 
        _closeToBottomNodeHidePos = null
    },
    start () {
        var e = this;
        this.closeToLeftNode.getComponent(cc.Widget).updateAlignment(), this._closeToLeftNodeShowPos = this.closeToLeftNode.position, this._closeToLeftNodeHidePos = this.closeToLeftNode.position.sub(cc.v2(this.closeToLeftNode.width, 0)), this.closeToTopNode.getComponent(cc.Widget).updateAlignment(), this._closeToTopNodeShowPos = this.closeToTopNode.position, this._closeToTopNodeHidePos = this.closeToTopNode.position.add(cc.v2(0, this.closeToTopNode.height)), this.closeToRightNode.getComponent(cc.Widget).updateAlignment(), this._closeToRightNodeShowPos = this.closeToRightNode.position, this._closeToRightNodeHidePos = this.closeToRightNode.position.add(cc.v2(this.closeToRightNode.width, 0)), this.closeToBottomNode.getComponent(cc.Widget).updateAlignment(), this._closeToBottomNodeShowPos = this.closeToBottomNode.position, this._closeToBottomNodeHidePos = this.closeToBottomNode.position.sub(cc.v2(0, this.closeToBottomNode.height)), this.progressBar.totalLength = this.progressBar.node.width, this.progressBar.progress = 0, this.schedule(function () {
            e.progressBar.progress > 1 && (e.progressBar.progress = 0), e.progressBar.progress = e.progressBar.progress + .01, e.progressLabel.string = "\u6B63\u5728\u52A0\u8F7D " + Math.floor(100 * e.progressBar.progress) + "%";
            
        }, .1);
    }, 
    onClick () {
        this._handleNodeShowOrHide(this.closeToLeftNode, this._closeToLeftNodeShowPos, this._closeToLeftNodeHidePos), this._handleNodeShowOrHide(this.closeToTopNode, this._closeToTopNodeShowPos, this._closeToTopNodeHidePos), this._handleNodeShowOrHide(this.closeToRightNode, this._closeToRightNodeShowPos, this._closeToRightNodeHidePos), this._handleNodeShowOrHide(this.closeToBottomNode, this._closeToBottomNodeShowPos, this._closeToBottomNodeHidePos), this._isShowed = !this._isShowed;
    }, 
    _handleNodeShowOrHide (e, t, i) {
        e.stopAllActions(), this._isShowed ? e.runAction(cc.moveTo(.32, i).easing(cc.easeCircleActionOut())) : e.runAction(cc.moveTo(.32, t).easing(cc.easeCircleActionOut()));
    }
})
module= s
/*ContentWithAnimScene: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "5e31fSL3KpBpbQXSbj3yr87", "ContentWithAnimScene"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            a = n.ccclass,
            o = n.property,
            s = function (e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.progressBar = null, t.progressLabel = null, t.closeToLeftNode = null, t.closeToTopNode = null, t.closeToRightNode = null, t.closeToBottomNode = null, t._isShowed = !0, t._closeToLeftNodeShowPos = null, t._closeToLeftNodeHidePos = null, t._closeToTopNodeShowPos = null, t._closeToTopNodeHidePos = null, t._closeToRightNodeShowPos = null, t._closeToRightNodeHidePos = null, t._closeToBottomNodeShowPos = null, t._closeToBottomNodeHidePos = null, t;
                }
                return __extends(t, e), t.prototype.start = function () {
                    var e = this;
                    this.closeToLeftNode.getComponent(cc.Widget).updateAlignment(), this._closeToLeftNodeShowPos = this.closeToLeftNode.position, this._closeToLeftNodeHidePos = this.closeToLeftNode.position.sub(cc.v2(this.closeToLeftNode.width, 0)), this.closeToTopNode.getComponent(cc.Widget).updateAlignment(), this._closeToTopNodeShowPos = this.closeToTopNode.position, this._closeToTopNodeHidePos = this.closeToTopNode.position.add(cc.v2(0, this.closeToTopNode.height)), this.closeToRightNode.getComponent(cc.Widget).updateAlignment(), this._closeToRightNodeShowPos = this.closeToRightNode.position, this._closeToRightNodeHidePos = this.closeToRightNode.position.add(cc.v2(this.closeToRightNode.width, 0)), this.closeToBottomNode.getComponent(cc.Widget).updateAlignment(), this._closeToBottomNodeShowPos = this.closeToBottomNode.position, this._closeToBottomNodeHidePos = this.closeToBottomNode.position.sub(cc.v2(0, this.closeToBottomNode.height)), this.progressBar.totalLength = this.progressBar.node.width, this.progressBar.progress = 0, this.schedule(function () {
                        e.progressBar.progress > 1 && (e.progressBar.progress = 0), e.progressBar.progress = e.progressBar.progress + .01, e.progressLabel.string = "\u6B63\u5728\u52A0\u8F7D " + Math.floor(100 * e.progressBar.progress) + "%";
                    }, .1);
                }, t.prototype.onClick = function () {
                    this._handleNodeShowOrHide(this.closeToLeftNode, this._closeToLeftNodeShowPos, this._closeToLeftNodeHidePos), this._handleNodeShowOrHide(this.closeToTopNode, this._closeToTopNodeShowPos, this._closeToTopNodeHidePos), this._handleNodeShowOrHide(this.closeToRightNode, this._closeToRightNodeShowPos, this._closeToRightNodeHidePos), this._handleNodeShowOrHide(this.closeToBottomNode, this._closeToBottomNodeShowPos, this._closeToBottomNodeHidePos), this._isShowed = !this._isShowed;
                }, t.prototype._handleNodeShowOrHide = function (e, t, i) {
                    e.stopAllActions(), this._isShowed ? e.runAction(cc.moveTo(.32, i).easing(cc.easeCircleActionOut())) : e.runAction(cc.moveTo(.32, t).easing(cc.easeCircleActionOut()));
                }, __decorate([o(cc.ProgressBar)], t.prototype, "progressBar", void 0), __decorate([o(cc.Label)], t.prototype, "progressLabel", void 0), __decorate([o(cc.Node)], t.prototype, "closeToLeftNode", void 0), __decorate([o(cc.Node)], t.prototype, "closeToTopNode", void 0), __decorate([o(cc.Node)], t.prototype, "closeToRightNode", void 0), __decorate([o(cc.Node)], t.prototype, "closeToBottomNode", void 0), t = __decorate([a], t);
            }(cc.Component);
        i.default = s, 
*/