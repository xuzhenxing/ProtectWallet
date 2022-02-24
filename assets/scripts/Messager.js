

 var n = function () {
    function e() {
        this.listeners = {};
    }
    return e.prototype.AddEventListener = function (e, t, i) {
        this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(new a(t, i));
    }, e.prototype.RemoveEventListener = function (e, t, i) {
        var n = this.listeners[e];
        if (n) {
            for (var a = n.length, o = 0; o < a; o++) {
                if (n[o].compar(i)) {
                    n.splice(o, 1);
                    break;
                }
            }
            0 == n.length && delete this.listeners[e];
        }
    }, e.prototype.dispatch = function (e) {
        for (var t = [], i = 1; i < arguments.length; i++) {
            t[i - 1] = arguments[i];
        }
        var n = this.listeners[e];
        if (n)
            for (var a = n.length, o = 0; o < a; o++) {
                var s = n[o];
                s.notify.apply(s, [e].concat(t));
            }
    }, e;
}();
window.messager = new n();
var a = function () {
    function e(e, t) {
        this.callback = null, this.context = null;
        this.callback = e, this.context = t;
    }
    return e.prototype.notify = function () {
        for (var e, t = [], i = 0; i < arguments.length; i++) {
            t[i] = arguments[i];
        }(e = this.callback).call.apply(e, [this.context].concat(t));
    }, e.prototype.compar = function (e) {
        return e == this.context;
    }, e;
}()

/*Messager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "8a8b7xqCFJAApmQ0cxROjF3", "Messager");
        var n = function () {
            function e() {
                this.listeners = {};
            }
            return e.prototype.AddEventListener = function (e, t, i) {
                this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(new a(t, i));
            }, e.prototype.RemoveEventListener = function (e, t, i) {
                var n = this.listeners[e];
                if (n) {
                    for (var a = n.length, o = 0; o < a; o++) {
                        if (n[o].compar(i)) {
                            n.splice(o, 1);
                            break;
                        }
                    }
                    0 == n.length && delete this.listeners[e];
                }
            }, e.prototype.dispatch = function (e) {
                for (var t = [], i = 1; i < arguments.length; i++) {
                    t[i - 1] = arguments[i];
                }
                var n = this.listeners[e];
                if (n)
                    for (var a = n.length, o = 0; o < a; o++) {
                        var s = n[o];
                        s.notify.apply(s, [e].concat(t));
                    }
            }, e;
        }();
        window.messager = new n();
        var a = function () {
            function e(e, t) {
                this.callback = null, this.context = null;
                this.callback = e, this.context = t;
            }
            return e.prototype.notify = function () {
                for (var e, t = [], i = 0; i < arguments.length; i++) {
                    t[i] = arguments[i];
                }(e = this.callback).call.apply(e, [this.context].concat(t));
            }, e.prototype.compar = function (e) {
                return e == this.context;
            }, e;
        }();
        
*/