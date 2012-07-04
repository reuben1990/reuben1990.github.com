/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 11:48 PM
 * To change this template use File | Settings | File Templates.
 */

var BaseSprite = cc.Sprite.extend({
    b2_body : null,
    bodyDef : null,
    fixtureDef : null,
    spriteType : null,
    world : null,
    power : 0,
    parentNode : null,
    initialize : function (parentNode, world, position, type, imgPath, width, height, radian_direction, radian_self, velocity, density, friction, restitution, shape) {
        var bodyDef, body, fixtureDef;
        this.world = world;
        this.parentNode = parentNode;
        this.initWithFile(imgPath, cc.RectMake(0, 0, width * my.TILE_SIZE, height * my.TILE_SIZE));
        this.setPosition(cc.PointMake(position.x * my.TILE_SIZE, position.y * my.TILE_SIZE));
        this.setRotation(-1 * cc.RADIANS_TO_DEGREES(radian_self));
        parentNode.addChild(this, my.spriteLayer);

        bodyDef = new b2.b2BodyDef();
        bodyDef.type = type;
        bodyDef.position.Set(position.x, position.y);
        bodyDef.angle = radian_self;
        bodyDef.userData = this;
        this.bodyDef = bodyDef;

        this.b2_body = world.CreateBody(bodyDef);
        this.b2_body.SetLinearVelocity(new b2.b2Vec2(Math.cos(radian_direction) * velocity, Math.sin(radian_direction) * velocity));

        fixtureDef = new b2.b2FixtureDef();
        if (shape === my.BOX_SHAPE) {
            fixtureDef.shape = new b2.b2PolygonShape();
            fixtureDef.shape.SetAsBox(width / 2, height / 2);
        } else {
            fixtureDef.shape = new b2.b2CircleShape(width / 2);
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
        //abstract function, write the being hit logic.
    },
    destroy : function () {
        //abstract function, call for destroy a sprite.
    },
    alterPhysicalState : function (heroPos) {
        //abstract function, update the direction.
    },
    drawSelf : function () {
        //callback
    },
    doDrawSelf : function () {
        var b = this.b2_body;
        this.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
        this.setPosition(cc.PointMake(b.GetPosition().x * my.TILE_SIZE, b.GetPosition().y * my.TILE_SIZE));
    },
    tagAsDead : function () {
        my.graveyard.push(this);
    },
    doDestroy : function () {
        if (this.getParent() !== null) {
            this.removeFromParentAndCleanup(true);
        }
        var body_tmp = this.b2_body;
        this.world.DestroyBody(body_tmp);
    },
    computeVecLength : function (vec) {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    },
    modifyVecToNewLength : function (vec, length) {
        var oldLength = this.computeVecLength(vec);
        var newVec = new b2.b2Vec2(vec.x / oldLength * length, vec.y / oldLength * length);
        return newVec;
    },
    computeVecByPointsAndStrength : function (p0, p1, strength) {
        var x = (p1.x - p0.x);
        var y = (p1.y - p0.y);
        return this.modifyVecToNewLength(new b2.b2Vec2(x, y), strength);
    },
    computeDirection : function (point0, point1) {
        var radian;
        if (point1.x === point0.x) {
            if (point1.y >= point0.y) {
                radian = Math.PI / 2;
            } else {
                radian = 1.5 * Math.PI;
            }
        } else {
            radian = Math.atan((point1.y - point0.y) / (point1.x - point0.x));
            if (point1.x < point0.x) {
                radian += Math.PI;
            }
        }
        return radian;
    }
});