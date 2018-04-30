import {Button} from "babylonjs-gui";
import {welcomeScene} from "./textDescriptions";

export class welcome{

    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private camera: BABYLON.FreeCamera;
    private light: BABYLON.Light;
    private advancedTexture : BABYLON.GUI.AdvancedDynamicTexture;
    private label: BABYLON.GUI.Rectangle;

    constructor(main_engine:BABYLON.Engine,texture:BABYLON.GUI.AdvancedDynamicTexture){
        this.engine = main_engine; 
        this.advancedTexture = texture;
    }

    public getScene():BABYLON.Scene     {return this.scene;}
    public getCamera():BABYLON.Camera   {return this.camera;}
    public getLight():BABYLON.Light     {return this.light;}
    public getLabel():BABYLON.GUI.Rectangle {return this.label;}
    public getUITexture():BABYLON.GUI.AdvancedDynamicTexture {return this.advancedTexture;}

    private setupUI():void{
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("welcomeUI");
        this.label = new BABYLON.GUI.Rectangle("welcomeLabel");
        this.label.background = "black";
        this.label.height = "400px";
        this.label.alpha = 0.5;
        this.label.width = "400px";
        this.label.cornerRadius = 20;
        this.label.thickness = 1;
        this.label.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.label.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.advancedTexture.addControl(this.label);

        // Fetch code from POTO (Plain Old TypeScript Object)
        let ws = new welcomeScene();

        let text2 = new BABYLON.GUI.TextBlock();
        text2.text = ws.getText();
        text2.color = "white";
        text2.textWrapping = true;
        this.label.addControl(text2);
    }

    public setupScene():void{
        this.setupUI();
    }

}