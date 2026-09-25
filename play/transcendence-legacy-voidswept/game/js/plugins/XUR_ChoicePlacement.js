/*:
 * @plugindesc Alters the "Show Choice" window position regardless of the position type chosen within the engine (Left, Center, and Right).
 * @author Xurzerth
*/

//Determine the X and Y of window position.
Window_ChoiceList.prototype.updatePlacement = function() {
    var positionType = $gameMessage.choicePositionType();
    var messageY = this._messageWindow.y;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    this.x = 999 + 32 - this.width;
    this.y = 499 - this.height;
};