import { Button } from "babylonjs-gui";
import {scene1Text} from "./textDescriptions";

export class scene1{

    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private camera:BABYLON.ArcRotateCamera;
    private light: BABYLON.Light;
    private advancedTexture : BABYLON.GUI.AdvancedDynamicTexture;
    private cube;
    private sphere;
    private controlList: Array<BABYLON.GUI.Control> = new Array<BABYLON.GUI.Control>();
    private s1t = new scene1Text();
    private skybox;

    constructor(main_engine:BABYLON.Engine,texture:BABYLON.GUI.AdvancedDynamicTexture, sc:BABYLON.Scene){
        this.engine = main_engine; 
        this.scene = sc;
        this.advancedTexture = texture;
       
    }

    public getScene():BABYLON.Scene     {return this.scene;}
    public getCamera():BABYLON.ArcRotateCamera   {return this.camera;}
    public getLight():BABYLON.Light     {return this.light;}
    public getUITexture():BABYLON.GUI.AdvancedDynamicTexture {return this.advancedTexture;}
    public getSkybox() {return this.skybox;}

    private setupCube():void{
        this.cube = BABYLON.Mesh.CreateBox("scene1box",20,this.scene);
        this.cube.position = new BABYLON.Vector3(0,20,0);
        this.cube.material = new BABYLON.StandardMaterial("",this.scene);
        
    }

    private setupModel():void{
        this.sphere = BABYLON.Mesh.CreateSphere("scene1Earth",20,20,this.scene);
        this.sphere.position = new BABYLON.Vector3(0,20,0);
        let material = new BABYLON.StandardMaterial("earthtexture",this.scene);
        material.diffuseTexture = new BABYLON.Texture("./images/scene1/Planet Ark Texture.jpg",this.scene);
        this.sphere.material = material;
    }

    private setupCamera():void{
        this.camera = new BABYLON.ArcRotateCamera('scene_cam',1, 1.2, 50, this.sphere, this.scene);
        this.camera.attachControl(this.engine.getRenderingCanvas(), false);
        this.camera.upperRadiusLimit = 60;
        this.camera.lowerRadiusLimit = 20;
        this.scene.registerBeforeRender(() => this.camera.alpha += 0.001 * this.scene.getAnimationRatio());
    }

    private setupUI():void{
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
        let label = new BABYLON.GUI.Rectangle("scene1Label");
        
        label.background = "black"
        label.height = "100px";
        label.alpha = 0.5;
        label.width = "100px";
        label.cornerRadius = 20;
        label.thickness = 1;
        label.linkOffsetY = 200;
        label.background = "black";
        this.advancedTexture.addControl(label);
        label.linkWithMesh(this.sphere);

        let text1 = new BABYLON.GUI.TextBlock();
        text1.text = this.s1t.getMNameText();
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
        text2.text = this.s1t.getMDescText();
        text2.color = "white";
        text2.textWrapping = true;
        label2.addControl(text2);

        this.controlList[0] = label;
        this.controlList[1] = label2;
    }

    public setupSkybox():void{
        this.skybox = BABYLON.MeshBuilder.CreateBox("title_SkyBox",{size:1000.0,height:2048.0,width:2048},this.scene);
        let skyboxMat = new BABYLON.StandardMaterial("title_SkyBox",this.scene);
        skyboxMat.backFaceCulling = false;
        //    _________
        //   /        /|
        //  /    py  / |
        // /--------/  |
        // |       | nx/
        // |   pz  |  /
        // |       | /
        // ---------/
        skyboxMat.reflectionTexture = new BABYLON.CubeTexture("/images/scene1/skybox",this.scene);
        skyboxMat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMat.specularColor = new BABYLON.Color3(0, 0, 0);
        this.skybox.material = skyboxMat;
    }


    public getControls():Array<BABYLON.GUI.Control>{
        return this.controlList;
    }

    private setupSound():void{
        let sound = new BABYLON.Sound("scene1Sound","./sounds/scene/scene1.wav",this.scene,null,{loop:true,autoplay:true});
    }

    public setupScene():void
    {
        this.setupModel();
        this.setupUI();
        this.setupSkybox();
        this.setupCamera();
        this.setupSound();
    }


}