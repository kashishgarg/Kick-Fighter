var _ = require('underscore');

function Player(playerId) {
    this.id = playerId;
    this.x = _.random(100, 1200);
    this.y = -700;
    this.state = "jumping";
    this.direction = 1;
    this.velocity = 0;
    function isJumping() { return this.state == "jumping"; }
    function isStanding() { return this.state == "standing"; }
    function isKicking() { return this.state == "kicking"; }
    this.jump = function(velocity) {
        if(!this.isStanding()) return;
        this.state = "jumping";
        this.velocity = velocity;
    };
    this.left = function() {
        this.direction = -1;
        if(!this.isJumping()) return;
        this.state = "kicking";
    }
    this.right = function() {
        this.direction = 1;
        if(!this.isJumping()) return;
        this.state = "kicking";
    }
}

exports.Player = Player;