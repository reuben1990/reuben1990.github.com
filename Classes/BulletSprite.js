/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 9:49 PM
 * To change this template use File | Settings | File Templates.
 */

var cc, my, b2;
cc = cc = cc || {};
my = my = my || {};
b2 = b2 = b2 || {};

my.BulletSprite = my.BaseSprite.extend({
    imgPath : "./Resources/bullet.png",
    width : 16,
    height : 16,
    velocity : 75,
    power : 20,
    ctor : function (paraentNode, world, position, radian_direction) {
        this.initialize(paraentNode, world, position, b2.b2Body.b2_dynamicBody, this.imgPath, this.width, this.height, radian_direction, 0, this.velocity, 2, 0, 1, my.CIRCLE_SHAPE);
        this.spriteType = my.BulletType;
        this.setAsBullet();
    },
    handleCollision : function (sprite) {
        this.tagAsDead();
    },
    destroy : function () {
        this.doDestroy();
    }
});