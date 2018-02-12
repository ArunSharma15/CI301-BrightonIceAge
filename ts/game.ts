 /// <reference path="../node_modules/babylonjs/dist/preview release/babylon.d.ts" />import { Color3 } from "babylonjs";

 // Import classes from other files.
import { TitleScreen } from "./title";
import * as GUI from 'babylonjs-gui';
import { BabylonMessage } from "babylonjs";

class Game {
    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    // dynamically assign because of free or follow cam.
    private camera;
    private light: BABYLON.Light;

    constructor(canvasElement : string) {
        // Have to case canvas to HTMLCanvasElement Type.
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this.engine = new BABYLON.Engine(this.canvas, true);
  
        // Listen for browser/canvas resize events
        window.addEventListener("resize", ()=> {
            this.engine.resize();
        });
    }

    /**
     * Setup and run the main title screen.
     */
    public runTitleScene():void{
        let TS = new TitleScreen(this.engine,true);
        TS.setupScene();
        this.camera = TS.getCamera();
        this.scene = TS.getScene();
        this.light = TS.getLight();
    }

    public GenerateUI():void{
        let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI",true,this.scene);
        let panel = new BABYLON.GUI.StackPanel();
        panel.width = 0.1;
        panel.height = 0.1;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(panel);
        let button = BABYLON.GUI.Button.CreateSimpleButton("b1","Enter");
        button.background = "grey";
        panel.addControl(button);
        button.onPointerDownObservable.add(() => this.scene.getMeshByID("ground").dispose());
        button.onPointerDownObservable.add(() => this.scene.getMeshByID("title3D").dispose());
        button.onPointerDownObservable.add(() => this.scene.getMeshByID("fountain").dispose());
        button.onPointerDownObservable.add(() => alert("titleHasbeenSKipped"));
    }


    /**
     * Render loop.
     */
    run() : void {
        this.engine.runRenderLoop(()=> {
            this.scene.render();
          });
    }
  }

  // Create our game class using the render canvas element
  let game = new Game('renderCanvas');

  // Title Screen.
  game.runTitleScene();
  
  game.GenerateUI();

  // start animation
  game.run();

  