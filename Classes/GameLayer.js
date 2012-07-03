
var GameLayer = cc.Layer.extend({
    horizontalBaffleHeight : 0.5,
    verticalBaffleWidth : 0.5,
    bgUpdateInterval : 0.04,
    contactListener : null,
    world : null,
    hero : null,
    SCREEN_ABS : null,
    SCREEN_TILE : null,
    keyHitAssistance : null,
    init : function () {
        this.SCREEN_ABS = cc.Director.sharedDirector().getWinSize();
        this.SCREEN_TILE = {width : this.SCREEN_ABS.width / my.TILE_SIZE, height : this.SCREEN_ABS.height / my.TILE_SIZE};
        this.keyHitAssistance = new keyKeyHitAssistance();
        this.world = new b2.b2World(new b2.b2Vec2(0, 0), true);
        this.world.SetContinuousPhysics(true);
        this.initBackground();
        this.initBoundry();
        this.initEnemy();
        this.hero = new HeroSprite(this, this.world, cc.PointMake(this.SCREEN_TILE.width / 4, this.SCREEN_TILE.height / 2), this.keyHitAssistance);
        this.setIsTouchEnabled(true);
        this.setIsKeypadEnabled(true);
        this.initContactListener();
        this.scheduleUpdate();
        this.schedule(this.addEnemy, 10);
        this.schedule(this.updateBackground, 0.5);
        return true;
    },
    update : function (dt) {
        this.alterPhysicalState();
        var velocityIterations = 6;
        var positionIterations = 2;
        this.world.Step(0.02, velocityIterations, positionIterations);
        this.deleteTheDeads();
        this.drawWorld();
    },
    addEnemy : function () {
        var i;
        for (i = 0; i < 10; i += 1) {
            var x = (Math.random() * 0.7 + 0.3) * this.SCREEN_TILE.width;
            var y = Math.random() * this.SCREEN_TILE.height;
            var radian_direction = Math.random() * Math.PI;
            var radian_self = Math.random() * Math.PI;
            var velocity = Math.random() * 5;
            var enemy = new EnemySprite(this, this.world, cc.PointMake(x, y), radian_direction, radian_self, velocity);
        }
    },
    updateBackground : function () {

    },
    ccTouchesBegan : function (pTouch, pEvent) {
        var location = a_r_point(pTouch[0].locationInView());
        this.hero.handleTouchBegan(location);
    },
    ccTouchesMoved : function (pTouch, pEvent) {
        var location = a_r_point(pTouch[0].locationInView());
        this.hero.handleTouchMoved(location);
    },
    ccTouchesEnded : function (pTouch, pEvent) {
        var location = a_r_point(pTouch[0].locationInView());
        this.hero.handleTouchEnded(location);
    },
    keyUp : function (e) {
        this.keyHitAssistance.setKeyUp(e);
    },
    keyDown : function (e) {
        this.keyHitAssistance.setKeyDown(e);
        if (e === cc.KEY.space) {
            this.hero.changeBullet();
        }
    },
    drawWorld : function () {
        var b;
        for (b = this.world.GetBodyList(); b; b = b.GetNext()) {
            if (b.GetUserData() !== null) {
                var sprite = b.GetUserData();
                sprite.setPosition(cc.PointMake(b.GetPosition().x * my.TILE_SIZE, b.GetPosition().y * my.TILE_SIZE));
                sprite.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
            }
        }
    },
    initBackground : function () {
        var bg = new backgroundSprite(this, background_pic_path, cc.PointMake(this.SCREEN_ABS.width / 2, this.SCREEN_ABS.height / 2), this.bgUpdateInterval);
        //varyingSizeEffect(this, cc.PointMake(this.SCREEN_ABS.width / 2, this.SCREEN_ABS.height / 2));
    },
    initBoundry : function () {
        var roofSprite = new StaticSprite(this, this.world, cc.PointMake(this.SCREEN_TILE.width / 2, this.SCREEN_TILE.height + this.horizontalBaffleHeight / 2), horizontal_baffle_path, this.SCREEN_TILE.width, this.horizontalBaffleHeight);
        var groundSprite = new StaticSprite(this, this.world, cc.PointMake(this.SCREEN_TILE.width / 2, -this.horizontalBaffleHeight / 2), horizontal_baffle_path, this.SCREEN_TILE.width, this.horizontalBaffleHeight);
        var leftSprite = new StaticSprite(this, this.world, cc.PointMake(-this.verticalBaffleWidth / 2, this.SCREEN_TILE.height / 2), vertical_baffle_path, this.verticalBaffleWidth, this.SCREEN_TILE.height);
        var rightSprite = new StaticSprite(this, this.world, cc.PointMake(this.SCREEN_TILE.width + this.verticalBaffleWidth / 2, this.SCREEN_TILE.height / 2), vertical_baffle_path, this.verticalBaffleWidth, this.SCREEN_TILE.height);
    },
    initEnemy : function () {
        this.addEnemy();
    },
    initContactListener : function () {
        this.contactListener = new b2.b2ContactListener();
        this.contactListener.BeginContact = function (contact) {
            var spriteA = contact.GetFixtureA().GetBody().GetUserData();
            var spriteB = contact.GetFixtureB().GetBody().GetUserData();
            spriteA.handleCollision(spriteB);
            spriteB.handleCollision(spriteA);
        };
        this.world.SetContactListener(this.contactListener);
    },
    deleteTheDeads : function () {
        var i;
        for (i = 0; i < my.graveyard.length; i += 1) {
            var sprite_tmp = my.graveyard[i];
            sprite_tmp.destroy();
        }
        my.graveyard = [];
    },
    alterPhysicalState : function () {
        var b;
        for (b = this.world.GetBodyList(); b; b = b.GetNext()) {
            var sprite = b.GetUserData();
            if (sprite !== null) {
                sprite.alterPhysicalState(this.hero);
            }
        }
    }
});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    } else {
        return null;
    }
};

GameLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameLayer.create();
    scene.addChild(layer, 1);
    return scene;
};