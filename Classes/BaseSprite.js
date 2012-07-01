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
    body : null,
    initialize : function (paraentNode, world, position, type, imgPath, width, height, radian_direction, radian_self, velocity, density, friction, restitution) {
        var bodyDef, body, fixtureDef;
        this.initWithFile(imgPath, cc.RectMake(0, 0, width, height));
        this.setPosition(cc.PointMake(position.x, position.y));
        paraentNode.addChild(this);

        bodyDef = new b2.b2BodyDef();
        bodyDef.type = type;
        bodyDef.position.Set(position.x / my.TILE_SIZE, position.y / my.TILE_SIZE);
        bodyDef.SetLinearVelocity(Math.cos(radian_direction) * velocity, Math.sin(radian_direction) * velocity);
        bodyDef.angle = radian_self;
        bodyDef.userData = this;
        this.body = world.CreateBody(bodyDef);
        fixtureDef = new b2.b2FixtureDef();
        fixtureDef.shape = new b2.b2PolygonShape();
        fixtureDef.shape.SetAsBox(width / my.TILE_SIZE / 2, height / my.TILE_SIZE / 2);
        fixtureDef.density = density;
        fixtureDef.friction = friction;
        fixtureDef.restitution = restitution;
        this.body.CreateFixture(fixtureDef);
    },
    drawFromBody : function () {
        this.setPosition(cc.PointMake(this.body.GetPosition().x * my.TILE_SIZE, this.body.GetPosition().y * my.TILE_SIZE));
        this.setRotation(-1 * cc.RADIANS_TO_DEGREES(this.body.GetAngle()));
    }
});