/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 9:48 PM
 * To change this template use File | Settings | File Templates.
 */

var EnemySprite = BaseSprite.extend({
    width : 2,
    height : 2,
    maxLife : 100,
    life : 100,
    power : 10,
    impulseStrength : 4,
    maxVelocity : 5,
    density : 100,
    flareUpProbability : 0.002,
    angerStrength : 200,
    isAnger : false,
    ctor : function (parentNode, world, position, radian_direction, radian_self, velocity) {
        this.initialize(parentNode, world, position, b2.b2Body.b2_dynamicBody, enemy_path, this.width, this.height, radian_direction, radian_self, velocity, this.density, 0.8, 1, my.CIRCLE_SHAPE);
        this.spriteType = my.ENEMY_TYPE;
    },
    drawSelf : function () {
        this.doDrawSelf();
    },
    alterPhysicalState : function (hero) {
        this.setColor(new cc.Color3B(255, 255, 255));
        if (!this.isAnger && Math.random() < this.flareUpProbability) {
            this.isAnger = true;
            this.life = 20;
        }
        var vec = this.computeVecByPointsAndStrength(this.b2_body.GetPosition(), hero.b2_body.GetPosition(), this.impulseStrength);
        if (this.isAnger) {
            vec = this.modifyVecToNewLength(vec, this.angerStrength);
        } else {
            vec.x *= (1 + Math.random());
            vec.y *= (1 + Math.random());
        }
        this.b2_body.ApplyImpulse(vec, this.b2_body.GetWorldCenter());

        var oldVelocity = this.b2_body.GetLinearVelocity();
        if (!this.isAnger && this.computeVecLength(oldVelocity) > this.maxVelocity) {
            this.b2_body.SetLinearVelocity(this.modifyVecToNewLength(oldVelocity, this.maxVelocity));
        }
    },
    handleCollision : function (sprite) {
        if (sprite.spriteType === my.HERO_TYPE || sprite.spriteType === my.BULLET_TYPE) {
            this.b2_body.SetLinearVelocity(new b2.b2Vec2(this.b2_body.GetLinearVelocity().x / 1.3, this.b2_body.GetLinearVelocity().y / 1.3));
            this.life -= sprite.power;
            my.score += sprite.power;
            my.scoreLabel.setString("Score : " + my.score);
            this.setColor(cc.RED());
            if (this.life <= 0) {
                this.tagAsDead();
            }
        }
    },
    destroy : function () {
        sparkEffect(this.getPosition(), this.parentNode, 1.2, 0.7);
        this.doDestroy();
    }
});