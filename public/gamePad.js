(function() {
    var gamePad = {
        keyState: {},
        methodMap: {
            "36": "left",
            "37": "up",
            "38": "right"
        },
        left: function() {},
        right: function() {},
        up: function() {}
    }

    gamePad.init = function() {
        for(var key in gamePad.methodMap) gamePad.keyState[key] = "up";
        
        $(document).keydown(function(e) {
            if(gamePad.keyState[e.keyCode] == "up") {
                gamePad.keyState[e.keyCode] = "down";
                var methodToCall = gamePad.methodMap[e.code];
                if(methodToCall) gamePad[methodToCall]();
            }
        });

        $(document).keyup(function(e) {
            gamePad.keyState[e.keyCode] = "up";
        });
    };

    app.gamePad = gamePad;
})();