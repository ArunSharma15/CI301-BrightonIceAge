 /// <reference path="../node_modules/babylonjs/dist/preview release/babylon.d.ts" />import { Color3 } from "babylonjs";

 // Import class from other file.
import { TitleScreen } from "./title";

class Game {
    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private camera: BABYLON.FreeCamera;
    private titlecamera: BABYLON.FollowCamera;
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
        let TS = new TitleScreen(this.engine);
        TS.setupScene();
        this.titlecamera = TS.getCamera();
        this.scene = TS.getScene();
        this.light = TS.getLight();
    }

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

  // start animation
  game.run();