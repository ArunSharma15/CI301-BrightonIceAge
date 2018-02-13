import { Button } from "babylonjs-gui";

export class scene1{

    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private camera: BABYLON.FreeCamera;
    private light: BABYLON.Light;
    private advancedTexture : BABYLON.GUI.AdvancedDynamicTexture;
    private cube;

    constructor(main_engine:BABYLON.Engine,texture:BABYLON.GUI.AdvancedDynamicTexture){
        this.engine = main_engine; 
        this.advancedTexture = texture;
    }

    public getScene():BABYLON.Scene     {return this.scene;}
    public getCamera():BABYLON.Camera   {return this.camera;}
    public getLight():BABYLON.Light     {return this.light;}
    public getUITexture():BABYLON.GUI.AdvancedDynamicTexture {return this.advancedTexture;}

    private setupCube(){
        this.cube = BABYLON.Mesh.CreateBox("scene1box",20,this.scene);
        this.cube.position = new BABYLON.Vector3(0,0,0);
        this.cube.material = new BABYLON.StandardMaterial("",this.scene);
        
    }

    private setupCamera(){
        this.camera = new BABYLON.FreeCamera('scene1_cam', new BABYLON.Vector3(0,0,0), this.scene);
        this.camera.setTarget(this.cube);
        this.camera.attachControl(this.engine.getRenderingCanvas(),false);
        
        
    }

    private setupUI(){
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
        let label = new BABYLON.GUI.Rectangle("scene1Label");
        
        label.background = "black"
        label.height = "100px";
        label.alpha = 0.5;
        label.width = "100px";
        label.cornerRadius = 20;
        label.thickness = 1;
        label.linkOffsetY = 100;
        label.background = "black";
        
        
        this.advancedTexture.addControl(label);
        label.linkWithMesh(this.cube);

        let text1 = new BABYLON.GUI.TextBlock();
        text1.text = "3D Model.";
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
        text2.text = "3D Model Description Goes Here!";
        text2.color = "white";
        text2.textWrapping = true;

        label2.addControl(text2);

    }

    public setupScene(){
        this.setupCube();
        this.setupUI();
        this.setupCamera();
        
        
        
    }


}