
var cc, my, b2;
cc = cc = cc || {};
my = my = my || {};
b2 = b2 = b2 || {};

var GameLayer = cc.Layer.extend({
    horizontalBafflePath : "./Resources/horizental-baffle.gif",
    verticalBafflePath : "./Resources/vertical-baffle.jpg",
    backgroundPicPath : "./Resources/background.jpg",
    horizontalBaffleHeight : 16,
    verticalBaffleWidth : 16,
    contactListener : null,
    world : null,
    hero : null,
    SCREEN_ABS : null,
    keyHitAssistance : null,
    init : function () {
        this.SCREEN_ABS = cc.Director.sharedDirector().getWinSize();
        this.keyHitAssistance = new my.keyKeyHitAssistance();
        this.world = new b2.b2World(new b2.b2Vec2(0, 0), true);
        this.world.SetContinuousPhysics(true);
        this.initBackground();
        this.initBoundry();
        this.initEnemy();
        this.hero = new my.HeroSprite(this, this.world, cc.PointMake(this.SCREEN_ABS.width / 4, this.SCREEN_ABS.height / 2), this.keyHitAssistance);
        this.setIsTouchEnabled(true);
        this.setIsKeypadEnabled(true);
        this.initContactListener();
        this.scheduleUpdate();
        this.schedule(this.addEnemy, 10);
        return true;
    },
    update : function (dt) {
        var velocityIterations = 6;
        var positionIterations = 2;
        this.world.Step(0.02, velocityIterations, positionIterations);
        this.deleteTheDeads();
        this.drawWorld();
    },
    addEnemy : function () {
        var i;
        for (i = 0; i < 15; i += 1) {
            var x = (Math.random() * 0.7 + 0.3) * this.SCREEN_ABS.width;
            var y = Math.random() * this.SCREEN_ABS.height;
            var radian_direction = Math.random() * Math.PI;
            var radian_self = Math.random() * Math.PI;
            var velocity = Math.random() * 5 + 5;
            var enemy = new my.EnemySprite(this, this.world, cc.PointMake(x, y), radian_direction, radian_self, velocity);
        }
    },
    ccTouchesBegan : function (pTouch, pEvent) {
        this.hero.handleTouchBegan(pTouch[0].locationInView());
    },
    ccTouchesMoved : function (pTouch, pEvent) {
        this.hero.handleTouchMoved(pTouch[0].locationInView());
    },
    ccTouchesEnded : function (pTouch, pEvent) {
        this.hero.handleTouchEnded(pTouch[0].locationInView());
    },
    keyUp : function (e) {
        this.keyHitAssistance.setKeyUp(e);
    },
    keyDown : function (e) {
        this.keyHitAssistance.setKeyDown(e);
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
        var bgSprite = cc.Sprite.create(this.backgroundPicPath);
        bgSprite.setPosition(cc.PointMake(this.SCREEN_ABS.width / 2, this.SCREEN_ABS.height / 2));
        this.addChild(bgSprite);
    },
    initBoundry : function () {
        var roofSprite = new my.StaticSprite(this, this.world, cc.PointMake(this.SCREEN_ABS.width / 2, this.SCREEN_ABS.height + this.horizontalBaffleHeight / 2), this.horizontalBafflePath, this.SCREEN_ABS.width, this.horizontalBaffleHeight);
        var groundSprite = new my.StaticSprite(this, this.world, cc.PointMake(this.SCREEN_ABS.width / 2, -this.horizontalBaffleHeight / 2), this.horizontalBafflePath, this.SCREEN_ABS.width, this.horizontalBaffleHeight);
        var leftSprite = new my.StaticSprite(this, this.world, cc.PointMake(-this.verticalBaffleWidth / 2, this.SCREEN_ABS.height / 2), this.verticalBafflePath, this.verticalBaffleWidth, this.SCREEN_ABS.height);
        var rightSprite = new my.StaticSprite(this, this.world, cc.PointMake(this.SCREEN_ABS.width + this.verticalBaffleWidth / 2, this.SCREEN_ABS.height / 2), this.verticalBafflePath, this.verticalBaffleWidth, this.SCREEN_ABS.height);
    },
    initEnemy : function () {
        this.addEnemy();
    },
    initContactListener : function () {
        this.contactListener = new b2.b2ContactListener();
        this.contactListener.EndContact = function (contact) {
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