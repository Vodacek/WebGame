﻿/* global Bridge */

"use strict";

Bridge.define('Cube3D.Cube', {
    canvas: null,
    gl: null,
    program: null,
    useBlending: true,
    alpha: 1,
    useLighting: true,
    ambientR: 0.4,
    ambientG: 0.4,
    ambientB: 0.4,
    lightDirectionX: 0,
    lightDirectionY: 0,
    lightDirectionZ: -1,
    directionalR: 0.25,
    directionalG: 0.25,
    directionalB: 0.25,
    textureImageSrc: "crate.gif",
    vertexPositionAttribute: 0,
    vertexNormalAttribute: 0,
    textureCoordAttribute: 0,
    pMatrixUniform: null,
    mvMatrixUniform: null,
    nMatrixUniform: null,
    samplerUniform: null,
    useLightingUniform: null,
    ambientColorUniform: null,
    lightingDirectionUniform: null,
    directionalColorUniform: null,
    alphaUniform: null,
    cubeVertexPositionBuffer: null,
    cubeVertexNormalBuffer: null,
    cubeVertexTextureCoordBuffer: null,
    cubeVertexIndexBuffer: null,
    xRotation: 0,
    xSpeed: 15,
    yRotation: 0,
    ySpeed: -15,
    z: -5.0,
    lastTime: 0,
    config: {
        init: function () {
            this.textures = Bridge.Array.init(5, null);
            this.test = new Bridge.List$1(Cube3D.Test)();
            this.mvMatrix = Bridge.get(mat4).create();
            this.mvMatrixStack = [];
            this.pMatrix = Bridge.get(mat4).create();
            this.currentlyPressedKeys = [];
        }
    },
    getShader: function (gl, id) {
        var shaderScript = Bridge.get(document).getElementById(id);

        if (shaderScript === null) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;

        while (k !== null) {
            if (k.nodeType === 3) {
                str += k.textContent;
            }

            k = k.nextSibling;
        }

        var shader;

        if (shaderScript.type === "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }
        else 
            if (shaderScript.type === "x-shader/x-vertex") {
                shader = gl.createShader(gl.VERTEX_SHADER);
            }
            else  {
                return null;
            }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            Bridge.get(Bridge.global).alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    },
    initShaders: function () {
        this.test.add(new Cube3D.Test());

        var fragmentShader = this.getShader(this.gl, "shader-fs");
        var vertexShader = this.getShader(this.gl, "shader-vs");
        var shaderProgram = this.gl.createProgram();

        if (Bridge.is(shaderProgram, Bridge.Int)) {
            Bridge.get(Bridge.global).alert("Could not initialise program");
        }

        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);

        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            Bridge.get(Bridge.global).alert("Could not initialise shaders");
        }

        this.gl.useProgram(shaderProgram);

        this.vertexPositionAttribute = this.gl.getAttribLocation(shaderProgram, "aVertexPosition");
        this.vertexNormalAttribute = this.gl.getAttribLocation(shaderProgram, "aVertexNormal");
        this.textureCoordAttribute = this.gl.getAttribLocation(shaderProgram, "aTextureCoord");

        this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
        this.gl.enableVertexAttribArray(this.vertexNormalAttribute);
        this.gl.enableVertexAttribArray(this.textureCoordAttribute);

        this.pMatrixUniform = this.gl.getUniformLocation(shaderProgram, "uPMatrix");
        this.mvMatrixUniform = this.gl.getUniformLocation(shaderProgram, "uMVMatrix");
        this.nMatrixUniform = this.gl.getUniformLocation(shaderProgram, "uNMatrix");
        this.samplerUniform = this.gl.getUniformLocation(shaderProgram, "uSampler");
        this.useLightingUniform = this.gl.getUniformLocation(shaderProgram, "uUseLighting");
        this.ambientColorUniform = this.gl.getUniformLocation(shaderProgram, "uAmbientColor");
        this.lightingDirectionUniform = this.gl.getUniformLocation(shaderProgram, "uLightingDirection");
        this.directionalColorUniform = this.gl.getUniformLocation(shaderProgram, "uDirectionalColor");
        this.alphaUniform = this.gl.getUniformLocation(shaderProgram, "uAlpha");

        this.program = shaderProgram;
    },
    handleLoadedTexture: function (image) {
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[0]);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    },
    initTexture: function () {
        this.textures[0] = this.gl.createTexture();

        var textureImageElement = new Image();

        textureImageElement.onload = Bridge.fn.bind(this, function (ev) {
            this.handleLoadedTexture(textureImageElement);
        });

        textureImageElement.src = this.textureImageSrc;
    },
    setMatrixUniforms: function () {
        this.gl.uniformMatrix4fv(this.pMatrixUniform, false, this.pMatrix);
        this.gl.uniformMatrix4fv(this.mvMatrixUniform, false, this.mvMatrix);

        var normalMatrix = Bridge.get(mat3).create();

        Bridge.get(mat4).toInverseMat3(this.mvMatrix, normalMatrix);
        Bridge.get(mat3).transpose(normalMatrix);

        this.gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);
    },
    degToRad: function (degrees) {
        return degrees * Bridge.get(Math).PI / 180;
    },
    handleKeyDown: function (e) {
        this.currentlyPressedKeys[e.keyCode] = true;
    },
    handleKeyUp: function (e) {
        this.currentlyPressedKeys[e.keyCode] = false;
    },
    handleKeys: function () {
        if (this.currentlyPressedKeys[81]) {
            this.z -= 0.05;
        }

        if (this.currentlyPressedKeys[69]) {
            this.z += 0.05;
        }

        if (this.currentlyPressedKeys[65]) {
            this.ySpeed -= 1;
        }

        if (this.currentlyPressedKeys[68]) {
            this.ySpeed += 1;
        }

        if (this.currentlyPressedKeys[87]) {
            this.xSpeed -= 1;
        }

        if (this.currentlyPressedKeys[83]) {
            this.xSpeed += 1;
        }
    },
    initBuffers: function () {
        this.cubeVertexPositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexPositionBuffer);

        var vertices = [-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0];

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        this.cubeVertexNormalBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexNormalBuffer);

        var vertexNormals = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0];

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertexNormals), this.gl.STATIC_DRAW);

        this.cubeVertexTextureCoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexTextureCoordBuffer);

        var textureCoords = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);

        this.cubeVertexIndexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);

        var cubeVertexIndices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];

        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), this.gl.STATIC_DRAW);
    },
    drawScene: function () {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        Bridge.get(mat4).perspective(45, Bridge.cast(this.canvas.width, Number) / this.canvas.height, 0.1, 100, this.pMatrix);
        Bridge.get(mat4).identity(this.mvMatrix);
        Bridge.get(mat4).translate(this.mvMatrix, [0.0, 0.0, this.z]);
        Bridge.get(mat4).rotate(this.mvMatrix, this.degToRad(this.xRotation), [1, 0, 0]);
        Bridge.get(mat4).rotate(this.mvMatrix, this.degToRad(this.yRotation), [0, 1, 0]);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexPositionBuffer);
        this.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexNormalBuffer);
        this.gl.vertexAttribPointer(this.vertexNormalAttribute, 3, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVertexTextureCoordBuffer);
        this.gl.vertexAttribPointer(this.textureCoordAttribute, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[0]);

        this.gl.uniform1i(this.samplerUniform, 0);

        // Add Blending
        if (this.useBlending) {
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
            this.gl.enable(this.gl.BLEND);
            this.gl.disable(this.gl.DEPTH_TEST);
            this.gl.uniform1f(this.alphaUniform, this.alpha);
        }
        else  {
            this.gl.disable(this.gl.BLEND);
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.uniform1f(this.alphaUniform, 1);
        }

        // Add Lighting
        this.gl.uniform1i(this.useLightingUniform, this.useLighting);

        if (this.useLighting) {
            this.gl.uniform3f(this.ambientColorUniform, this.ambientR, this.ambientG, this.ambientB);

            var lightingDirection = [this.lightDirectionX, this.lightDirectionY, this.lightDirectionZ];
            var adjustedLD = Bridge.get(vec3).create();

            Bridge.get(vec3).normalize(lightingDirection, adjustedLD);
            Bridge.get(vec3).scale(adjustedLD, -1);

            this.gl.uniform3fv(this.lightingDirectionUniform, adjustedLD);
            this.gl.uniform3f(this.directionalColorUniform, this.directionalR, this.directionalG, this.directionalB);
        }

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);

        this.setMatrixUniforms();

        this.gl.drawElements(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0);
    },
    animate: function () {
        var timeNow = new Date().getTime();

        if (this.lastTime !== 0) {
            var elapsed = timeNow - this.lastTime;

            this.xRotation += (this.xSpeed * elapsed) / 1000.0;
            this.yRotation += (this.ySpeed * elapsed) / 1000.0;
        }

        this.lastTime = timeNow;
    },
    tick: function () {
        Bridge.get(Cube3D.App).initSettings(this);
        this.handleKeys();
        this.drawScene();
        this.animate();
        Bridge.get(Bridge.global).setTimeout(Bridge.fn.bind(this, this.tick), 20);
    }
});

Bridge.define('Cube3D.Test', {
    x: 0,
    y: 0
});

Bridge.define('Cube3D.App', {
    statics: {
        config: {
            init: function () {
                Bridge.ready(this.main);
            }
        },
        main: function () {
            Bridge.get(Cube3D.App).initCube("canvas1");
        },
        initCube: function (canvasId) {
            var cube = new Cube3D.Cube();

            Bridge.get(Cube3D.App).initSettings(cube);

            cube.canvas = Bridge.get(Cube3D.App).getCanvasEl(canvasId);
            cube.gl = Bridge.get(Cube3D.App).create3DContext(cube.canvas);

            if (cube.gl !== null) {
                cube.initShaders();
                cube.initBuffers();
                cube.initTexture();
                cube.tick();

                Bridge.get(document).addEventListener("keydown", Bridge.fn.bind(cube, cube.handleKeyDown));
                Bridge.get(document).addEventListener("keyup", Bridge.fn.bind(cube, cube.handleKeyUp));
            }
            else  {
                Bridge.get(Cube3D.App).showError(cube.canvas, "<b>Either the browser doesn't support WebGL or it is disabled.<br>Please follow <a href=\"http://get.webgl.com\">Get WebGL</a>.</b>");
            }
        },
        getCanvasEl: function (id) {
            return Bridge.get(document).getElementById(id);
        },
        create3DContext: function (canvas) {
            var $t;
            var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

            var context = null;

            $t = Bridge.getEnumerator(names);
            while ($t.moveNext()) {
                var name = $t.getCurrent();
                try {
                    context = canvas.getContext(name);
                }
                catch ($e) {
                    $e = Bridge.Exception.create($e);
                }

                if (context !== null) {
                    break;
                }
            }

            return context;
        }        ,
        showError: function (canvas, message) {
            canvas.parentElement.replaceChild(Bridge.merge(document.createElement('p'), {
                innerHTML: message
            } ), canvas);
        },
        initSettings: function (cube) {
            var useSettings = Bridge.get(document).getElementById("settings");

            if (useSettings === null || !useSettings.checked) {
                return;
            }

            cube.useBlending = Bridge.get(document).getElementById("blending").checked;
            cube.alpha = parseFloat(Bridge.get(document).getElementById("alpha").value);

            cube.useLighting = Bridge.get(document).getElementById("lighting").checked;

            cube.ambientR = parseFloat(Bridge.get(document).getElementById("ambientR").value);
            cube.ambientG = parseFloat(Bridge.get(document).getElementById("ambientG").value);
            cube.ambientB = parseFloat(Bridge.get(document).getElementById("ambientB").value);

            cube.lightDirectionX = parseFloat(Bridge.get(document).getElementById("lightDirectionX").value);
            cube.lightDirectionY = parseFloat(Bridge.get(document).getElementById("lightDirectionY").value);
            cube.lightDirectionZ = parseFloat(Bridge.get(document).getElementById("lightDirectionZ").value);

            cube.directionalR = parseFloat(Bridge.get(document).getElementById("directionalR").value);
            cube.directionalG = parseFloat(Bridge.get(document).getElementById("directionalG").value);
            cube.directionalB = parseFloat(Bridge.get(document).getElementById("directionalB").value);

            cube.textureImageSrc = "crate.gif";
        }
    }
});

Bridge.init();