/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/4/12
 * Time: 2:58 AM
 * To change this template use File | Settings | File Templates.
 */
var backgroundSprite = cc.Sprite.extend({
    degree : 0,
    ctor : function (parent, imgPath, position_abs, interval) {
        this.initWithFile(imgPath);
        parent.addChild(this);
        this.setPosition(position_abs);
        /*this.schedule(function () {
            this.setRotation(this.degree);
            this.degree += 0.5;
            if (this.degree >= 360) {
                this.degree = 0;
            }
        }, interval);*/
    }
});
