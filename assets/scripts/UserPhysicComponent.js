

cc.Class({
    extends: cc.Component,
    properties: {
        owner: null
    },
    Init: function Init(e) {
        this.owner = e;
    },
    onBeginContact: function onBeginContact(e, t, i) {
        null != this.owner && this.owner.OnBeginContact(e, t, i);
    },
    onEndContact: function onEndContact(e, t, i) {
        null != this.owner && this.owner.OnEndContact(e, t, i);
    },
    onPreSolve: function onPreSolve(e, t, i) {
        null != this.owner && this.owner.OnPreSolve(e, t, i);
    },
    onPostSolve: function onPostSolve(e, t, i) {
        null != this.owner && this.owner.OnPostSolve(e, t, i);
    },
    Dispose: function Dispose() {
        this.owner = null;
    }
})

/*UserPhysicComponent: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "9c18dKguv1KsLiZL192vijx", "UserPhysicComponent"), cc.Class({
            extends: cc.Component,
            properties: {
                owner: null
            },
            Init: function Init(e) {
                this.owner = e;
            },
            onBeginContact: function onBeginContact(e, t, i) {
                null != this.owner && this.owner.OnBeginContact(e, t, i);
            },
            onEndContact: function onEndContact(e, t, i) {
                null != this.owner && this.owner.OnEndContact(e, t, i);
            },
            onPreSolve: function onPreSolve(e, t, i) {
                null != this.owner && this.owner.OnPreSolve(e, t, i);
            },
            onPostSolve: function onPostSolve(e, t, i) {
                null != this.owner && this.owner.OnPostSolve(e, t, i);
            },
            Dispose: function Dispose() {
                this.owner = null;
            }
        }), 
*/