import { BabylonMessage } from "babylonjs";

/**
 * Class to setup and load the 'Title Screen'
 * Create spinning text and particle effects.
 */
export class TitleScreen{

    // Initialise class variables.
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private camera: BABYLON.FollowCamera;
    private devCamera: BABYLON.FreeCamera;
    private light: BABYLON.Light;
    private devCameraEnabled: Boolean;
    
    //private meshLibrary:BABYLON.AbstractMesh;

    // Pass in engine from main class
    // Otherwise we would have to address HTML (element) canvasElement from here.
    constructor(main_engine:BABYLON.Engine,devCameraEnable:Boolean){
        this.engine = main_engine; 
        this.devCameraEnabled = devCameraEnable;
    }

    // Use method to return objects once scene has been constructed.
    public getScene():BABYLON.Scene        {return this.scene;}
    public getCamera():BABYLON.FollowCamera{return this.camera;}
    public getLight():BABYLON.Light        {return this.light};
    public getIsSceneSkipped():Boolean     {return this.isSceneSkipped};

    /**
     * Setup an hemispheric light.
     */
    private setupLights() : void {
        // We need a scene to create all our geometry and babylonjs items in
        this.scene = new BABYLON.Scene(this.engine);
        // Create lightning in our scene
        this.light = new BABYLON.HemisphericLight('skyLight', new BABYLON.Vector3(0,1,0), this.scene);
    }

    /**
     * Use a height map to generate the terrain.
     */
    private setupTerrain() : void {
        // Create new material
        let groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
        // Apply ground texture
        groundMaterial.diffuseTexture = new BABYLON.Texture("images/brighton_texture.png",this.scene);
        // Apply height map
        let ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground","images/brighton_height_map.png",1081,1081,250,0,120,this.scene);
    }

    /**
     * Spawn a cube and simulate snow falling.
     */
    private setupParticleEffects():void{
        // Create snow 
        let fountain = BABYLON.Mesh.CreateBox("fountain",1.1,this.scene);
        // Position box above camera
        fountain.position = new BABYLON.Vector3(59,22,79);
        // Setup particle emmitter
        var particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
        particleSystem.particleTexture = new BABYLON.Texture("images/flare.png", this.scene);
        particleSystem.emitRate = 100;
        particleSystem.emitter = fountain;
        // Need to specify that the 'snow' falls down, hence Y coordinate is only modified.
        particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
        particleSystem.minSize = 0.01;
        particleSystem.maxSize = 0.02;
        particleSystem.start();
    }

    /**
     * Position and lock the camera.
     * This is only a title screen after all.
     */
    private setupCamera():void{
        // Position Camera within terrain
        // Definitely not ideal to manually position things, but until I learn the editor, it's just this for now.
        this.camera = new BABYLON.FollowCamera('titlecamera',new BABYLON.Vector3(60,20,80),this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());
        this.camera.rotation.x = -0.1;    
    }

    private setupDevCamera():void{
        this.devCamera = new BABYLON.FreeCamera('devCamera', new BABYLON.Vector3(60, 20,80), this.scene);
    
        this.devCamera.setTarget(BABYLON.Vector3.Zero());

        this.devCamera.attachControl(this.engine.getRenderingCanvas(), false);
    }
    

    /**
     * Load in 3D Mesh with accompanying animation.
     * 3D Mesh is however stored in .babylon format generated from 3DS Max Exporter.
     */
    private loadAssets():void{
         // AssetManager helps to load and individual manage assets from Babylon scene files.
        // Attatch the scene to the manager.
        var assetsManager = new BABYLON.AssetsManager(this.scene);
        // Load in file.
        var meshTask = assetsManager.addMeshTask("titleTask","","models/","title_text.babylon");
        // Mesh will be positioned, scaled then animation will be begin if loading is succesful.
        meshTask.onSuccess = function(task){
            task.loadedMeshes[0].id ="title3D";
            task.loadedMeshes[0].position = new BABYLON.Vector3(35,20,50);
            task.loadedMeshes[0].scaling = new BABYLON.Vector3(0.5,0.5,0.5);
            task.loadedMeshes[0].beginAnimation("title_Animation",true);
            console.log("Mesh loaded");
        }
        // Print an error to the console if loading task has failed.
        meshTask.onError = function(task){
            console.log("Error loading mesh");
        }
        
        // Start tasks!
        assetsManager.load();
        
    }

    


    /**
     * Call methods which populate the Babylon Camera,Engine,Scene and Light Objects.
     */
    public setupScene():void{
        this.setupLights();
        // Call either regular fixed camera or dev camera depending on boolean.
        if(this.devCameraEnabled){
            this.setupDevCamera();
        }else{
        this.setupCamera();
        }
        this.setupTerrain();
        this.setupParticleEffects();
        this.loadAssets();
        
    }

}
