/* global Bridge */

"use strict";

Bridge.define('Game3D.Rendering.Animation', {
    elapsedTime: 0,
    config: {
        properties: {
            /**
             * Gets or sets the animation type
             *
             * @instance
             * @public
             * @this Game3D.Rendering.Animation
             * @memberof Game3D.Rendering.Animation
             * @function getAnimType
             * @return  {Game3D.Rendering.AnimationType}
             */
            /**
             * Gets or sets the animation type
             *
             * @instance
             * @public
             * @this Game3D.Rendering.Animation
             * @memberof Game3D.Rendering.Animation
             * @function setAnimType
             * @param   {Game3D.Rendering.AnimationType}    value
             * @return  {void}
             */
            AnimType: null,
            /**
             * Determines, whether the animation should be looped
             *
             * @instance
             * @public
             * @this Game3D.Rendering.Animation
             * @memberof Game3D.Rendering.Animation
             * @function getLoop
             * @return  {boolean}
             */
            /**
             * Determines, whether the animation should be looped
             *
             * @instance
             * @public
             * @this Game3D.Rendering.Animation
             * @memberof Game3D.Rendering.Animation
             * @function setLoop
             * @param   {boolean}    value
             * @return  {void}
             */
            Loop: false,
            /**
             * Determines, how many seconds the frame lasts
             *
             * @instance
             * @public
             * @this Game3D.Rendering.Animation
             * @memberof Game3D.Rendering.Animation
             * @function getFrameLength
             * @return  {number}
             */
            /**
             * Determines, how many seconds the frame lasts
             *
             * @instance
             * @public
             * @this Game3D.Rendering.Animation
             * @memberof Game3D.Rendering.Animation
             * @function setFrameLength
             * @param   {number}    value
             * @return  {void}
             */
            FrameLength: 0,
            /**
             * Gets name of currently selected animation
             *
             * @instance
             * @public
             * @this Game3D.Rendering.Animation
             * @memberof Game3D.Rendering.Animation
             * @function getSelectedAnimation
             * @return  {string}
             */
            /**
             * Gets name of currently selected animation
             *
             * @instance
             * @private
             * @this Game3D.Rendering.Animation
             * @memberof Game3D.Rendering.Animation
             * @function setSelectedAnimation
             * @param   {string}    value
             * @return  {void}
             */
            SelectedAnimation: null
        }
    },
    /**
     * Constructor
     *
     * @instance
     * @public
     * @this Game3D.Rendering.Animation
     * @memberof Game3D.Rendering.Animation
     * @param   {Game3D.Rendering.AnimationType}    type           Animation type this animation can use
     * @param   {number}                            frameLength    Frame length in seconds
     * @return  {void}
     */
    constructor: function (type, frameLength) {
        if (frameLength === void 0) { frameLength = 0.1; }
        this.setAnimType(type);
        this.elapsedTime = 0;
        this.setFrameLength(this.getFrameLength());
    },
    /**
     * Gets the list of available animations
     *
     * @instance
     * @public
     * @this Game3D.Rendering.Animation
     * @memberof Game3D.Rendering.Animation
     * @function getAvailableAnimations
     * @return  {Bridge.IEnumerable$1}
     */
    /**
     * Gets the list of available animations
     *
     * @instance
     * @function setAvailableAnimations
     */
    getAvailableAnimations: function () {
        return this.getAnimType().getAnimations().getKeys();
    },
    /**
     * Updates the animation
     *
     * @instance
     * @public
     * @this Game3D.Rendering.Animation
     * @memberof Game3D.Rendering.Animation
     * @param   {number}    delta    Time since last update in seconds
     * @return  {void}
     */
    update: function (delta) {
        this.elapsedTime += delta;

        var totalAnimTime = this.getFrameLength() * this.getAnimType().getAnimations().get(this.getSelectedAnimation()).getFrameCount();

        if (!this.getLoop() && this.elapsedTime > totalAnimTime) {
            this.elapsedTime -= totalAnimTime;
        }
    },
    /**
     * Gets the current frame
     *
     * @instance
     * @public
     * @this Game3D.Rendering.Animation
     * @memberof Game3D.Rendering.Animation
     * @return  {Game3D.Rendering.AnimationFrame}        Returns animation frame containing texture and UV coords
     */
    getAnimationFrame: function () {
        var index = Bridge.Int.trunc((this.elapsedTime / this.getFrameLength()));
        return this.getAnimType().getFrame(this.getSelectedAnimation(), index);
    },
    /**
     * Changes the current active animation
     *
     * @instance
     * @public
     * @this Game3D.Rendering.Animation
     * @memberof Game3D.Rendering.Animation
     * @param   {string}    animation
     * @return  {void}
     */
    changeAnimation: function (animation) {
        this.setSelectedAnimation(animation);
        this.elapsedTime = 0;
    }
});

Bridge.define('Game3D.Rendering.AnimationEntry', {
    config: {
        properties: {
            /**
             * Animation entry frame count
             *
             * @instance
             * @public
             * @this Game3D.Rendering.AnimationEntry
             * @memberof Game3D.Rendering.AnimationEntry
             * @function getFrameCount
             * @return  {number}
             */
            /**
             * Animation entry frame count
             *
             * @instance
             * @public
             * @this Game3D.Rendering.AnimationEntry
             * @memberof Game3D.Rendering.AnimationEntry
             * @function setFrameCount
             * @param   {number}    value
             * @return  {void}
             */
            FrameCount: 0
        },
        init: function () {
            Bridge.property(this, "FirstFrame", new Game3D.Helpers.Vector2());
            Bridge.property(this, "FrameSize", new Game3D.Helpers.Vector2());
        }
    },
    /**
     * Constructor
     *
     * @instance
     * @public
     * @this Game3D.Rendering.AnimationEntry
     * @memberof Game3D.Rendering.AnimationEntry
     * @param   {Game3D.Helpers.Vector2}    firstFrame    Where the first frame starts (topleft corner)
     * @param   {Game3D.Helpers.Vector2}    frameSize     How big the frame is
     * @param   {number}                    frameCount    Animation entry frame count
     * @return  {void}
     */
    constructor: function (firstFrame, frameSize, frameCount) {
        this.setFirstFrame(firstFrame.$clone());
        this.setFrameSize(frameSize.$clone());
        this.setFrameCount(frameCount);
    },
    /**
     * Gets the frame rectanhle
     *
     * @instance
     * @public
     * @this Game3D.Rendering.AnimationEntry
     * @memberof Game3D.Rendering.AnimationEntry
     * @param   {number}                       index    Animation frame index
     * @return  {Game3D.Helpers.RectangleF}             Returns the UV coords in texture
     */
    getFrameRect: function (index) {
        var topLeft = new Game3D.Helpers.Vector2("constructor$1", this.getFirstFrame().x + this.getFrameSize().x * this.getFrameCount(), this.getFirstFrame().y);
        var bottomRight = new Game3D.Helpers.Vector2("constructor$1", topLeft.x + this.getFrameSize().x, topLeft.y + this.getFrameSize().y);
        return new Game3D.Helpers.RectangleF("constructor$1", topLeft.$clone(), bottomRight.$clone());
    }
});

Bridge.define('Game3D.Rendering.AnimationFrame', {
    config: {
        properties: {
            /**
             * Texture
             *
             * @instance
             * @public
             * @this Game3D.Rendering.AnimationFrame
             * @memberof Game3D.Rendering.AnimationFrame
             * @function getTexture
             * @return  {Bridge.WebGL.WebGLTexture}
             */
            /**
             * Texture
             *
             * @instance
             * @public
             * @this Game3D.Rendering.AnimationFrame
             * @memberof Game3D.Rendering.AnimationFrame
             * @function setTexture
             * @param   {Bridge.WebGL.WebGLTexture}    value
             * @return  {void}
             */
            Texture: null
        },
        init: function () {
            Bridge.property(this, "Rectangle", new Game3D.Helpers.RectangleF());
        }
    },
    /**
     * Animation frame
     *
     * @instance
     * @public
     * @this Game3D.Rendering.AnimationFrame
     * @memberof Game3D.Rendering.AnimationFrame
     * @param   {Game3D.Helpers.RectangleF}    rect       Frame UV rectangle
     * @param   {Bridge.WebGL.WebGLTexture}    texture    Frame texture
     * @return  {void}
     */
    constructor: function (rect, texture) {
        this.setRectangle(rect.$clone());
        this.setTexture(texture);
    }
});

Bridge.define('Game3D.Rendering.AnimationType', {
    config: {
        properties: {
            /**
             * Gets or sets the Texture
             *
             * @instance
             * @public
             * @this Game3D.Rendering.AnimationType
             * @memberof Game3D.Rendering.AnimationType
             * @function getTexture
             * @return  {Bridge.WebGL.WebGLTexture}
             */
            /**
             * Gets or sets the Texture
             *
             * @instance
             * @public
             * @this Game3D.Rendering.AnimationType
             * @memberof Game3D.Rendering.AnimationType
             * @function setTexture
             * @param   {Bridge.WebGL.WebGLTexture}    value
             * @return  {void}
             */
            Texture: null,
            /**
             * gets or
             *
             * @instance
             * @public
             * @this Game3D.Rendering.AnimationType
             * @memberof Game3D.Rendering.AnimationType
             * @function getAnimations
             * @return  {Bridge.Dictionary$2}
             */
            /**
             * gets or
             *
             * @instance
             * @private
             * @this Game3D.Rendering.AnimationType
             * @memberof Game3D.Rendering.AnimationType
             * @function setAnimations
             * @param   {Bridge.Dictionary$2}    value
             * @return  {void}
             */
            Animations: null
        }
    },
    constructor: function (texture) {
        this.setTexture(texture);
    },
    /**
     * Adds animation entry
     *
     * @instance
     * @public
     * @this Game3D.Rendering.AnimationType
     * @memberof Game3D.Rendering.AnimationType
     * @param   {string}                    name          Entry name
     * @param   {Game3D.Helpers.Vector2}    firstFrame    Where first frame start (topleft corner)
     * @param   {Game3D.Helpers.Vector2}    frameSize     Frame size
     * @param   {number}                    frameCount    Frame count in animation entry
     * @return  {void}
     */
    addAnimation: function (name, firstFrame, frameSize, frameCount) {
        this.getAnimations().add(name, new Game3D.Rendering.AnimationEntry(firstFrame.$clone(), frameSize.$clone(), frameCount));
    },
    /**
     * Gets the animation frame by name and index
     *
     * @instance
     * @public
     * @this Game3D.Rendering.AnimationType
     * @memberof Game3D.Rendering.AnimationType
     * @param   {string}                             animName    Animation frame
     * @param   {number}                             index       Frame index
     * @return  {Game3D.Rendering.AnimationFrame}                Returns AnimationFrame
     */
    getFrame: function (animName, index) {
        return new Game3D.Rendering.AnimationFrame(this.getAnimations().get(animName).getFrameRect(index), this.getTexture());
    }
});

Bridge.define('Game3D.Rendering.Camera');

Bridge.define('Game3D.Rendering.IDrawable');

Bridge.define('Game3D.Rendering.Sprite', {
    inherits: [Game3D.Rendering.IDrawable],
    animation: null,
    getAnimation: function () {
        return this.animation;
    },
    setAnimation: function (value) {
        this.animation = value;
    },
    getCamera: function () {
        throw new Bridge.NotImplementedException();
    },
    setCamera: function (value) {
        throw new Bridge.NotImplementedException();
    },
    draw: function (context, position, cam) {
        throw new Bridge.NotImplementedException();
    }
});

Bridge.define('Game3D.Rendering.Model', {
    inherits: [Game3D.Rendering.IDrawable],
    fFileName: null,
    constructor: function (fileName) {
        this.fFileName = fileName;
    },
    getCamera: function () {
        throw new Bridge.NotImplementedException();
    },
    setCamera: function (value) {
        throw new Bridge.NotImplementedException();
    },
    draw: function (context, position, cam) {
        throw new Bridge.NotImplementedException();
    },
    load: function () {
        Bridge.get($).ajax({ url: this.fFileName, mimeType: "text", success: Bridge.fn.bind(this, this.blah), error: Bridge.fn.bind(this, this.error) });
    },
    blah: function (value, state, response) {
        Bridge.get(window).alert(value.toString());


    },
    error: function (value, state, response) {
        Bridge.get(window).alert(state);
    }
});



Bridge.init();