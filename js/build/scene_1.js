System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var scene1;
    return {
        setters: [],
        execute: function () {
            scene1 = /** @class */ (function () {
                function scene1(main_engine, texture) {
                    this.engine = main_engine;
                    this.advancedTexture = texture;
                }
                scene1.prototype.getScene = function () { return this.scene; };
                scene1.prototype.getCamera = function () { return this.camera; };
                scene1.prototype.getLight = function () { return this.light; };
                scene1.prototype.getUITexture = function () { return this.advancedTexture; };
                scene1.prototype.setupCube = function () {
                    this.cube = BABYLON.Mesh.CreateBox("scene1box", 20, this.scene);
                    this.cube.position = new BABYLON.Vector3(0, 0, 0);
                    this.cube.material = new BABYLON.StandardMaterial("", this.scene);
                };
                scene1.prototype.setupCamera = function () {
                    this.camera = new BABYLON.FreeCamera('scene1_cam', new BABYLON.Vector3(0, 0, 0), this.scene);
                    this.camera.setTarget(this.cube);
                    this.camera.attachControl(this.engine.getRenderingCanvas(), false);
                };
                scene1.prototype.setupUI = function () {
                    this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
                    var label = new BABYLON.GUI.Rectangle("scene1Label");
                    label.background = "black";
                    label.height = "100px";
                    label.alpha = 0.5;
                    label.width = "100px";
                    label.cornerRadius = 20;
                    label.thickness = 1;
                    label.linkOffsetY = 100;
                    label.background = "black";
                    this.advancedTexture.addControl(label);
                    label.linkWithMesh(this.cube);
                    var text1 = new BABYLON.GUI.TextBlock();
                    text1.text = "3D Model.";
                    text1.color = "white";
                    text1.textWrapping = true;
                    label.addControl(text1);
                    var label2 = new BABYLON.GUI.Rectangle("Scene2Label");
                    label2.background = "black";
                    label2.height = "400px";
                    label2.alpha = 0.5;
                    label2.width = "400px";
                    label2.cornerRadius = 20;
                    label2.thickness = 1;
                    label2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                    this.advancedTexture.addControl(label2);
                    var text2 = new BABYLON.GUI.TextBlock();
                    text2.text = "3D Model Description Goes Here!";
                    text2.color = "white";
                    text2.textWrapping = true;
                    label2.addControl(text2);
                };
                scene1.prototype.setupScene = function () {
                    this.setupCube();
                    this.setupUI();
                    this.setupCamera();
                };
                return scene1;
            }());
            exports_1("scene1", scene1);
        }
    };
});
