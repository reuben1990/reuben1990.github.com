
var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var PTM_RATIO = 32;
var cc;
cc = cc = cc || {};

var GameLayer = cc.Layer.extend({
    world:null,
    init:function () {
        this.setIsTouchEnabled(true);
        var screenSize = cc.Director.sharedDirector().getWinSize();

        //create the world
        this.world = new b2World(new b2Vec2(0, 9.8), true);
        this.world.SetContinuousPhysics(true);

        //set up some shared attr between fixturedef and bodydef
        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.5;
        fixDef.shape = new b2PolygonShape();
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;

        //top & bottom
        fixDef.shape.SetAsBox(20, 1);
        bodyDef.position.Set(10, screenSize.height / PTM_RATIO + 1);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(10, -1);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);

        //left & right
        fixDef.shape.SetAsBox(1, 20);
        bodyDef.position.Set(-1, 10);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(21, 10);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);

        this.scheduleUpdate();
        return true;
    },
    addNewSpriteWithCoords:function (p, radian, direction, power) {
        var sprite = cc.Sprite.create('./Resources/square.png', cc.RectMake(0, 0, 32, 32));
        sprite.setPosition(cc.PointMake(p.x, p.y));
        this.addChild(sprite);

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.angle = direction;
        bodyDef.position.Set(p.x / PTM_RATIO, p.y / PTM_RATIO);
        //bodyDef.bullet = true;
        bodyDef.userData = sprite;
        var body = this.world.CreateBody(bodyDef);
        body.SetLinearVelocity(new b2Vec2(Math.cos(radian) * power, Math.sin(radian) * power));
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = new b2PolygonShape();
        fixtureDef.shape.SetAsBox(0.5, 0.5);
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        body.CreateFixture(fixtureDef);
    },
    update:function (dt) {
        //It is recommended that a fixed time step is used with Box2D for stability
        //of the simulation, however, we are using a variable time step here.
        //You need to make an informed choice, the following URL is useful
        //http://gafferongames.com/game-physics/fix-your-timestep/
        var velocityIterations = 8;
        var positionIterations = 1;
        // Instruct the world to perform a single step of simulation. It is
        // generally best to keep the time step and iterations fixed.
        this.world.Step(dt, velocityIterations, positionIterations);
        //Iterate over the bodies in the physics world
        for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
            if (b.GetUserData() !== null) {
                //Synchronize the AtlasSprites position and rotation with the corresponding body
                var myActor = b.GetUserData();
                myActor.setPosition(cc.PointMake(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO));
                myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
                //console.log(b.GetAngle());
            }
        }
    },
    ccTouchesEnded:function (touches, event) {
        //Add a new body/atlas sprite at the touched location
        for (var it = 0; it < touches.length; it++) {
            var touch = touches[it];
            if (!touch) {
                break;
            } else {
                var location = touch.locationInView(touch.view());//获取可以得到坐标的对象
                var angle = Math.random() * Math.PI * 2;
                var direction = Math.random() * Math.PI * 2;
                this.addNewSpriteWithCoords(location, angle, direction, 10);
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