/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 11:44 PM
 * To change this template use File | Settings | File Templates.
 */

var StaticSprite = BaseSprite.extend({
    ctor : function (parentNode, world, position, imgPath, width, height) {
        this.initialize(parentNode, world, position, b2.b2Body.b2_staticBody, imgPath, width, height, 0, 0, 0, 1, 0, 1, my.BOX_SHAPE);
        this.spriteType = my.BAFFLE_TYPE;
    }
});