/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 4:06 PM
 * To change this template use File | Settings | File Templates.
 */

var keyKeyHitAssistance = function () {
    this.keyArray = new Array(300);
    var i;
    for (i = 0; i < this.keyArray.length; i += 1) {
        this.keyArray[i] = false;
    }
    this.setKeyDown = function (keyNum) {
        this.keyArray[keyNum] = true;
    };
    this.setKeyUp = function (keyNum) {
        this.keyArray[keyNum] = false;
    };
    this.isKeyDown = function (keyNum) {
        return this.keyArray[keyNum];
    };
};