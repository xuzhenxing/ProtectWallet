export default class juHeEvent extends cc.Event {
    static EVENT_SHOW_JUHE_GAME = "showJuheGame"
    static EVENT_SHOW_HOT_GAME = "showHotGame"
    static EVENT_SHOW_FALSE_DIALOG_GAME = "showfalseDialogGame"
    constructor(e, n) {
        void 0 === n && (n = false)
        super(e, n)
    }
}