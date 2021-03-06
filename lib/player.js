var _ = require('underscore');
var gravity = require('../common/gravity.js');

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

class Player {
    constructor(playerId) {
        var stageLeft = 100;
        var stageRight = 1200;
        var center = (stageLeft + stageRight) / 2.0;
        this.id = playerId;
        this.x = _.random(100, 1200);
        this.y = -700;
        this.velocityX = 0;
        this.velocityY = 0;
        this.state = "jumping";
        this.direction = 1;
        if (this.x < center)
            this.direction = -1;
        this.deathState = null;
        this.deathCountdown = null;
        this.isJumping = function () { return this.state == "jumping"; };
        this.isStanding = function () { return this.state == "standing"; };
        this.isKicking = function () { return this.state == "kicking"; };
        this.isDying = function () { return this.state == "dying"; };
        this.jump = function(velocityX, velocityY) {
            this.state = "jumping";
            this.velocityY = velocityY;
            this.velocityX = velocityX;
        }
        this.up = function () {
            if (this.isDying()) return;
            if (!this.isStanding()) return;
            this.jump(0, gravity.jumpPower);
            this.velocityX = 0;
        };
        this.left = function () {
            if (this.isDying())
                return;
            if (this.isKicking())
                return;
            this.direction = -1;
            if (!this.isJumping())
                return;
            this.state = "kicking";
        };
        this.right = function () {
            if (this.isDying())
                return;
            if (this.isKicking())
                return;
            this.direction = 1;
            if (!this.isJumping())
                return;
            this.state = "kicking";
        };
        this.down = function () {
            if (this.isDying())
                return;
            if (this.isStanding())
                return;
            this.jump(gravity.backPedalX * this.direction, gravity.backPedalY);

        };
        this.boxes = function (boxes) {
            if (this.isDying())
                return null;
            var boxesForUser = clone(boxes[this.direction][this.state]);
            _.each(boxesForUser, function (box) {
                box.x += this.x;
                box.y += this.y;
                box.x2 += this.x;
                box.y2 += this.y;
            }, this);
            return boxesForUser;
        };
        this.foot = function (boxes) {
            if (!this.isKicking())
                return null;
            return _.last(this.boxes(boxes));
        };
    }
}

exports.Player = Player;