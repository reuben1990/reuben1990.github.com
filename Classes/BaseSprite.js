/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 11:48 PM
 * To change this template use File | Settings | File Templates.
 */

var cc, b2, my;
cc = cc = cc || {};
b2 = b2 = b2 || {};
my = my = my || {};

my.BaseSprite = cc.Sprite.extend({
    b2_body : null,
    bodyDef : null,
    fixtureDef : null,
    spriteType : null,
    world : null,
    power : 0,
    initialize : function (paraentNode, world, position, type, imgPath, width, height, radian_direction, radian_self, velocity, density, friction, restitution, shape) {
        var bodyDef, body, fixtureDef;
        this.world = world;
        this.initWithFile(imgPath, cc.RectMake(0, 0, width, height));
        this.setPosition(cc.PointMake(position.x, position.y));
        paraentNode.addChild(this);

        bodyDef = new b2.b2BodyDef();
        bodyDef.type = type;
        bodyDef.position.Set(position.x / my.TILE_SIZE, position.y / my.TILE_SIZE);
        bodyDef.angle = radian_self;
        bodyDef.userData = this;
        this.bodyDef = bodyDef;

        this.b2_body = world.CreateBody(bodyDef);
        this.b2_body.SetLinearVelocity(new b2.b2Vec2(Math.cos(radian_direction) * velocity, Math.sin(radian_direction) * velocity));

        fixtureDef = new b2.b2FixtureDef();
        if (shape === my.BOX_SHAPE) {
            fixtureDef.shape = new b2.b2PolygonShape();
            fixtureDef.shape.SetAsBox(width / my.TILE_SIZE / 2, height / my.TILE_SIZE / 2);
        } else {
            fixtureDef.shape = new b2.b2CircleShape(width / my.TILE_SIZE / 2);
        }
        fixtureDef.density = density;
        fixtureDef.friction = friction;
        fixtureDef.restitution = restitution;
        this.fixtureDef = fixtureDef;

        this.b2_body.CreateFixture(fixtureDef);
    },
    setAsBullet : function () {
        this.bodyDef.bullet = true;
    },
    handleCollision : function (sprite) {
        //write the being hit logic.
    },
    destroy : function () {
        //abstract function, call for destroy a sprite.
    },
    tagAsDead : function () {
        my.graveyard.push(this);
    },
    doDestroy : function () {
        this.unscheduleAllSelectors();
        var parentNode = this.getParent();
        var body_tmp = this.b2_body;
        if (parentNode !== null) {
            parentNode.removeChild(this);
        }
        this.world.DestroyBody(body_tmp);
    }
});