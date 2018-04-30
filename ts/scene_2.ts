import { Button } from "babylonjs-gui";
import {scene2Text} from "./textDescriptions";

export class scene2{

    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private camera:BABYLON.ArcRotateCamera;
    private light: BABYLON.Light;
    private advancedTexture : BABYLON.GUI.AdvancedDynamicTexture;
    private s2t:scene2Text = new scene2Text();
    private controlList: Array<BABYLON.GUI.Control> = new Array<BABYLON.GUI.Control>();
    private assetsManager;
    private meshTask;

    constructor(main_engine:BABYLON.Engine,texture:BABYLON.GUI.AdvancedDynamicTexture, sc:BABYLON.Scene){
        this.engine = main_engine; 
        this.scene = sc;
        this.advancedTexture = texture;
       
    }

    public getScene():BABYLON.Scene     {return this.scene;}
    public getCamera():BABYLON.ArcRotateCamera   {return this.camera;}
    public getLight():BABYLON.Light     {return this.light;}
    public getUITexture():BABYLON.GUI.AdvancedDynamicTexture {return this.advancedTexture;}
    public getControls():Array<BABYLON.GUI.Control> {return this.controlList;}
    
    private setupModel(){
        // AssetManager helps to load and individual manage assets from Babylon scene files.
        // Attatch the scene to the manager.
        this.assetsManager = new BABYLON.AssetsManager(this.scene);
        // Load in file.
        this.meshTask = this.assetsManager.addMeshTask("scene2Model","","models/","scene2_model.babylon");
        // Mesh will be positioned, scaled then animation will be begin if loading is succesful.
        this.meshTask.onSuccess = function(task){
            task.loadedMeshes[0].name ="scene2Skull";
            task.loadedMeshes[0].id = "scene2Skull";
            task.loadedMeshes[0].position = new BABYLON.Vector3(0,20,0);
            task.loadedMeshes[0].scaling = new BABYLON.Vector3(0.04,0.04,0.04);
            console.log("Mesh loaded");
            task.loadedMeshes[1].id = "scene2Skull_1";
            task.loadedMeshes[1].position = new BABYLON.Vector3(0,20,0);
            task.loadedMeshes[1].scaling = new BABYLON.Vector3(0.04,0.04,0.04);
            console.log("Mesh loaded");
            task.loadedMeshes[2].id = "scene2Skull_2";
            task.loadedMeshes[2].position = new BABYLON.Vector3(0,20,0);
            task.loadedMeshes[2].scaling = new BABYLON.Vector3(0.04,0.04,0.04);
            console.log("Mesh Loaded");
            task.loadedMeshes[3].id = "scene2Skull_3";
            task.loadedMeshes[3].position = new BABYLON.Vector3(0,20,0);
            task.loadedMeshes[3].scaling = new BABYLON.Vector3(0.04,0.04,0.04);
        }
        // Print an error to the console if loading task has failed.
        this.meshTask.onError = function(task){
            console.log("Error loading mesh: " + task.errorObject);
        }
        
        // Start tasks!
        this.assetsManager.load();
    }

    private setupUI(){
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui2");
        let label = new BABYLON.GUI.Rectangle("scene2Label");
        
        label.background = "black"
        label.height = "100px";
        label.alpha = 0.5;
        label.width = "100px";
        label.cornerRadius = 20;
        label.thickness = 1;
        label.linkOffsetY = 200;
        label.background = "black";
        this.advancedTexture.addControl(label);
        label.linkWithMesh(this.scene.getMeshByID("scene2Skull"));
        label.isVisible = false;

        let text1 = new BABYLON.GUI.TextBlock();
        text1.text = this.s2t.getMNameText();
        text1.color = "white";
        text1.textWrapping = true;
        label.addControl(text1); 

        let label2 = new BABYLON.GUI.Rectangle("Scene2Label");
        label2.background = "black";
        label2.height = "400px";
        label2.alpha = 0.5;
        label2.width = "400px";
        label2.cornerRadius = 20;
        label2.thickness = 1;
        label2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.advancedTexture.addControl(label2);

        let text2 = new BABYLON.GUI.TextBlock();
        text2.text = this.s2t.getMDescText();
        text2.color = "white";
        text2.textWrapping = true;
        label2.addControl(text2);

        this.controlList[0] = label;
        this.controlList[1] = label2;
    }

    private setupSound():void{
        let sound = new BABYLON.Sound("scene2Sound","./sounds/scene/scene2.wav",this.scene,null,{loop:true,autoplay:true});
    }

    public setupScene(){
        this.setupModel();
        this.setupUI();
        this.setupSound();
    }

}