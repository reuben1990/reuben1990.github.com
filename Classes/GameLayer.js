
var cc, my, b2;
cc = cc = cc || {};
my = my = my || {};
b2 = b2 = b2 || {};

var GameLayer = cc.Layer.extend({
    world : null,
    hero : null,
    SCREEN_ABS : null,
    SCREEN_REL : null,
    keyHitAssistance : null,
    init : function () {
        this.setIsTouchEnabled(true);
        this.setIsKeypadEnabled(true);
        this.SCREEN_ABS = cc.Director.sharedDirector().getWinSize();
        this.SCREEN_REL = {width : this.SCREEN_ABS.width / my.TILE_SIZE, height : this.SCREEN_ABS.height / my.TILE_SIZE};
        this.keyHitAssistance = new my.keyKeyHitAssistance();

        /*create the world*/
        this.world = new b2.b2World(new b2.b2Vec2(0, 0), true);
        this.world.SetContinuousPhysics(true);

        /*set up some shared attr between fixturedef and bodydef*/
        var groundSprite = new my.StaticSprite(this, this.world, cc.PointMake(this.SCREEN_REL.WIDTH / 2, this.SCREEN_REL.HEIGHT  + 1), null, this.SCREEN_REL.WIDTH, 1);
        var roofSprite = new my.StaticSprite(this, this.world, cc.PointMake(this.SCREEN_REL.WIDTH / 2, -1), null, this.SCREEN_REL.WIDTH, 1);
        var leftSprite = new my.StaticSprite(this, this.world, cc.PointMake(-1, this.SCREEN_REL.HEIGHT / 2), null, 1, this.SCREEN_REL.HEIGHT);
        var rightSprite = new my.StaticSprite(this, this.world, cc.PointMake(this.SCREEN_REL.WIDTH + 1, this.SCREEN_REL.HEIGHT / 2), null, 1, this.SCREEN_REL.HEIGHT);

        this.scheduleUpdate();
        this.hero = new my.HeroSprite(this, this.world, cc.PointMake(this.SCREEN_ABS.width / 2, this.SCREEN_ABS.height / 2), this.keyHitAssistance);
        this.iniEnemy();
        return true;
    },
    iniEnemy : function () {
        var x = Math.random() * this.SCREEN_ABS.width;
        var y = Math.random() * this.SCREEN_ABS.height;
        var radian_direction = Math.random() * Math.PI;
        var radian_self = Math.random() * Math.PI;
        var velocity = Math.random() * 10 + 5;
        var tmp = new my.EnemySprite(this, this.world, cc.PointMake(x, y), radian_direction, radian_self, velocity);
    },
    update : function () {
        var velocityIterations = 6;
        var positionIterations = 2;
        this.world.Step(1.0 / 60.0, velocityIterations, positionIterations);
    },
    ccTouchBegan : function (touches, event) {

    },
    ccTouchesMoved : function (touches, event) {

    },
    ccTouchesEnded : function (touches, event) {
        this.hero.handleTouch(touches, event);
        /*var it;
        for (it = 0; it < touches.length; it += 1) {
            var touch = touches[it];
            if (!touch) {
                break;
            } else {
                var location = touch.locationInView(touch.view());
                var radian = Math.random() * Math.PI * 2;
                var radian_self = Math.random() * Math.PI * 2;
                this.addNewSpriteWithCoords('./Resources/square.png', location, radian, radian_self, 5, 1, 0, 1);
            }
        }*/
    },
    keyUp : function (e) {
        this.keyHitAssistance.setKeyUp(e);
    },
    keyDown : function (e) {
        this.keyHitAssistance.setKeyDown(e);
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