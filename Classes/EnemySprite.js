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
    width : 1.5,
    height : 1.5,
    life : 100,
    power : 20,
    impulseStrength : 4,
    maxVelocity : 15,
    density : 100,
    ctor : function (paraentNode, world, position, radian_direction, radian_self, velocity) {
        this.initialize(paraentNode, world, position, b2.b2Body.b2_dynamicBody, this.imgPath, this.width, this.height, radian_direction, radian_self, velocity, this.density, 0, 1, my.BOX_SHAPE);
        this.spriteType = my.EnemyType;
    },
    alterPhysicalState : function (hero) {
        var vec = this.computeVecByPointsAndStrength(this.b2_body.GetPosition(), hero.b2_body.GetPosition(), this.impulseStrength);
        vec.x *= (1 + Math.random());
        vec.y *= (1 + Math.random());
        this.b2_body.ApplyImpulse(vec, this.b2_body.GetWorldCenter());

        var oldVelocity = this.b2_body.GetLinearVelocity();
        if (this.computeVecLength(oldVelocity) > this.maxVelocity) {
            this.b2_body.SetLinearVelocity(this.modifyVecToNewLength(oldVelocity, this.maxVelocity));
        }
    },
    handleCollision : function (sprite) {
        if (sprite.spriteType === my.HeroType || sprite.spriteType === my.BulletType) {
            this.b2_body.SetLinearVelocity(new b2.b2Vec2(this.b2_body.GetLinearVelocity().x / 1.1, this.b2_body.GetLinearVelocity().y / 1.1));
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