/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 9:48 PM
 * To change this template use File | Settings | File Templates.
 */

var cc, b2, my;
cc = cc = cc || {};
b2 = b2 = b2 || {};
my = my = my || {};

my.HeroSprite = cc.BaseSprite.extend({
    imgPath : "./Resources/hero.png",
    width : 32,
    height : 32,
    keyHitAssistance : null,
    ctor : function (paraentNode, world, position, keyHitAssistance) {
        this._super();
        this.initialize(paraentNode, world, position, b2.b2Body.b2_dynamicBody, this.imgPath, this.width, this.height, 0, 0, 0, 1.0, 0.0, 1.0);
    },
    update : function () {
        this.drawFromBody();
        this.updateVelocity();
    },
    handleTouch : function (touches, event) {
    },
    updateVelocity : function () {
        var x_tmp = 0;
        var y_tmp = 0;
        if (this.keyHitAssistance.keyArray[cc.KEY.a]) {
            x_tmp -= 10;
        }
        if (this.keyHitAssistance.keyArray[cc.KEY.d]) {
            x_tmp += 10;
        }
        if (this.keyHitAssistance.keyArray[cc.KEY.w]) {
            y_tmp += 10;
        }
        if (this.keyHitAssistance.keyArray[cc.KEY.s]) {
            y_tmp -= 10;
        }
        this.body.SetAwake(true);
        this.body.SetLinearVelocity(new b2.b2Vec2(x_tmp, y_tmp));
    }
});