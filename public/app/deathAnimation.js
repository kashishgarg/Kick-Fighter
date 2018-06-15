(function() {
    var c, canvas, deathCanvas, deathContext = null;
    var maxDeathCountDown = 60;
    var dyingPlayers = { };

    function init() {
        var sprites = app.game.sprites;
        canvas = window.document.getElementById('stage');
        c = canvas.getContext('2d');
        deathCanvas = window.document.getElementById('deathCanvas');
        deathContext = deathCanvas.getContext('2d');
    }

    function animate(player, sprite, canvasX, canvasY) {
        if(!dyingPlayers[player.id]) {
            dyingPlayers[player.id] = {
                id: player.id,
                deathCountDown: maxDeathCountDown,
                sprite: sprite,
                x: canvasX,
                y: canvasY
            };
        }
    }

    function draw() {
        for(var key in dyingPlayers) {
            var player = dyingPlayers[key];
            deathContext.clearRect(0, 0, 75, 150);
            deathContext.drawImage(sprite, 0, 0, 75, 150, 0, 0, 75, 150);
            var stageSource = c.getImageData(canvasX, canvasY, 75, 150);
            var deathImage = deathContext.getImageData(0, 0, 75, 150);
            var length = deathImage.data.length;
            var alphaPercentage = player.deathCountdown / maxDeathCountdown;

            for(var i = 3; i < length; i+=4) {
                if(deathImage.data[i] > 0 && deathImage.data[i - 1] > 0 && 
                    deathImage.data[i - 2] > 0 && deathImage.data[i - 3] > 0) {
                    deathImage.data[i - 1] = deathImage.data[i - 1] + 150;
                    deathImage.data[i - 2] = deathImage.data[i - 2] + 150;
                    deathImage.data[i - 3] = deathImage.data[i - 3] + 150;
                    deathImage.data[i] *= alphaPercentage;
                }
            }

            deathContext.putImageData(stageSource, 0, 0);
            var mixedWithStage = deathContext.getImageData(0, 0, 75, 150);
            for(var i = 3; i < length; i+=4) {
                if(deathImage.data[i] > 0 && deathImage.data[i - 1] > 0 && 
                    deathImage.data[i - 2] > 0 && deathImage.data[i - 3] > 0) {
                        mixedWithStage.data[i-1] = deathImage.data[i-1];
                        mixedWithStage.data[i-2] = deathImage.data[i-2];
                        mixedWithStage.data[i-3] = deathImage.data[i-3];
                        mixedWithStage[i] = deathImage.data[i];
                }
            }

            c.putImageData(mixedWithStage, player.x, player.y);
            if(player.deathCountDown <= 0) {
                delete dyingPlayers[player.id];
            }

        }
    }

    app.deathAnimation = { };
    app.deathAnimation.init = init;
    app.deathAnimation.draw = draw;
    app.deathAnimation.animate = animate;
})();