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

my.EnemySprite = cc.BaseSprite.extend({
    imgPath : "./Resources/square.png",
    width : 32,
    height : 32,
    ctor : function (paraentNode, world, position, radian_direction, radian_self, velocity) {
        this._super();
        this.initialize(paraentNode, world, position, b2.b2Body.b2_dynamicBody, this.imgPath, this.width, this.height, radian_direction, radian_self, velocity, 1.0, 0.0, 1.0);
    },
    update : function () {
        this.drawFromBody();
    }
});