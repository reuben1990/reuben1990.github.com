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

my.HeroSprite = my.BaseSprite.extend({
    imgPath : "./Resources/hero.png",
    width : 1,
    height : 1,
    keyHitAssistance : null,
    parentNode : null,
    isShooting : false,
    velocity : 10,
    shootInterval : 0.05,
    radian_direction : 0,
    life : 100,
    power : 100,
    density : 100,
    assailable : false,
    ctor : function (paraentNode, world, position, keyHitAssistance) {
        this.parentNode = paraentNode;
        this.keyHitAssistance = keyHitAssistance;
        this.initialize(paraentNode, world, position, b2.b2Body.b2_dynamicBody, this.imgPath, this.width, this.height, 0, 0, 0, this.density, 0, 1, my.BOX_SHAPE);
        this.spriteType = my.HeroType;
    },
    alterPhysicalState : function (hero) {
        var x_tmp = 0;
        var y_tmp = 0;
        if (this.keyHitAssistance.keyArray[cc.KEY.a]) {
            x_tmp -= this.velocity;
        }
        if (this.keyHitAssistance.keyArray[cc.KEY.d]) {
            x_tmp += this.velocity;
        }
        if (this.keyHitAssistance.keyArray[cc.KEY.w]) {
            y_tmp += this.velocity;
        }
        if (this.keyHitAssistance.keyArray[cc.KEY.s]) {
            y_tmp -= this.velocity;
        }
        this.b2_body.SetAwake(true);
        this.b2_body.SetLinearVelocity(new b2.b2Vec2(x_tmp, y_tmp));
    },
    handleTouchBegan : function (location) {
        this.radian_direction = this.computeDirection(this.b2_body.GetPosition(), location);
        this.schedule(this.shoot, this.shootInterval);
        this.isShooting = true;
        this.shoot();
    },
    handleTouchMoved : function (location) {
        if (this.isShooting) {
            this.radian_direction = this.computeDirection(this.b2_body.GetPosition(), location);
        }
    },
    handleTouchEnded : function (location) {
        this.isShooting = false;
        this.unschedule(this.shoot);
    },
    handleCollision : function (sprite) {
        if (!this.assailable) {
            this.assailable = true;
        } else if (sprite.spriteType === my.EnemyType) {
            this.life -= sprite.power;
            if (this.life <= 0) {
                this.tagAsDead();
            }
        }
    },
    destroy : function () {
        this.doDestroy();
    },
    shoot : function () {
        var x_offset = Math.cos(this.radian_direction) * 1.5;
        var y_offset = Math.sin(this.radian_direction) * 1.5;
        var pos =  this.b2_body.GetPosition();
        pos.x += x_offset;
        pos.y += y_offset;
        var bullet = new my.BulletSprite(this.parentNode, this.world, pos, this.radian_direction);
    }
});