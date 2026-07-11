import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Cool purple rim/back light
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-2, 5, -8); // Positioned behind and above the character
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048; // Higher shadow map quality
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.bias = -0.001; // Reduce shadow acne
  scene.add(directionalLight);

  // Warm front key light to illuminate character features
  const keyLight = new THREE.DirectionalLight(0xffaa44, 0); // Cozy Amber face light
  keyLight.position.set(6, 8, 12); // Front, right, and slightly high
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 50;
  keyLight.shadow.bias = -0.001;
  scene.add(keyLight);

  // Screen glow point light (cyan/purple mix)
  const pointLight = new THREE.PointLight(0xa5d8ff, 0, 15, 2); // Soft cyan glow
  pointLight.position.set(0, 11, 4); // Will be dynamically repositioned
  pointLight.castShadow = true;
  pointLight.shadow.bias = -0.002;
  scene.add(pointLight);

  // Soft fill ambient light
  const ambientLight = new THREE.AmbientLight(0x1a1226, 0.4); // Deep subtle ambient fill
  scene.add(ambientLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight && screenLight.material && screenLight.material.opacity > 0.9) {
      // Reposition point light dynamically to the screen's world position
      const worldPos = new THREE.Vector3();
      screenLight.getWorldPosition(worldPos);
      pointLight.position.copy(worldPos);
      
      // Push the glow slightly forward/up so it casts onto the character's face & torso
      pointLight.position.z += 0.8;
      pointLight.position.y += 0.3;
      
      // Modulate intensity based on the emissive intensity of the screen animation
      pointLight.intensity = screenLight.material.emissiveIntensity * 12;
    } else {
      pointLight.intensity = 0;
    }
  }

  const duration = 2;
  const ease = "power2.inOut";
  
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.5,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1.5,
      duration: duration,
      ease: ease,
    });
    gsap.to(keyLight, {
      intensity: 1.0,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
