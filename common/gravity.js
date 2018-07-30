(function() {
    var backPedalX = 10;
    var backPedalY = 20;
    var kickDelta = 10;
    var jumpPower = 25;
    var downwardForce = 1;
    var stageBoundary = { left: 0, right: 1280 };
    stageBoundary.center = (stageBoundary.left + stageBoundary.right) / 2;

    function tick(player) {
        if(player.state == "dying") return;

        if(player.state == "jumping") {
            player.x -= player.velocityX;
            player.y -= player.velocityY;
            velocityY -= downwardForce;
        }

        if(player.state == "kicking") {
            player.x += kickDelta * player.direction;
            player.y += kickDelta;
        }

        if(player.y > 0) {
            player.y = 0;
            player.state = "standing";
        }
    }

    if(typeof exports == "undefined") {
        app.gravity = { };
        exports = app.gravity;
    }

    exports.jumpPower = jumpPower;
    exports.backPedalX = backPedalX;
    exports.backPedalY = backPedalY;
    exports.kickDelta = kickDelta;
    exports.downwardForce = downwardForce;
    exports.stageBoundary = stageBoundary;
    exports.tick = tick;
})();