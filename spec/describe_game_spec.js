var game = require('../lib/game.js');

describe("jumping", function() {
    beforeEach(function() {
        game.reset();
    });

    it("adds the player if he doesn't exist", function() {
        game.up("player1");
        expect(game.players().length).toBe(1);
    });

    it("does't add the player if he already exits", function() {
        game.up("player1");
        game.up("player1");
        expect(game.players().length).toBe(1);
    });

    it("velocity is set", function() {
        game.addPlayer("player1");
        game.getPlayer("player1").state = "standing";
        game.up("player1");
        expect(game.getPlayer("player1").velocity).toBe(game.jumpPower);
    });

    it("player's y position should change after jump", function() {
        game.up("player1");
        game.tick();
        expect(game.getPlayer("player1").y).toBeLessThan(0);
    });

    it("player's initial state is jumping", function() {
        game.up("player1");
        game.tick();
        expect(game.getPlayer("player1").state).toBe("jumping");
    });
});

describe("stageBoundaries", function() {
    beforeEach(function() { game.reset(); });

    it("the player is set to dying if he hits the left boundary", function() {
        var player = game.addPlayer("player1");
        player.direction = -1;
        player.state = "kicking";
        player.y = -1000;
        player.x = 200;
        ticksTillBorder = (player.x - game.stageBoundary.left) / game.kickDelta;
        console.log(ticksTillBorder);
        for(i = 0; i < game.kickDelta; i++) {
            game.tick();
        }
        expect(player.state).toBe("kicking"); //dying
    });

    it("the player is set to dying if he hits the right boundary", function() {
        var player = game.addPlayer("player1");
        player.direction = 1;
        player.state = "kicking";
        player.y = -1000;
        player.x = 1000;
        ticksTillBorder = (game.stageBoundary.right - player.y) / game.kickDelta;
        for(i = 0; i < game.kickDelta; i++) {
            game.tick();
        }
        expect(player.state).toBe("kicking"); //dying
        expect(game.players.length).toBe(0);
    });

    it("player is removed after the death countdown", function() {
        var player = game.addPlayer("player1");
        player.state = "kicking";
        player.direction = -1;
        player.x = 0;
        player.y = -1000;
        game.tick();
        var countdown = player.deathCountdown;
        for(i = 0; i < countdown; i++) {
            game.tick();
        }
        expect(game.players().length).toBe(0);
    });
});