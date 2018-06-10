var _ = require('underscore');

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function Player(playerId) {
    this.id = playerId;
    this.x = _.random(100, 1200);
    this.y = -700;
    this.state = "jumping";
    this.direction = 1;
    this.velocity = 0;
    this.deathState = null;
    this.deathCountdown = null;
    this.isJumping = function() { return this.state == "jumping"; };
    this.isStanding = function() { return this.state == "standing"; };
    this.isKicking = function() { return this.state == "kicking"; };
    this.isDying = function() { return this.state == "dying"; };
    this.up = function(velocity) {
        if(this.isDying()) return;
        if(!this.isStanding()) return;
        this.state = "jumping";
        this.velocity = velocity;
    };
    this.left = function() {
        if(this.isDying()) return;
        this.direction = -1;
        if(!this.isJumping()) return;
        this.state = "kicking";
    }
    this.right = function() {
        if(this.isDying()) return;
        this.direction = 1;
        if(!this.isJumping()) return;
        this.state = "kicking";
    }
    this.boxes = function(boxes) {
        if(this.isDying()) return null;
        var boxesForUser = clone(boxes[this.direction][this.state]);

        _.each(boxesForUser, function(box) {
            box.x += this.x;
            box.y += this.y;
            box.x2 += this.x;
            box.y2 += this.y;
        }, this);
        return boxesForUser;
    };
    this.foot = function(boxes) {
        if(!this.isKicking()) return null;
        return _.last(this.boxes(boxes));
    };
}

exports.Player = Player;