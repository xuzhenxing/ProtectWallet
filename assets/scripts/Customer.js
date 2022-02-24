

var n =require("GameConfig"),
a = (require("GameDefine"),require("util"));
cc.Class({
    extends: require("IElement"),
    properties: {
        FactoryId: 0,
        BussinessIndex: 0,
        SeatIndex: 0,
        GoodsId: 0,
        GoodsConfig: null,
        BuffCom: null,
        ProperCom: null,
        State: null,
        StartEatTime: -1,
        EatCompleteTime: -1,
        GetDishesTime: -1,
        CurGoods: null,
        EatCount: 0,
        ExitPos: null,
        EnterPos: null,
        Paths: null,
        Speed: 10
    },
    Init: function Init(e) {
        this._super(e), this.FactoryId = e.factoryId, this.BussinessIndex = e.bussinessIndex, this.SeatIndex = e.seatIndex, this.Speed = n.default.CustomerMoveSpeed;
    },
    OnUpdate: function OnUpdate(e) {
        this.State == n.CustomerState.Enter ? this.UpdateStateEnter(e) : this.State == n.CustomerState.WaitEat ? this.UpdateStateWaitEat(e) : this.State == n.CustomerState.Eating ? this.UpdateStateEating(e) : this.State == n.CustomerState.EatFinish ? this.UpdateStateEatFinish(e) : this.State == n.CustomerState.Leave && this.UpdateStateLeave(e);
    },
    SetState: function SetState(e) {
        this.State = e, this.State == n.CustomerState.Enter ? this.EnterStateEnter() : this.State == n.CustomerState.WaitEat ? this.EnterStateWaitEat() : this.State == n.CustomerState.Eating ? this.EnterStateEating() : this.State == n.CustomerState.EatFinish ? this.EnterStateEatFinish() : this.State == n.CustomerState.Leave && this.EnterStateLeave();
    },
    EnterStateEnter: function EnterStateEnter() {
        this.Paths = new Array();
        var e = this.cacheNode.parent.convertToNodeSpaceAR(gm.BattlePlayManager.GetSeatPos(this.FactoryId, this.BussinessIndex, this.SeatIndex)),
            t = new cc.Vec2(e.x, this.cacheNode.position.y);
        this.Paths[0] = t, this.Paths[1] = e, this.SeatIndex <= 4 ? this.Paths[1] = this.Paths[1].add(new cc.Vec2(0, 20)) : this.Paths[1] = this.Paths[1].add(new cc.Vec2(0, -20));
    },
    EnterStateWaitEat: function EnterStateWaitEat() {
        gm.DataBase.UpgradeSeatState(this.FactoryId, this.BussinessIndex, this.SeatIndex, 1);
    },
    EnterStateEating: function EnterStateEating() {
        this.GetDishesTime = n.GetDishesTime, this.StartEatTime = -1, this.EatFinish = -1, this.EatCount += 1;
    },
    EnterStateEatFinish: function EnterStateEatFinish() {},
    EnterStateLeave: function EnterStateLeave() {
        this.Paths = new Array(), this.ExitPos = this.cacheNode.parent.convertToNodeSpaceAR(gm.BattlePlayManager.GetCustomerPath(this.FactoryId, this.BussinessIndex, this.GetCustomerRow(), 1));
        var e = new cc.Vec2(this.cacheNode.position.x, this.ExitPos.y);
        this.Paths[0] = e, this.Paths[1] = this.ExitPos, gm.BattlePlayManager.ChangeSeatState(this.FactoryId, this.BussinessIndex, this.SeatIndex, !0), gm.DataBase.UpgradeSeatState(this.FactoryId, this.BussinessIndex, this.SeatIndex, 0);
    },
    UpdateStateEnter: function UpdateStateEnter(e) {
        if (null != this.Paths && this.Paths.length > 0) {
            var t = this.Paths[0],
                i = t.sub(this.cacheNode.position),
                o = i.normalize();
            this.cacheNode.angle = a.getDegree(o) - 90;
            var s = o.mul(this.Speed * e);
            i.mag() <= s.mag() ? (this.Paths.shift(), this.cacheNode.position = t) : this.cacheNode.position = this.cacheNode.position.add(s);
        } else gm.BattlePlayManager.ChangeSeatState(this.FactoryId, this.BussinessIndex, this.SeatIndex, !1), this.SetState(n.CustomerState.WaitEat);
    },
    GetCustomerRow: function GetCustomerRow() {
        return this.SeatIndex <= 4 ? 0 : 1;
    },
    GetCustomerEatPos: function GetCustomerEatPos() {
        return 0 == this.GetCustomerRow() ? this.cacheNode.parent.position.add(cc.Vec2.UP.mul(-25)) : this.cacheNode.parent.position.add(cc.Vec2.UP.mul(25));
    },
    UpdateStateWaitEat: function UpdateStateWaitEat(e) {
        var t = this.GetCustomerRow();
        this.CurGoods = gm.BattlePlayManager.GetEatGoods(this.FactoryId, this.BussinessIndex, t, 10, this.cacheNode.parent.position), null != this.CurGoods && (this.CurGoods.SendCustomer(this), this.SetState(n.CustomerState.Eating));
    },
    UpdateStateEating: function UpdateStateEating(e) {
        this.GetDishesTime > 0 ? (this.GetDishesTime -= e, this.StartEatTime = n.EatTime) : this.StartEatTime > 0 ? (this.StartEatTime -= e, this.StartEatTime <= 0 && (this.CurGoods.Sale(), this.CurGoods = null, this.EatFinish = n.EatFinishTime)) : this.EatFinish > 0 && (this.EatFinish -= e, this.EatFinish <= 0 && (this.EatCount < n.EatCount ? this.SetState(n.CustomerState.WaitEat) : this.SetState(n.CustomerState.Leave)));
    },
    UpdateStateEatFinish: function UpdateStateEatFinish(e) {},
    UpdateStateLeave: function UpdateStateLeave(e) {
        if (null != this.Paths && this.Paths.length > 0) {
            var t = this.Paths[0],
                i = t.sub(this.cacheNode.position),
                n = i.normalize();
            this.cacheNode.angle = a.getDegree(n) - 90;
            var o = n.mul(this.Speed * e * 5);
            i.mag() <= o.mag() ? (this.Paths.shift(), this.cacheNode.position = t) : this.cacheNode.position = this.cacheNode.position.add(o);
        } else gm.BattlePlayManager.RemoveCustomer(this);
    }
})

/*Customer: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "ceefdaWJflEjJTxMRdVW2OU", "Customer");
        var n = o(e("GameConfig")),
            a = (o(e("GameDefine")), o(e("util")));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: e("IElement"),
            properties: {
                FactoryId: 0,
                BussinessIndex: 0,
                SeatIndex: 0,
                GoodsId: 0,
                GoodsConfig: null,
                BuffCom: null,
                ProperCom: null,
                State: null,
                StartEatTime: -1,
                EatCompleteTime: -1,
                GetDishesTime: -1,
                CurGoods: null,
                EatCount: 0,
                ExitPos: null,
                EnterPos: null,
                Paths: null,
                Speed: 10
            },
            Init: function Init(e) {
                this._super(e), this.FactoryId = e.factoryId, this.BussinessIndex = e.bussinessIndex, this.SeatIndex = e.seatIndex, this.Speed = n.default.CustomerMoveSpeed;
            },
            OnUpdate: function OnUpdate(e) {
                this.State == n.default.CustomerState.Enter ? this.UpdateStateEnter(e) : this.State == n.default.CustomerState.WaitEat ? this.UpdateStateWaitEat(e) : this.State == n.default.CustomerState.Eating ? this.UpdateStateEating(e) : this.State == n.default.CustomerState.EatFinish ? this.UpdateStateEatFinish(e) : this.State == n.default.CustomerState.Leave && this.UpdateStateLeave(e);
            },
            SetState: function SetState(e) {
                this.State = e, this.State == n.default.CustomerState.Enter ? this.EnterStateEnter() : this.State == n.default.CustomerState.WaitEat ? this.EnterStateWaitEat() : this.State == n.default.CustomerState.Eating ? this.EnterStateEating() : this.State == n.default.CustomerState.EatFinish ? this.EnterStateEatFinish() : this.State == n.default.CustomerState.Leave && this.EnterStateLeave();
            },
            EnterStateEnter: function EnterStateEnter() {
                this.Paths = new Array();
                var e = this.cacheNode.parent.convertToNodeSpaceAR(gm.BattlePlayManager.GetSeatPos(this.FactoryId, this.BussinessIndex, this.SeatIndex)),
                    t = new cc.Vec2(e.x, this.cacheNode.position.y);
                this.Paths[0] = t, this.Paths[1] = e, this.SeatIndex <= 4 ? this.Paths[1] = this.Paths[1].add(new cc.Vec2(0, 20)) : this.Paths[1] = this.Paths[1].add(new cc.Vec2(0, -20));
            },
            EnterStateWaitEat: function EnterStateWaitEat() {
                gm.DataBase.UpgradeSeatState(this.FactoryId, this.BussinessIndex, this.SeatIndex, 1);
            },
            EnterStateEating: function EnterStateEating() {
                this.GetDishesTime = n.default.GetDishesTime, this.StartEatTime = -1, this.EatFinish = -1, this.EatCount += 1;
            },
            EnterStateEatFinish: function EnterStateEatFinish() {},
            EnterStateLeave: function EnterStateLeave() {
                this.Paths = new Array(), this.ExitPos = this.cacheNode.parent.convertToNodeSpaceAR(gm.BattlePlayManager.GetCustomerPath(this.FactoryId, this.BussinessIndex, this.GetCustomerRow(), 1));
                var e = new cc.Vec2(this.cacheNode.position.x, this.ExitPos.y);
                this.Paths[0] = e, this.Paths[1] = this.ExitPos, gm.BattlePlayManager.ChangeSeatState(this.FactoryId, this.BussinessIndex, this.SeatIndex, !0), gm.DataBase.UpgradeSeatState(this.FactoryId, this.BussinessIndex, this.SeatIndex, 0);
            },
            UpdateStateEnter: function UpdateStateEnter(e) {
                if (null != this.Paths && this.Paths.length > 0) {
                    var t = this.Paths[0],
                        i = t.sub(this.cacheNode.position),
                        o = i.normalize();
                    this.cacheNode.angle = a.default.getDegree(o) - 90;
                    var s = o.mul(this.Speed * e);
                    i.mag() <= s.mag() ? (this.Paths.shift(), this.cacheNode.position = t) : this.cacheNode.position = this.cacheNode.position.add(s);
                } else gm.BattlePlayManager.ChangeSeatState(this.FactoryId, this.BussinessIndex, this.SeatIndex, !1), this.SetState(n.default.CustomerState.WaitEat);
            },
            GetCustomerRow: function GetCustomerRow() {
                return this.SeatIndex <= 4 ? 0 : 1;
            },
            GetCustomerEatPos: function GetCustomerEatPos() {
                return 0 == this.GetCustomerRow() ? this.cacheNode.parent.position.add(cc.Vec2.UP.mul(-25)) : this.cacheNode.parent.position.add(cc.Vec2.UP.mul(25));
            },
            UpdateStateWaitEat: function UpdateStateWaitEat(e) {
                var t = this.GetCustomerRow();
                this.CurGoods = gm.BattlePlayManager.GetEatGoods(this.FactoryId, this.BussinessIndex, t, 10, this.cacheNode.parent.position), null != this.CurGoods && (this.CurGoods.SendCustomer(this), this.SetState(n.default.CustomerState.Eating));
            },
            UpdateStateEating: function UpdateStateEating(e) {
                this.GetDishesTime > 0 ? (this.GetDishesTime -= e, this.StartEatTime = n.default.EatTime) : this.StartEatTime > 0 ? (this.StartEatTime -= e, this.StartEatTime <= 0 && (this.CurGoods.Sale(), this.CurGoods = null, this.EatFinish = n.default.EatFinishTime)) : this.EatFinish > 0 && (this.EatFinish -= e, this.EatFinish <= 0 && (this.EatCount < n.default.EatCount ? this.SetState(n.default.CustomerState.WaitEat) : this.SetState(n.default.CustomerState.Leave)));
            },
            UpdateStateEatFinish: function UpdateStateEatFinish(e) {},
            UpdateStateLeave: function UpdateStateLeave(e) {
                if (null != this.Paths && this.Paths.length > 0) {
                    var t = this.Paths[0],
                        i = t.sub(this.cacheNode.position),
                        n = i.normalize();
                    this.cacheNode.angle = a.default.getDegree(n) - 90;
                    var o = n.mul(this.Speed * e * 5);
                    i.mag() <= o.mag() ? (this.Paths.shift(), this.cacheNode.position = t) : this.cacheNode.position = this.cacheNode.position.add(o);
                } else gm.BattlePlayManager.RemoveCustomer(this);
            }
        }), 
*/