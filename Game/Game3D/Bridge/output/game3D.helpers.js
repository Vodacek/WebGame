/* global Bridge */

"use strict";

/** @namespace Game3D.Helpers */

/**
 * Simple integer point class
 *
 * @public
 * @class Game3D.Helpers.Point
 */
Bridge.define('Game3D.Helpers.Point', {
    config: {
        properties: {
            /**
             * X position
             *
             * @instance
             * @public
             * @this Game3D.Helpers.Point
             * @memberof Game3D.Helpers.Point
             * @function getX
             * @return  {number}
             */
            /**
             * X position
             *
             * @instance
             * @public
             * @this Game3D.Helpers.Point
             * @memberof Game3D.Helpers.Point
             * @function setX
             * @param   {number}    value
             * @return  {void}
             */
            X: 0,
            /**
             * Y position
             *
             * @instance
             * @public
             * @this Game3D.Helpers.Point
             * @memberof Game3D.Helpers.Point
             * @function getY
             * @return  {number}
             */
            /**
             * Y position
             *
             * @instance
             * @public
             * @this Game3D.Helpers.Point
             * @memberof Game3D.Helpers.Point
             * @function setY
             * @param   {number}    value
             * @return  {void}
             */
            Y: 0
        }
    },
    /**
     * Default constructor
     *
     * @instance
     * @public
     * @this Game3D.Helpers.Point
     * @memberof Game3D.Helpers.Point
     * @return  {void}
     */
    constructor: function () {
        this.setX(0);
        this.setY(0);
    },
    /**
     * Constructor with values
     *
     * @instance
     * @public
     * @this Game3D.Helpers.Point
     * @memberof Game3D.Helpers.Point
     * @param   {number}    x    X position
     * @param   {number}    y    Y position
     * @return  {void}
     */
    constructor$1: function (x, y) {
        this.setX(x);
        this.setY(y);
    }
});

Bridge.define('Game3D.Helpers.RectangleF', {
    config: {
        init: function () {
            Bridge.property(this, "TopLeft", new Game3D.Helpers.Vector2());
            Bridge.property(this, "BottomRight", new Game3D.Helpers.Vector2());
        }
    },
    constructor$1: function (topLeft, bottomRight) {
        this.setTopLeft(topLeft.$clone());
        this.setBottomRight(bottomRight.$clone());
    },
    constructor$2: function (top, left, bottom, right) {
        this.setTopLeft(new Game3D.Helpers.Vector2("constructor$1", left, top));
        this.setBottomRight(new Game3D.Helpers.Vector2("constructor$1", right, bottom));
    },
    constructor: function () {
    },
    getHashCode: function () {
        var hash = 17;
        hash = hash * 23 + (this.TopLeft == null ? 0 : Bridge.getHashCode(this.TopLeft));
        hash = hash * 23 + (this.BottomRight == null ? 0 : Bridge.getHashCode(this.BottomRight));
        return hash;
    },
    equals: function (o) {
        if (!Bridge.is(o,Game3D.Helpers.RectangleF)) {
            return false;
        }
        return Bridge.equals(this.TopLeft, o.TopLeft) && Bridge.equals(this.BottomRight, o.BottomRight);
    },
    $clone: function (to) {
        var s = to || new Game3D.Helpers.RectangleF();
        s.TopLeft = this.TopLeft;
        s.BottomRight = this.BottomRight;
        return s;
    }
});

/**
 * Basic 2D vector
 *
 * @public
 * @class Game3D.Helpers.Vector2
 */
Bridge.define('Game3D.Helpers.Vector2', {
    statics: {
        /**
         * Zero vector
         *
         * @static
         * @public
         * @this Game3D.Helpers.Vector2
         * @memberof Game3D.Helpers.Vector2
         * @function getZERO
         * @return  {Game3D.Helpers.Vector2}
         */
        /**
         * Zero vector
         *
         * @instance
         * @function setZERO
         */
        getZERO: function () {
            return new Game3D.Helpers.Vector2("constructor$1", 0, 0);
        },
        /**
         * Counts distance between two vectors
         *
         * @static
         * @public
         * @this Game3D.Helpers.Vector2
         * @memberof Game3D.Helpers.Vector2
         * @param   {Game3D.Helpers.Vector2}    a    
         * @param   {Game3D.Helpers.Vector2}    b
         * @return  {number}
         */
        distanceFrom: function (a, b) {
            return Bridge.cast(Bridge.get(Math).sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)), System.Single);
        }/**
         * operator +
         *
         * @static
         * @public
         * @this Game3D.Helpers.Vector2
         * @memberof Game3D.Helpers.Vector2
         * @param   {Game3D.Helpers.Vector2}    a    
         * @param   {Game3D.Helpers.Vector2}    b
         * @return  {Game3D.Helpers.Vector2}
         */
        ,
        op_Addition: function (a, b) {
            return new Game3D.Helpers.Vector2("constructor$1", a.x + b.x, a.y + b.y);
        }/**
         * operator *
         *
         * @static
         * @public
         * @this Game3D.Helpers.Vector2
         * @memberof Game3D.Helpers.Vector2
         * @param   {Game3D.Helpers.Vector2}    a    
         * @param   {number}                    b
         * @return  {Game3D.Helpers.Vector2}
         */
        ,
        op_Multiply: function (a, b) {
            return new Game3D.Helpers.Vector2("constructor$1", a.x * b, a.y * b);
        }/**
         * operator /
         *
         * @static
         * @public
         * @this Game3D.Helpers.Vector2
         * @memberof Game3D.Helpers.Vector2
         * @param   {Game3D.Helpers.Vector2}    a    
         * @param   {number}                    b
         * @return  {Game3D.Helpers.Vector2}
         */
        ,
        op_Division: function (a, b) {
            return new Game3D.Helpers.Vector2("constructor$1", a.x / b, a.y / b);
        }/**
         * operator -
         *
         * @static
         * @public
         * @this Game3D.Helpers.Vector2
         * @memberof Game3D.Helpers.Vector2
         * @param   {Game3D.Helpers.Vector2}    a    
         * @param   {Game3D.Helpers.Vector2}    b
         * @return  {Game3D.Helpers.Vector2}
         */
        ,
        op_Subtraction: function (a, b) {
            return new Game3D.Helpers.Vector2("constructor$1", a.x - b.x, a.y - b.y);
        }/**
         * operator equals
         *
         * @static
         * @public
         * @this Game3D.Helpers.Vector2
         * @memberof Game3D.Helpers.Vector2
         * @param   {Game3D.Helpers.Vector2}    a    vector a
         * @param   {Game3D.Helpers.Vector2}    b    vector b
         * @return  {boolean}                        Returns whether the vectors are equal
         */
        ,
        op_Equality: function (a, b) {
            return a.x === b.x && a.y === b.y;
        },
        op_Inequality: function (a, b) {
            return !(Game3D.Helpers.Vector2.op_Equality(a, b));
        }
    },
    /**
     * X value
     *
     * @instance
     * @public
     * @memberof Game3D.Helpers.Vector2
     * @type number
     */
    x: 0,
    /**
     * Y value
     *
     * @instance
     * @public
     * @memberof Game3D.Helpers.Vector2
     * @type number
     */
    y: 0,
    /**
     * Constructor
     *
     * @instance
     * @public
     * @this Game3D.Helpers.Vector2
     * @memberof Game3D.Helpers.Vector2
     * @param   {number}    x    X value
     * @param   {number}    y    Y value
     * @return  {void}
     */
    constructor$1: function (x, y) {
        this.x = x;
        this.y = y;
    },
    constructor: function () {
    },
    /**
     * Vector Length
     *
     * @instance
     * @public
     * @this Game3D.Helpers.Vector2
     * @memberof Game3D.Helpers.Vector2
     * @function getLength
     * @return  {number}
     */
    /**
     * Vector Length
     *
     * @instance
     * @function setLength
     */
    getLength: function () {
        return Bridge.cast(Bridge.get(Math).sqrt(this.x * this.x + this.y * this.y), System.Single);
    },
    /**
     * Returns normalized vector
     *
     * @instance
     * @public
     * @this Game3D.Helpers.Vector2
     * @memberof Game3D.Helpers.Vector2
     * @return  {Game3D.Helpers.Vector2}        Normalized vector
     */
    normalize: function () {
        var tmp = new Game3D.Helpers.Vector2("constructor$1", this.x, this.y);
        var len = tmp.getLength();
        if (len !== 0) {
            tmp.x = tmp.x / this.getLength();
            tmp.y = tmp.y / this.getLength();
        }
        return tmp.$clone();
    },
    /**
     * ToString method
     *
     * @instance
     * @public
     * @override
     * @this Game3D.Helpers.Vector2
     * @memberof Game3D.Helpers.Vector2
     * @return  {string}        Vector in string format
     */
    toString: function () {
        return System.String.format("Float2: {0}, {1}", this.x, this.y);
    },
    getHashCode: function () {
        var hash = 17;
        hash = hash * 23 + (this.x == null ? 0 : Bridge.getHashCode(this.x));
        hash = hash * 23 + (this.y == null ? 0 : Bridge.getHashCode(this.y));
        return hash;
    },
    equals: function (o) {
        if (!Bridge.is(o,Game3D.Helpers.Vector2)) {
            return false;
        }
        return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y);
    },
    $clone: function (to) {
        var s = to || new Game3D.Helpers.Vector2();
        s.x = this.x;
        s.y = this.y;
        return s;
    }
});

/**
 * Basic 2D vector
 *
 * @public
 * @class Game3D.Helpers.Vector3
 */
Bridge.define('Game3D.Helpers.Vector3', {
    statics: {
        /**
         * Zero vector
         *
         * @static
         * @public
         * @this Game3D.Helpers.Vector3
         * @memberof Game3D.Helpers.Vector3
         * @function getZERO
         * @return  {Game3D.Helpers.Vector3}
         */
        /**
         * Zero vector
         *
         * @instance
         * @function setZERO
         */
        getZERO: function () {
            return new Game3D.Helpers.Vector3("constructor$1", 0, 0, 0);
        },
        /**
         * Counts distance between two vectors
         *
         * @static
         * @public
         * @this Game3D.Helpers.Vector3
         * @memberof Game3D.Helpers.Vector3
         * @param   {Game3D.Helpers.Vector3}    a    
         * @param   {Game3D.Helpers.Vector3}    b
         * @return  {number}
         */
        distanceFrom: function (a, b) {
            return Bridge.cast(Bridge.get(Math).sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z)), System.Single);
        }/**
         * operator +
         *
         * @static
         * @public
         * @this Game3D.Helpers.Vector3
         * @memberof Game3D.Helpers.Vector3
         * @param   {Game3D.Helpers.Vector3}    a    
         * @param   {Game3D.Helpers.Vector3}    b
         * @return  {Game3D.Helpers.Vector3}
         */
        ,
        op_Addition: function (a, b) {
            return new Game3D.Helpers.Vector3("constructor$1", a.x + b.x, a.y + b.y, a.z + b.z);
        }/**
         * operator -
         *
         * @static
         * @public
         * @this Game3D.Helpers.Vector3
         * @memberof Game3D.Helpers.Vector3
         * @param   {Game3D.Helpers.Vector3}    a    
         * @param   {Game3D.Helpers.Vector3}    b
         * @return  {Game3D.Helpers.Vector3}
         */
        ,
        op_Subtraction: function (a, b) {
            return new Game3D.Helpers.Vector3("constructor$1", a.x - b.x, a.y - b.y, a.z - b.z);
        },
        op_Equality: function (a, b) {
            return a.x === b.x && a.y === b.y && a.z === b.z;
        },
        op_Inequality: function (a, b) {
            return !(Game3D.Helpers.Vector3.op_Equality(a, b));
        }
    },
    /**
     * X value
     *
     * @instance
     * @public
     * @memberof Game3D.Helpers.Vector3
     * @type number
     */
    x: 0,
    /**
     * Y value
     *
     * @instance
     * @public
     * @memberof Game3D.Helpers.Vector3
     * @type number
     */
    y: 0,
    /**
     * Z value
     *
     * @instance
     * @public
     * @memberof Game3D.Helpers.Vector3
     * @type number
     */
    z: 0,
    /**
     * Constructor
     *
     * @instance
     * @public
     * @this Game3D.Helpers.Vector3
     * @memberof Game3D.Helpers.Vector3
     * @param   {number}    x    X value
     * @param   {number}    y    Y value
     * @param   {number}    z    Z value
     * @return  {void}
     */
    constructor$1: function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    },
    constructor: function () {
    },
    /**
     * Vector Length
     *
     * @instance
     * @public
     * @this Game3D.Helpers.Vector3
     * @memberof Game3D.Helpers.Vector3
     * @function getLength
     * @return  {number}
     */
    /**
     * Vector Length
     *
     * @instance
     * @function setLength
     */
    getLength: function () {
        return Bridge.cast(Bridge.get(Math).sqrt(this.x * this.x + this.y * this.y + this.z * this.z), System.Single);
    },
    /**
     * Returns normalized vector
     *
     * @instance
     * @public
     * @this Game3D.Helpers.Vector3
     * @memberof Game3D.Helpers.Vector3
     * @return  {Game3D.Helpers.Vector3}        Normalized vector
     */
    normalize: function () {
        var tmp = new Game3D.Helpers.Vector3("constructor$1", this.x, this.y, this.z);
        var len = tmp.getLength();
        if (len !== 0) {
            tmp.x = tmp.x / this.getLength();
            tmp.y = tmp.y / this.getLength();
            tmp.z = tmp.z / this.getLength();
        }
        return tmp.$clone();
    },
    /**
     * ToString method
     *
     * @instance
     * @public
     * @override
     * @this Game3D.Helpers.Vector3
     * @memberof Game3D.Helpers.Vector3
     * @return  {string}        Vector in string format
     */
    toString: function () {
        return System.String.format("Float2: {0}, {1}, {2}", this.x, this.y, this.z);
    },
    getHashCode: function () {
        var hash = 17;
        hash = hash * 23 + (this.x == null ? 0 : Bridge.getHashCode(this.x));
        hash = hash * 23 + (this.y == null ? 0 : Bridge.getHashCode(this.y));
        hash = hash * 23 + (this.z == null ? 0 : Bridge.getHashCode(this.z));
        return hash;
    },
    equals: function (o) {
        if (!Bridge.is(o,Game3D.Helpers.Vector3)) {
            return false;
        }
        return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y) && Bridge.equals(this.z, o.z);
    },
    $clone: function (to) {
        var s = to || new Game3D.Helpers.Vector3();
        s.x = this.x;
        s.y = this.y;
        s.z = this.z;
        return s;
    }
});



Bridge.init();