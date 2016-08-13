/* global Bridge */

"use strict";

Bridge.define('Game3D.Game.Game', {
    config: {
        properties: {
            GameObjects: null,
            Player: null
        }
    },
    constructor: function (playerName) {
        this.setPlayer(new Game3D.Game.Player(playerName));
    }
});

Bridge.define('Game3D.Game.GameObject', {
    config: {
        properties: {
            Name: null,
            Animation: null
        },
        init: function () {
            Bridge.property(this, "Position", new Game3D.Helpers.Vector3());
        }
    }
});

/** @namespace Game3D.Game */

/**
 * Game object that can be in inventory
 *
 * @public
 * @class Game3D.Game.ItemGameObject
 * @augments Game3D.Game.GameObject
 */
Bridge.define('Game3D.Game.ItemGameObject', {
    inherits: [Game3D.Game.GameObject],
    config: {
        properties: {
            /**
             * Item's price
             *
             * @instance
             * @public
             * @this Game3D.Game.ItemGameObject
             * @memberof Game3D.Game.ItemGameObject
             * @function getPrice
             * @return  {number}
             */
            /**
             * Item's price
             *
             * @instance
             * @public
             * @this Game3D.Game.ItemGameObject
             * @memberof Game3D.Game.ItemGameObject
             * @function setPrice
             * @param   {number}    value
             * @return  {void}
             */
            Price: 0
        }
    }
});

/**
 * Actors like NPCs and monsters
 *
 * @public
 * @class Game3D.Game.ActorGameObject
 * @augments Game3D.Game.GameObject
 */
Bridge.define('Game3D.Game.ActorGameObject', {
    inherits: [Game3D.Game.GameObject],
    config: {
        properties: {
            /**
             * Determines, whether this actor is friendly to player
             *
             * @instance
             * @public
             * @this Game3D.Game.ActorGameObject
             * @memberof Game3D.Game.ActorGameObject
             * @function getFriendly
             * @return  {boolean}
             */
            /**
             * Determines, whether this actor is friendly to player
             *
             * @instance
             * @public
             * @this Game3D.Game.ActorGameObject
             * @memberof Game3D.Game.ActorGameObject
             * @function setFriendly
             * @param   {boolean}    value
             * @return  {void}
             */
            Friendly: false
        }
    }
});

/**
 * Inventory class
 *
 * @public
 * @class Game3D.Game.Inventory
 */
Bridge.define('Game3D.Game.Inventory', {
    config: {
        properties: {
            /**
             * List of all items in inventory
             *
             * @instance
             * @public
             * @this Game3D.Game.Inventory
             * @memberof Game3D.Game.Inventory
             * @function getItems
             * @return  {System.Collections.Generic.List$1}
             */
            /**
             * List of all items in inventory
             *
             * @instance
             * @function setItems
             */
            Items: null,
            /**
             * Gold amount
             *
             * @instance
             * @public
             * @this Game3D.Game.Inventory
             * @memberof Game3D.Game.Inventory
             * @function getGold
             * @return  {number}
             */
            /**
             * Gold amount
             *
             * @instance
             * @private
             * @this Game3D.Game.Inventory
             * @memberof Game3D.Game.Inventory
             * @function setGold
             * @param   {number}    value
             * @return  {void}
             */
            Gold: 0
        }
    },
    /**
     * Default constructor
     *
     * @instance
     * @public
     * @this Game3D.Game.Inventory
     * @memberof Game3D.Game.Inventory
     * @return  {void}
     */
    constructor: function () {

    },
    /**
     * Clears whole inventory.
     *
     * @instance
     * @public
     * @this Game3D.Game.Inventory
     * @memberof Game3D.Game.Inventory
     * @return  {void}
     */
    clear: function () {
        this.getItems().clear();
        this.setGold(0);
    },
    /**
     * Picks up gold.
     *
     * @instance
     * @public
     * @this Game3D.Game.Inventory
     * @memberof Game3D.Game.Inventory
     * @param   {number}    amount    Amount of gold picked up
     * @return  {void}
     */
    pickupGold: function (amount) {
        this.setGold(this.getGold()+amount);
    },
    /**
     * Picks up all gold from given inventory.
     *
     * @instance
     * @public
     * @this Game3D.Game.Inventory
     * @memberof Game3D.Game.Inventory
     * @param   {Game3D.Game.Inventory}    inventory    Inventory to pickup gold from
     * @return  {void}
     */
    pickupGoldFromInventory: function (inventory) {
        this.pickupGold(inventory.getGold());
        inventory.dropGold(inventory.getGold());
    },
    /**
     * Drops given amount of gold from inventory, and checks, if there is enough gold.
     *
     * @instance
     * @public
     * @this Game3D.Game.Inventory
     * @memberof Game3D.Game.Inventory
     * @param   {number}     amount    Amount of gold to drop
     * @return  {boolean}              Returns true if there is enough gold in inventory
     */
    dropGold: function (amount) {
        if (amount >= this.getGold()) {
            this.setGold(this.getGold()-amount);
            return true;
        }
        else  {
            return false;
        }
    },
    /**
     * Drops item from inventory.
     *
     * @instance
     * @public
     * @this Game3D.Game.Inventory
     * @memberof Game3D.Game.Inventory
     * @param   {Game3D.Game.ItemGameObject}    obj    Item to drop
     * @return  {void}
     */
    dropItem: function (obj) {
        this.getItems().remove(obj);
    },
    /**
     * Picks up content of given inventory.
     *
     * @instance
     * @public
     * @this Game3D.Game.Inventory
     * @memberof Game3D.Game.Inventory
     * @param   {Game3D.Game.Inventory}    inventory    Inventory to take from
     * @return  {void}
     */
    pickupWholeInventory: function (inventory) {
        var $t;
        $t = Bridge.getEnumerator(inventory.getItems());
        while ($t.moveNext()) {
            var i = $t.getCurrent();
            this.getItems().add(i);
        }

        this.setGold(this.getGold()+inventory.getGold());
        inventory.clear();
    }
});

Bridge.define('Game3D.Game.Player', {
    config: {
        properties: {
            Name: null,
            Inventory: null
        }
    },
    constructor: function (playerName) {
        this.setName(playerName);
    }
});



Bridge.init();