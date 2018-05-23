var game = require('../lib/game.js');

describe("jumping", function() {
    beforeEach(function() {
        game.reset();
    });

    it("adds the player if he doesn't exist", function() {
        game.jump("player1");
        expect(game.players().length).toBe(1);
    });

    it("does't add the player if he already exits", function() {
        game.jump("player1");
        game.jump("player1");
        expect(game.players().length).toBe(1);
    });

});