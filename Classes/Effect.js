/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/3/12
 * Time: 6:06 PM
 * To change this template use File | Settings | File Templates.
 */

var additiveSprite = cc.Sprite.extend({
    draw:function (ctx) {
        var context = ctx || cc.renderContext;
        context.globalCompositeOperation = 'lighter';
        this._super(ctx);
    }
});

var flareEffect = function (parent, target, callback) {
    var flare = new additiveSprite();
    flare.initWithFile(s_flare);
    parent.addChild(flare, 10);
    flare.setOpacity(0);
    flare.setPosition(cc.ccp(-30, 297));
    flare.setRotation(-120);
    flare.setScale(0.2);

    var opacityAnim = cc.FadeTo.create(0.5, 255);
    var opacDim = cc.FadeTo.create(1, 0);
    var biggeAnim = cc.ScaleBy.create(0.7, 1.2, 1.2);
    var biggerEase = cc.EaseSineOut.create(biggeAnim);
    var moveAnim = cc.MoveBy.create(0.5, cc.ccp(328, 0));
    var easeMove = cc.EaseSineOut.create(moveAnim);
    var rotateAnim = cc.RotateBy.create(2.5, 90);
    var rotateEase = cc.EaseExponentialOut.create(rotateAnim)
    var bigger = cc.ScaleTo.create(0.5, 1);

    var onComplete = cc.CallFunc.create(target, callback);
    var killflare = cc.CallFunc.create(flare, function () {
        this.getParent().removeChild(this);
    });
    flare.runAction(cc.Sequence.create(opacityAnim, biggerEase, opacDim, killflare, onComplete));
    flare.runAction(easeMove);
    flare.runAction(rotateEase);
    flare.runAction(bigger);
};

var sparkEffect = function (ccpoint, parent, scale, duration) {
    scale = scale || 0.3;
    duration = duration || 0.5;
    var one = new additiveSprite();
    one.initWithFile(s_explode1);
    var two = new additiveSprite();
    two.initWithFile(s_explode2);
    var three = new additiveSprite();
    three.initWithFile(s_explode3);
    one.setPosition(ccpoint);
    two.setPosition(ccpoint);
    three.setPosition(ccpoint);
    //parent.addChild(one);
    parent.addChild(two);
    parent.addChild(three);
    one.setScale(scale);
    two.setScale(scale);
    three.setScale(scale);
    three.setRotation(Math.random() * 360);
    var left = cc.RotateBy.create(duration, -45);
    var right = cc.RotateBy.create(duration, 45);
    var scaleBy = cc.ScaleBy.create(duration, 3, 3);
    var fadeOut = cc.FadeOut.create(duration);
    one.runAction(left);
    two.runAction(right);
    one.runAction(scaleBy);
    two.runAction(scaleBy.copy());
    three.runAction(scaleBy.copy());
    one.runAction(fadeOut);
    two.runAction(fadeOut.copy());
    three.runAction(fadeOut.copy());
    setTimeout(function () {
        parent.removeChild(one);
        parent.removeChild(two);
        parent.removeChild(three);
    }, duration * 1000);
};

var playHitEffect = function (parent, position, pScale, pTime) {
    var explode = new additiveSprite();
    explode.initWithFile(s_hit);
    explode.setPosition(position);
    explode.setRotation(Math.random() * 360);
    explode.setScale(pScale);
    parent.addChild(explode, 9999);

    var removeExplode = cc.CallFunc.create(explode, explode.removeFromParentAndCleanup);
    explode.runAction(cc.ScaleBy.create(pTime / 2, 2, 2));
    explode.runAction(cc.Sequence.create(cc.FadeOut.create(pTime / 2), removeExplode));
};

var playRingEffect = function (parent, position) {
    var sprite = cc.Sprite.create(ring_path);
    var action = cc.RepeatForever.create(cc.RotateBy.create(1.0, 360));
    sprite.runAction(action);
    sprite.setPosition(position);
    parent.addChild(sprite);
};
var varyingSizeEffect = function (parent, position) {
    var emitter = new cc.ParticleSystemQuad();
    //this._emitter.initWithTotalParticles(1000);
    emitter.initWithTotalParticles(20);
    //emitter.autorelease();

    parent.addChild(emitter, 10);
    ////this._emitter.release();

    // duration
    emitter.setDuration(-1);

    // gravity
    emitter.setGravity(cc.PointMake(0, 0));

    // angle
    emitter.setAngle(0);
    emitter.setAngleVar(360);

    // radial
    emitter.setRadialAccel(70);
    emitter.setRadialAccelVar(10);

    // tagential
    emitter.setTangentialAccel(80);
    emitter.setTangentialAccelVar(0);

    // speed of particles
    emitter.setSpeed(50);
    emitter.setSpeedVar(10);

    // emitter position
    emitter.setPosition(position);
    emitter.setPosVar(cc.PointZero());

    // life of particles
    emitter.setLife(2.0);
    emitter.setLifeVar(0.3);

    // emits per frame
    emitter.setEmissionRate(emitter.getTotalParticles() / emitter.getLife());

    // color of particles
    var startColor = new cc.Color4F(0.5, 0.5, 0.5, 1.0);
    emitter.setStartColor(startColor);

    var startColorVar = new cc.Color4F(0.5, 0.5, 0.5, 1.0);
    emitter.setStartColorVar(startColorVar);

    var endColor = new cc.Color4F(0.1, 0.1, 0.1, 0.2);
    emitter.setEndColor(endColor);

    var endColorVar = new cc.Color4F(0.1, 0.1, 0.1, 0.2);
    emitter.setEndColorVar(endColorVar);

    // size, in pixels
    emitter.setStartSize(1.0);
    emitter.setStartSizeVar(1.0);
    emitter.setEndSize(32.0);
    emitter.setEndSizeVar(8.0);

    // texture
    emitter.setTexture(cc.TextureCache.sharedTextureCache().addImage(s_fire));
    emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);
    // additive
    emitter.setIsBlendAdditive(false);
};
/*
var Explosion = additiveSprite.extend({
    tmpWidth:0,
    tmpHeight:0,
    ctor:function () {
        this._super();
        this.tmpWidth = this.getContentSize().width;
        this.tmpHeight = this.getContentSize().height;
        var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("explosion_01.png");
        this.initWithSpriteFrame(pFrame);

        var animation = cc.AnimationCache.sharedAnimationCache().animationByName("Explosion");
        this.runAction(cc.Sequence.create(
            cc.Animate.create(animation, false),
            cc.CallFunc.create(this, this.destroy)
        ));
    },
    destroy:function () {
        this.getParent().removeChild(this);
    }
});

var sharedExplosion = function () {
    var a = cc.SpriteFrameCache.sharedSpriteFrameCache();
    a.addSpriteFramesWithFile('./Resources/explosion.plist');
    var animFrames = [];
    var str = "";
    for (var i = 1; i < 35; i++) {
        str = "explosion_" + (i < 10 ? ("0" + i) : i) + ".png";
        var frame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(str);
        animFrames.push(frame);
    }
    var animation = cc.Animation.create(animFrames, 0.04);
    cc.AnimationCache.sharedAnimationCache().addAnimation(animation, "Explosion");
};
*/