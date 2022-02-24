export const isWechat = cc.sys.WECHAT_GAME === cc.sys.platform 

      
export const isBig = ():boolean => {
  if ((cc.view.getFrameSize().width / cc.view.getFrameSize().height) < 0.5) {
    return true
  }
  return false
}

export default {
  isWechat,
  isBig,
  ...cc.sys
}
