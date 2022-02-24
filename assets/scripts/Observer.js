
cc.Class({
    properties: {
        m_notifyMethod: null,
        m_notifyContext: null
    },
    Init: function Init(e, t) {
        this.m_notifyContext = t, this.m_notifyMethod = e;
    },
    NotifyObserver: function NotifyObserver(e) {
        this.m_notifyContext[this.m_notifyMethod](e);
    },
    CompareNotifyContext: function CompareNotifyContext(e) {
        return this.m_notifyContext === e;
    }
})


/*Observer: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "de7acF0p69M3IwFWUl1eJp+", "Observer"), cc.Class({
            properties: {
                m_notifyMethod: null,
                m_notifyContext: null
            },
            Init: function Init(e, t) {
                this.m_notifyContext = t, this.m_notifyMethod = e;
            },
            NotifyObserver: function NotifyObserver(e) {
                this.m_notifyContext[this.m_notifyMethod](e);
            },
            CompareNotifyContext: function CompareNotifyContext(e) {
                return this.m_notifyContext === e;
            }
        }), 
*/