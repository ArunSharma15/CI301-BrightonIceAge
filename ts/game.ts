 /// <reference path="../node_modules/babylonjs/dist/preview release/babylon.d.ts" />import { Color3 } from "babylonjs";


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
 
    createScene() : void {
        
            // We need a scene to create all our geometry and babylonjs items in
            this.scene = new BABYLON.Scene(this.engine);
        
            // Create a camera, and set its position to slightly behind our meshes
            this.camera = new BABYLON.FreeCamera('freeCamera', new BABYLON.Vector3(0, 5,-10), this.scene);
        
            // Make our camera look at the middle of the scene, where we have placed our items
            this.camera.setTarget(BABYLON.Vector3.Zero());
        
            // Attach the camera to the canvas, this allows us to give input to the camera
            this.camera.attachControl(this.canvas, false);
        
            // Create lightning in our scene
            this.light = new BABYLON.HemisphericLight('skyLight', new BABYLON.Vector3(0,1,0), this.scene);
            
            // Finally time to add some meshes
            // Create sphere shape and place it above ground
            let sphere = BABYLON.MeshBuilder.CreateSphere('sphere',{segments: 16, diameter: 2}, this.scene);
            sphere.position.y = 1; //not a magic number, but half or our diameter and height
            
            // Make a plane on the ground
            let ground = BABYLON.MeshBuilder.CreateGround('groundPlane',{width: 6, height: 6, subdivisions: 2}, this.scene);
            
        }

    titleIntro() :void{
        /*Setup camera, lights and camera control*/ 
        // We need a scene to create all our geometry and babylonjs items in
         this.scene = new BABYLON.Scene(this.engine);

         // Create lightning in our scene
          this.light = new BABYLON.HemisphericLight('skyLight', new BABYLON.Vector3(0,1,0), this.scene);

        /** Setup Terrain */
          // Create new material
          let groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
          // Apply ground texture
          groundMaterial.diffuseTexture = new BABYLON.Texture("images/brighton_texture.png",this.scene);
          // Apply height map
          let ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground","images/brighton_height_map.png",1081,1081,250,0,120,this.scene);

        // Position Camera within terrain
        // Definitely not ideal to manually position things, but until I learn the editor, it's just this for now.
        this.titlecamera = new BABYLON.FollowCamera('titlecamera',new BABYLON.Vector3(60,20,80),this.scene);
        this.titlecamera.setTarget(BABYLON.Vector3.Zero());
        this.titlecamera.rotation.x = -0.1;

        // Text Title / or 3D Model
        // To do .... later.

        /** Setup 'Snow' */
        // Create snow 
        let fountain = BABYLON.Mesh.CreateBox("fountain",1.1,this.scene);
        // Position box above camera
        fountain.position = new BABYLON.Vector3(59,22,79);
        // Setup particle emmitter
        var particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
        particleSystem.particleTexture = new BABYLON.Texture("images/flare.png", this.scene);
        particleSystem.emitRate = 100;
        particleSystem.emitter = fountain;
        particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
        particleSystem.minSize = 0.01;
        particleSystem.maxSize = 0.02;
        particleSystem.start();
    }

    run() : void {
        this.engine.runRenderLoop(()=> {
            this.scene.render();
          });
    }
  }


  // Create our game class using the render canvas element
  let game = new Game('renderCanvas');

  // Create the scene
  // game.createScene();
  game.titleIntro();
  // start animation
  game.run();