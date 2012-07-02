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

my.EnemySprite = my.BaseSprite.extend({
    imgPath : "./Resources/enemy.png",
    width : 32,
    height : 32,
    life : 100,
    power : 30,
    ctor : function (paraentNode, world, position, radian_direction, radian_self, velocity) {
        this.initialize(paraentNode, world, position, b2.b2Body.b2_dynamicBody, this.imgPath, this.width, this.height, radian_direction, radian_self, velocity, 10, 0, 1, my.BOX_SHAPE);
        this.spriteType = my.EnemyType;
    },
    handleCollision : function (sprite) {
        if (sprite.spriteType === my.HeroType || sprite.spriteType === my.BulletType) {
            this.life -= sprite.power;
            if (this.life <= 0) {
                this.tagAsDead();
            }
        }
    },
    destroy : function () {
        this.doDestroy();
    }
});