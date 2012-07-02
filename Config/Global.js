/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 11:25 AM
 * To change this template use File | Settings | File Templates.
 */

var cc, Box2D, b2, my;
cc = cc = cc || {};
Box2D = Box2D = Box2D || {};
b2 = b2 = b2 || {};
my = my = my || {};

my.TILE_SIZE = 32;
my.CIRCLE_SHAPE = 100;
my.BOX_SHAPE = 101;
my.EnemyType = 102;
my.HeroType = 103;
my.BulletType = 104;
my.BaffleType = 105;
my.graveyard = [];

b2.b2Vec2 = Box2D.Common.Math.b2Vec2;
b2.b2BodyDef = Box2D.Dynamics.b2BodyDef;
b2.b2Body = Box2D.Dynamics.b2Body;
b2.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
b2.b2World = Box2D.Dynamics.b2World;
b2.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
b2.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
b2.b2ContactListener = Box2D.Dynamics.b2ContactListener;