import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;

            // Define high-quality PBR materials for the character
            const skinMat = new THREE.MeshStandardMaterial({
              color: 0xffdbac, // Natural warm peach/beige skin tone
              roughness: 0.65,
              metalness: 0.02,
            });

            const shirtMat = new THREE.MeshStandardMaterial({
              color: 0x00e5ff, // Cyberpunk neon cyan hoodie
              roughness: 0.85,
              metalness: 0.05,
            });

            const pantMat = new THREE.MeshStandardMaterial({
              color: 0x121212, // Cyberpunk charcoal pants
              roughness: 0.9,
              metalness: 0.02,
            });

            const hairMat = new THREE.MeshStandardMaterial({
              color: 0x1a1522, // Rich dark plum/charcoal hair
              roughness: 0.75,
              metalness: 0.08,
            });

            const shoeMat = new THREE.MeshStandardMaterial({
              color: 0xf5f5f5, // Crisp white sneakers
              roughness: 0.45,
              metalness: 0.05,
            });

            const soleMat = new THREE.MeshStandardMaterial({
              color: 0x222222, // Dark sole contrast
              roughness: 0.7,
              metalness: 0.1,
            });

            const deskMat = new THREE.MeshStandardMaterial({
              color: 0x0f0d14, // Very dark plum/black matte desk surface
              roughness: 0.4,
              metalness: 0.1,
            });

            const computerMat = new THREE.MeshStandardMaterial({
              color: 0x1b1920, // Matte charcoal computer shell
              roughness: 0.5,
              metalness: 0.4,
            });

            const keyboardMat = new THREE.MeshStandardMaterial({
              color: 0x141416, // Matte dark keyboard case
              roughness: 0.6,
              metalness: 0.2,
            });

            const darkKeyMat = new THREE.MeshStandardMaterial({
              color: 0x242428, // Dracula slate-charcoal keycaps
              roughness: 0.5,
              metalness: 0.05,
            });

            const accentKeyMat = new THREE.MeshStandardMaterial({
              color: 0xc2a4ff, // Accent lavender keycaps
              roughness: 0.5,
              metalness: 0.05,
            });

            const functionKeyMat = new THREE.MeshStandardMaterial({
              color: 0x474b59, // Slate gray functional keycaps
              roughness: 0.5,
              metalness: 0.05,
            });

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const name = child.name;

                // Reassign materials to individual parts to break the shared 'default' material link
                if (name === "BODY.SHIRT") {
                  mesh.material = shirtMat;
                } else if (name === "Pant") {
                  mesh.material = pantMat;
                } else if (name === "hair") {
                  mesh.material = hairMat;
                } else if (name === "Shoe") {
                  mesh.material = shoeMat;
                } else if (name === "Sole") {
                  mesh.material = soleMat;
                } else if (
                  name === "Hand" ||
                  name === "Neck" ||
                  name === "Ear.001" ||
                  name === "Plane.007"
                ) {
                  mesh.material = skinMat;
                } else if (name === "Keyboard") {
                  mesh.material = keyboardMat;
                } else if (name.startsWith("KEYS")) {
                  const match = name.match(/KEYS\.(\d+)/);
                  const keyIndex = match ? parseInt(match[1]) : 0;
                  if (name === "KEYS" || keyIndex % 15 === 0) {
                    mesh.material = accentKeyMat; // Spacebar & ESC / Enter
                  } else if (keyIndex % 3 === 0) {
                    mesh.material = functionKeyMat; // F-Keys / Modifiers
                  } else {
                    mesh.material = darkKeyMat; // Alphanumeric keys
                  }
                } else if (name === "screenlight") {
                  if (mesh.material) {
                    const originalMat = mesh.material as THREE.MeshStandardMaterial;
                    const newScreenMat = new THREE.MeshStandardMaterial({
                      map: originalMat.map,
                      roughness: 0.15,
                      metalness: 0.8,
                      emissive: new THREE.Color(0xc2a4ff),
                      emissiveMap: originalMat.map || null,
                      emissiveIntensity: 2.0,
                    });
                    newScreenMat.name = originalMat.name; // Keep name for opacity animations
                    mesh.material = newScreenMat;
                  }
                } else if (name === "Cube.002" || name.startsWith("Plane")) {
                  if (name === "Cube.002") {
                    mesh.material = computerMat;
                  } else if (
                    name === "Plane" ||
                    name === "Plane.002" ||
                    name === "Plane.003" ||
                    name === "Plane.004"
                  ) {
                    // Give monitor background mesh the monitor shell color
                    if (name === "Plane.004") {
                      // Clone original material to preserve Material.027 logic in GsapScroll
                      const originalMat = mesh.material as THREE.Material;
                      mesh.material = originalMat.clone();
                      mesh.material.name = originalMat.name;
                      (mesh.material as THREE.MeshStandardMaterial).color.set(0x0e0c10);
                      (mesh.material as THREE.MeshStandardMaterial).roughness = 0.4;
                    } else {
                      mesh.material = deskMat;
                    }
                  }
                }
              }
            });

            await renderer.compileAsync(character, camera, scene);
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
