window.__require=function e(t,n,o){function r(c,i){if(!n[c]){if(!t[c]){var s=c.split("/");if(s=s[s.length-1],!t[s]){var l="function"==typeof __require&&__require;if(!i&&l)return l(s,!0);if(a)return a(s,!0);throw new Error("Cannot find module '"+c+"'")}c=s}var u=n[c]={exports:{}};t[c][0].call(u.exports,function(e){return r(t[c][1][e]||e)},u,u.exports,e,t,n,o)}return n[c].exports}for(var a="function"==typeof __require&&__require,c=0;c<o.length;c++)r(o[c]);return r}({rank:[function(e,t,n){"use strict";cc._RF.push(t,"4a851MT7khBOamTEOZAUFjC","rank");var o=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=this&&this.__decorate||function(e,t,n,o){var r,a=arguments.length,c=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,o);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(a<3?r(c):a>3?r(t,n,c):r(t,n))||c);return a>3&&c&&Object.defineProperty(t,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var a=cc._decorator,c=a.ccclass,i=a.property,s=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.content=null,t.rankItem=null,t.ss="",t.buildRank=function(e){console.log(e),e.forEach(function(e,n){t.drawRankItemEx(n,e)})},t.dataSorter=function(e,n){console.log("%c%s","color: green","---[\u5b50\u57df]---",e,n),t.content.removeAllChildren();for(var o=e.sort(function(e,t){var n=Number(e.KVDataList[0].value);return Number(t.KVDataList[0].value)-n}),r=0;r<o.length;r++)if(o[r].avatarUrl==n[0].avatarUrl&&o[r].nickname==n[0].nickName){console.log("%c%s","color: green","---[\u5b50\u57df]---\u81ea\u5df1\u7684\u6570\u636e",o[r],r),t.ss=o[r].nickname;break}return t.buildRank(o)},t}return o(t,e),t.prototype.start=function(){},t.prototype.drawRankItemEx=function(e,t){var n=cc.instantiate(this.rankItem);console.log("datadata",t);var o=t.KVDataList[0].value,r="",a="",c="";o.length<8&&o.length>5?(r=o[0]+"",a=o[1],c=Number(o[2]+""+o[3]+o[4]+"."+o[5]+o[6]).toFixed(2)):o.length<5?(r=o[0]+"",a=o[1],c=Number(o[2]+".").toFixed(2)):8==o.length?(r=o[0]+""+o[1],a=o[2],c=Number(o[3]+""+o[4]+o[5]+"."+o[6]+o[7]).toFixed(2)):o.length>8&&o.length<11?(r=o[0]+""+o[1]+o[2],a=o[3],c=Number(o[4]+""+o[5]+o[6]+"."+o[7]+o[8]).toFixed(2)):(r=o[0]+""+o[1],a=o[2],c=Number(o[3]+""+o[4]+o[5]+"."+o[6]+o[7]).toFixed(2)),"NaN"==c&&(c=Number("0.").toFixed(2)),console.log(r,a,c),0==e?n.getChildByName("ranksp1").active=!0:1==e?n.getChildByName("ranksp2").active=!0:2==e?n.getChildByName("ranksp3").active=!0:(n.getChildByName("rank").active=!0,n.getChildByName("rank").getComponent(cc.Label).string=e+1),this.ss==t.nickname&&(n.getChildByName("rankBg").active=!0),n.getChildByName("name").getComponent(cc.Label).string=t.nickname.substr(0,8),n.getChildByName("Level").getChildByName("LevelLabel").getComponent(cc.Label).string=r+"-"+a,n.getChildByName("Right").getChildByName("RightLabel").getComponent(cc.Label).string=c+"%",cc.loader.load(t.avatarUrl+"?aaa=aa.jpg",function(e,t){e?console.log(e):n.getChildByName("headIcon").getComponent(cc.Sprite).spriteFrame=new cc.SpriteFrame(t)}),this.content.addChild(n),n.zIndex=1e6},r([i(cc.Node)],t.prototype,"content",void 0),r([i(cc.Prefab)],t.prototype,"rankItem",void 0),t=r([c],t)}(cc.Component);n.default=s,cc._RF.pop()},{}],sub:[function(e,t,n){"use strict";cc._RF.push(t,"246canAFv9N/rCklI/PR3xA","sub"),cc.Class({extends:cc.Component,properties:{rank:cc.Node},onLoad:function(){console.log("123456789");window.subNode=this,this.load()},submitScore:function(e){window.wx.getUserCloudStorage({keyList:["ALL"],success:function(t){0!=t.KVDataList.length&&console.log(t),window.wx.setUserCloudStorage({KVDataList:[{key:"ALL",value:""+e}],success:function(e){},fail:function(e){},complete:function(e){}})}})},load:function(){var e=this;window.wx&&window.wx.onMessage(function(t){o=0,console.log("%c%s","color: green","---[\u5b50\u57df]---","\u63a5\u53d7\u6d88\u606f",t),0==t.messageType?a(t.level):2===t.messageType?r():e.rank.active=!1})},showRank:function(){var e=this;console.log("showRank"),this.rank.active=!0,wx.getUserInfo({openIdList:["selfOpenId"],success:function(t){wx.getFriendCloudStorage({keyList:["ALL"],success:function(n){e.rank.getComponent("rank").dataSorter(n.data,t.data)},fail:function(e){console.log("\u7f51\u7edc\u52a0\u8f7d\u5931\u8d25",e)}})}})}});var o=0;function r(){window.subNode?window.subNode.showRank():++o<50&&setTimeout(function(){r()},500)}function a(e){console.log("\u63d0\u4ea4\u5f97\u5206",e),window.wx.getUserCloudStorage({keyList:["ALL"],success:function(t){0!=t.KVDataList.length&&console.log(t),window.wx.setUserCloudStorage({KVDataList:[{key:"ALL",value:""+e}],success:function(e){},fail:function(e){},complete:function(e){}})}})}cc._RF.pop()},{}]},{},["rank","sub"]);