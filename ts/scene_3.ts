import { Button } from "babylonjs-gui";
import {scene3Text} from "./textDescriptions";

export class scene3{
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private camera:BABYLON.ArcRotateCamera;
    private light: BABYLON.Light;
    private advancedTexture : BABYLON.GUI.AdvancedDynamicTexture;
    private s3t:scene3Text = new scene3Text();
    private controlList: Array<BABYLON.GUI.Control> = new Array<BABYLON.GUI.Control>();


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
        let assetsManager = new BABYLON.AssetsManager(this.scene);
        // Load in file.
        let meshTask = assetsManager.addMeshTask("scene3Model","","models/","scene3_model.babylon");
        // Mesh will be positioned, scaled then animation will be begin if loading is succesful.
        meshTask.onSuccess = function(task){
            task.loadedMeshes[0].name ="scene3Plant";
            task.loadedMeshes[0].id = "scene3Plant";
            task.loadedMeshes[0].position = new BABYLON.Vector3(0,20,0);
            task.loadedMeshes[0].scaling = new BABYLON.Vector3(0.04,0.04,0.04);
            console.log("Mesh loaded");
        }
        // Print an error to the console if loading task has failed.
        meshTask.onError = function(task){
            console.log("Error loading mesh: " + task.errorObject);
        }
        
        // Start tasks!
        assetsManager.load();
    }

    private setupCamera(){

    }

    private setupUI(){
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui3");
        let label = new BABYLON.GUI.Rectangle("scene3Label");
        
        label.background = "black"
        label.height = "100px";
        label.alpha = 0.5;
        label.width = "100px";
        label.cornerRadius = 20;
        label.thickness = 1;
        label.linkOffsetY = 200;
        label.background = "black";
        this.advancedTexture.addControl(label);
        label.linkWithMesh(this.scene.getMeshByID("scene3model"));
        label.isVisible = false;

        let text1 = new BABYLON.GUI.TextBlock();
        text1.text = this.s3t.getMNameText();
        text1.color = "white";
        text1.textWrapping = true;
        label.addControl(text1); 

        let label2 = new BABYLON.GUI.Rectangle("Scene3Label");
        label2.background = "black";
        label2.height = "400px";
        label2.alpha = 0.5;
        label2.width = "400px";
        label2.cornerRadius = 20;
        label2.thickness = 1;
        label2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.advancedTexture.addControl(label2);

        let text2 = new BABYLON.GUI.TextBlock();
        text2.text = this.s3t.getMDescText();
        text2.color = "white";
        text2.textWrapping = true;
        label2.addControl(text2);

        this.controlList[0] = label;
        this.controlList[1] = label2;
    }

    private setupSound():void{
        let sound = new BABYLON.Sound("scene3Sound","./sounds/scene/scene3.wav",this.scene,null,{loop:true,autoplay:true});
    }

    public setupScene(){
        this.setupModel();
        this.setupUI();
        this.setupSound();
    }
}