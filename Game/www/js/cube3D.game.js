/* global Bridge */

"use strict";

Bridge.define('Cube3D.Game.Game', {
    config: {
        properties: {
            GameObjects: null,
            Player: null
        }
    },
    constructor: function (playerName) {
        this.setPlayer(new Cube3D.Game.Player(playerName));
    }
});

Bridge.define('Cube3D.Game.GameObject');

Bridge.define('Cube3D.Game.Monster', {
    inherits: [Cube3D.Game.GameObject]
});

Bridge.define('Cube3D.Game.Item', {
    inherits: [Cube3D.Game.GameObject]
});

Bridge.define('Cube3D.Game.Player', {
    config: {
        properties: {
            Name: null
        }
    },
    constructor: function (playerName) {
        this.setName(playerName);
    }
});



Bridge.init();