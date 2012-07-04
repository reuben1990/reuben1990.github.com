/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 11:25 AM
 * To change this template use File | Settings | File Templates.
 */

my.TILE_SIZE = 32;
my.CIRCLE_SHAPE = 100;
my.BOX_SHAPE = 101;
my.ENEMY_TYPE = 102;
my.HERO_TYPE = 103;
my.BULLET_TYPE = 104;
my.BAFFLE_TYPE = 105;
my.FIRE_BULLET = 106;
my.NORMAL_BULLET = 107;
my.graveyard = [];
my.gameOver = false;
my.score = 0;
my.scoreLabel = null;
my.lifeLabel = null;
my.bgLayer = 0;
my.spriteLayer = 10;
my.fgLayer = 100;

b2.b2Vec2 = Box2D.Common.Math.b2Vec2;
b2.b2BodyDef = Box2D.Dynamics.b2BodyDef;
b2.b2Body = Box2D.Dynamics.b2Body;
b2.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
b2.b2World = Box2D.Dynamics.b2World;
b2.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
b2.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
b2.b2ContactListener = Box2D.Dynamics.b2ContactListener;