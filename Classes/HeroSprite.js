/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 9:48 PM
 * To change this template use File | Settings | File Templates.
 */

var HeroSprite = BaseSprite.extend({
    width : 1.5,
    height : 1.5,
    keyHitAssistance : null,
    isShooting : false,
    velocity : 10,
    normalShootInterval : 0.05,
    fireShootInterval : 0.02,
    shootInterval : null,
    bulletType : null,
    radian_direction : 0,
    life : 100,
    power : 100,
    density : 100,
    ctor : function (parentNode, world, position, keyHitAssistance) {
        this.keyHitAssistance = keyHitAssistance;
        this.initialize(parentNode, world, position, b2.b2Body.b2_dynamicBody, hero_path, this.width, this.height, 0, 0, 0, this.density, 0.8, 1, my.CIRCLE_SHAPE);
        this.spriteType = my.HERO_TYPE;
        this.setBulletAs(my.NORMAL_BULLET);
        playRingEffect(this, cc.PointMake(this.width * my.TILE_SIZE / 2, this.height * my.TILE_SIZE / 2));
    },
    //callback
    drawSelf : function () {
        if (this.life > 0) {
            this.setRotation(-1 * cc.RADIANS_TO_DEGREES(this.radian_direction + Math.PI));
            this.setPosition(cc.PointMake(this.b2_body.GetPosition().x * my.TILE_SIZE, this.b2_body.GetPosition().y * my.TILE_SIZE));
        }
    },
    //callback
    alterPhysicalState : function (hero) {
        if (this.life > 0) {
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
        }
    },
    //callback
    handleTouchBegan : function (location) {
        if (this.life > 0) {
            this.radian_direction = this.computeDirection(this.b2_body.GetPosition(), location);
            this.schedule(this.shoot, this.shootInterval);
            this.isShooting = true;
            this.shoot();
        }
    },
    //callback
    handleTouchMoved : function (location) {
        if (this.isShooting && this.life > 0) {
            this.radian_direction = this.computeDirection(this.b2_body.GetPosition(), location);
        }
    },
    //callback
    handleTouchEnded : function (location) {
        if (this.life > 0) {
            this.isShooting = false;
            this.unschedule(this.shoot);
        }
    },
    //callback
    handleCollision : function (sprite) {
        if (this.life > 0) {
            if (sprite.spriteType === my.ENEMY_TYPE) {
                this.life -= sprite.power;
                my.lifeLabel.setString("Life : " + this.life);
                if (this.life <= 0) {
                    this.tagAsDead();
                }
            }
        }
    },
    //callback
    destroy : function () {
        this.doDestroy();
        this.parentNode.onHeroDestroy();
    },
    shoot : function () {
        var bulletX_offset = Math.cos(this.radian_direction) * 1.5;
        var bulletY_offset = Math.sin(this.radian_direction) * 1.5;
        var pos =  this.b2_body.GetPosition();
        var firePos = {x : pos.x + bulletX_offset / 1.5, y : pos.y + bulletY_offset / 1.5};
        pos.x += bulletX_offset;
        pos.y += bulletY_offset;

        playHitEffect(this.parentNode, r_a_point(firePos), 0.5, 0.05);
        if (this.bulletType === my.FIRE_BULLET) {
            var fireBullet = new FireBulletSprite(this.parentNode, this.world, pos, this.radian_direction);
        } else {
            var normalBullet = new NormalBulletSprite(this.parentNode, this.world, pos, this.radian_direction);
        }
    },
    //callback
    changeBullet : function () {
        if (this.life > 0) {
            if (this.bulletType === my.NORMAL_BULLET) {
                this.setBulletAs(my.FIRE_BULLET);
            } else {
                this.setBulletAs(my.NORMAL_BULLET);
            }
            if (this.isShooting) {
                this.unschedule(this.shoot);
                this.schedule(this.shoot, this.shootInterval);
            }
        }
    },
    setBulletAs : function (type) {
        if (type === my.NORMAL_BULLET) {
            this.shootInterval = this.normalShootInterval;
        } else {
            this.shootInterval = this.fireShootInterval;
        }
        this.bulletType = type;
    }
});