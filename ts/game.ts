 /// <reference path="../node_modules/babylonjs/dist/preview release/babylon.d.ts" />import { Color3 } from "babylonjs";

 // Import classes from other files.
import { TitleScreen } from "./title";
import { welcome } from "./welcome";
import * as GUI from 'babylonjs-gui';
import { BabylonMessage } from "babylonjs";
import { scene1 } from "./scene_1";
import { scene2 } from "./scene_2";
import { scene3 } from "./scene_3";
import { scene4 } from "./scene_4";
import { endScreen} from "./end";

class Game {
    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    // dynamically assign because of free or follow cam.
    private camera;
    private light: BABYLON.Light;
    private advancedTexture : BABYLON.GUI.AdvancedDynamicTexture;

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
        let TS = new TitleScreen(this.engine,false);
        TS.setupScene();
        this.camera = TS.getCamera();
        this.scene = TS.getScene();
        this.light = TS.getLight();
    }

    public generateTitleUI():void{
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI",true,this.scene);
        let panel = new BABYLON.GUI.StackPanel();
        panel.width = 0.1;
        panel.height = 0.1;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.advancedTexture.addControl(panel);

        let button = BABYLON.GUI.Button.CreateSimpleButton("b1","Enter");
        button.background = "grey";
        panel.addControl(button);
        button.onPointerDownObservable.add(() => this.scene.getMeshByID("ground").dispose());
        button.onPointerDownObservable.add(() => this.scene.getMeshByID("title3D").dispose());
        button.onPointerDownObservable.add(() => this.scene.getMeshByID("fountain").dispose());
        button.onPointerDownObservable.add(() => this.scene.getSoundByName("titleSound").dispose());
        button.onPointerDownObservable.add(() => button.isVisible = false);
        button.onPointerDownObservable.add(() => this.welcome());
    }

    public welcome():void{
        let w1 = new welcome(this.engine,this.advancedTexture);
        w1.setupScene();
        let label = w1.getLabel();
        this.advancedTexture = w1.getUITexture();

        let panel = new BABYLON.GUI.StackPanel();
        panel.width = 0.1;
        panel.height = 0.1;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.advancedTexture.addControl(panel);

        let button = BABYLON.GUI.Button.CreateSimpleButton("b2","Next");
        button.background = "grey";
        button.onPointerDownObservable.add(() => button.isVisible = false);
        button.onPointerDownObservable.add(() => label.isVisible = false);
        button.onPointerDownObservable.add(() => this.setupScene1());
        panel.addControl(button);
        
    }

    public setupScene1(): void{
        this.scene.removeMesh(this.scene.getMeshByID("title_SkyBox"))
        this.scene.removeCamera(this.camera);
        let s1 = new scene1(this.engine,this.advancedTexture,this.scene);
        s1.setupScene();
        this.advancedTexture = s1.getUITexture();
        this.camera = s1.getCamera();
        this.scene = s1.getScene();
        this.light = s1.getLight();
        
        let list = s1.getControls();
        let UI = s1.getUITexture();

        let panel = new BABYLON.GUI.StackPanel();
        panel.width = 0.1;
        panel.height = 0.1;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.advancedTexture.addControl(panel);

        let button = BABYLON.GUI.Button.CreateSimpleButton("b2","Next");
        button.background = "grey";
        button.onPointerDownObservable.add(() => button.isVisible = false);
        button.onPointerDownObservable.add(() => list[0].isVisible = false);
        button.onPointerDownObservable.add(() => list[1].isVisible = false);
        button.onPointerDownObservable.add(() => this.scene.removeMesh(this.scene.getMeshByID("scene1Earth")));
        button.onPointerDownObservable.add(() => this.scene.getSoundByName("scene1Sound").dispose());
        button.onPointerDownObservable.add(() => this.setupScene2());
        panel.addControl(button);
    }

    public setupScene2(): void{
            
            let s2 = new scene2(this.engine,this.advancedTexture,this.scene);
            s2.setupScene();
            this.scene = s2.getScene();
            let list = s2.getControls();

            let panel = new BABYLON.GUI.StackPanel();
            panel.width = 0.1;
            panel.height = 0.1;
            panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            this.advancedTexture.addControl(panel);
    
            let button = BABYLON.GUI.Button.CreateSimpleButton("b3","Next");
            button.background = "grey";
            button.onPointerDownObservable.add(() => button.isVisible = false);
            button.onPointerDownObservable.add(() => this.scene.getMeshByID("scene2Skull").dispose());
            button.onPointerDownObservable.add(() => this.scene.getMeshByID("scene2Skull_1").dispose());
            button.onPointerDownObservable.add(() => this.scene.getMeshByID("scene2Skull_2").dispose());
            button.onPointerDownObservable.add(() => this.scene.getMeshByID("scene2Skull_3").dispose());
            button.onPointerDownObservable.add(() => this.scene.getSoundByName("scene2Sound").dispose());
            button.onPointerDownObservable.add(() => list[0].dispose())
            button.onPointerDownObservable.add(() => list[1].dispose())
            button.onPointerDownObservable.add(() => this.setupScene3());
            panel.addControl(button);
            
    }
    
    public setupScene3(): void{
        let s3 = new scene3(this.engine,this.advancedTexture,this.scene);
        s3.setupScene();
        this.scene = s3.getScene();
        let list = s3.getControls();

        let panel = new BABYLON.GUI.StackPanel();
        panel.width = 0.1;
        panel.height = 0.1;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.advancedTexture.addControl(panel);
    
        let button = BABYLON.GUI.Button.CreateSimpleButton("b4","Next");
        button.background = "grey";
        button.onPointerDownObservable.add(() => button.isVisible = false);
        button.onPointerDownObservable.add(() => this.scene.getMeshByID("scene3Plant").dispose());
        button.onPointerDownObservable.add(() => this.scene.getSoundByName("scene3Sound").dispose());
        button.onPointerDownObservable.add(() => list[0].dispose())
        button.onPointerDownObservable.add(() => list[1].dispose())
        button.onPointerDownObservable.add(() => this.setupScene4());
        panel.addControl(button);
    }
    
    public setupScene4(): void{
        let s4 = new scene4(this.engine,this.advancedTexture,this.scene);
        s4.setupScene();
        this.scene = s4.getScene();
        let list = s4.getControls();

        let panel = new BABYLON.GUI.StackPanel();
        panel.width = 0.1;
        panel.height = 0.1;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.advancedTexture.addControl(panel);
    
        let button = BABYLON.GUI.Button.CreateSimpleButton("b4","Next");
        button.background = "grey";
        button.onPointerDownObservable.add(() => button.isVisible = false);
        button.onPointerDownObservable.add(() => this.scene.getMeshByID("scene4Axe").dispose());
        button.onPointerDownObservable.add(() => this.scene.getSoundByName("scene4Sound").dispose());
        button.onPointerDownObservable.add(() => list[0].dispose())
        button.onPointerDownObservable.add(() => list[1].dispose())
        button.onPointerDownObservable.add(() => this.setupEnd());
        panel.addControl(button);
    }

    public setupEnd():void {
        this.scene.disposeSounds();
        let es = new endScreen(this.engine,this.advancedTexture);
        es.setupScene();
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
  
  game.generateTitleUI();
  

  // start animation
  game.run();

  