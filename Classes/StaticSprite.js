/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 11:44 PM
 * To change this template use File | Settings | File Templates.
 */

var cc, b2, my;
cc = cc = cc || {};
b2 = b2 = b2 || {};
my = my = my || {};

my.StaticSprite = my.BaseSprite.extend({
    ctor : function (paraentNode, world, position, imgPath, width, height) {
        this.initialize(paraentNode, world, position, b2.b2Body.b2_staticBody, imgPath, width, height, 0, 0, 0, 1, 0, 1, my.BOX_SHAPE);
        this.spriteType = my.BAFFLE_TYPE;
    }
});