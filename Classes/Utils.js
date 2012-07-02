/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/2/12
 * Time: 8:36 PM
 * To change this template use File | Settings | File Templates.
 */

var my;
my = my = my || {};

my.r_a_point = function (point) {
    var absPoint = {x : point.x * my.TILE_SIZE, y : point.y * my.TILE_SIZE};
    return absPoint;
};

my.a_r_point = function (point) {
    var relPoint = {x : point.x / my.TILE_SIZE, y : point.y / my.TILE_SIZE};
    return relPoint;
};