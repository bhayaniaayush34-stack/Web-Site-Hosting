const fs = require("fs");
const path = require("path");

const glbPath = path.join(__dirname, "character_decrypted.glb");
const fd = fs.openSync(glbPath, "r");

const header = Buffer.alloc(12);
fs.readSync(fd, header, 0, 12, 0);

const magic = header.toString("utf8", 0, 4);
const version = header.readUInt32LE(4);
const totalLength = header.readUInt32LE(8);

console.log(`GLB Magic: ${magic}, Version: ${version}, Total Length: ${totalLength}`);

if (magic !== "glTF") {
  console.error("Not a valid GLB file");
  process.exit(1);
}

const chunkHeader = Buffer.alloc(8);
fs.readSync(fd, chunkHeader, 0, 8, 12);

const chunkLength = chunkHeader.readUInt32LE(0);
const chunkType = chunkHeader.toString("utf8", 4, 8);

console.log(`First Chunk Length: ${chunkLength}, Type: ${chunkType}`);

if (chunkType !== "JSON") {
  console.error("First chunk is not JSON");
  process.exit(1);
}

const jsonBuffer = Buffer.alloc(chunkLength);
fs.readSync(fd, jsonBuffer, 0, chunkLength, 20);
fs.closeSync(fd);

const gltf = JSON.parse(jsonBuffer.toString("utf8"));

console.log("\n--- NODES ---");
if (gltf.nodes) {
  gltf.nodes.forEach((node, index) => {
    if (node.name) {
      console.log(`Node ${index}: ${node.name} (Mesh: ${node.mesh !== undefined ? node.mesh : 'none'}, Skin: ${node.skin !== undefined ? node.skin : 'none'})`);
    }
  });
}

console.log("\n--- MESHES ---");
if (gltf.meshes) {
  gltf.meshes.forEach((mesh, index) => {
    console.log(`Mesh ${index}: ${mesh.name}`);
    if (mesh.primitives) {
      mesh.primitives.forEach((prim, pIndex) => {
        console.log(`  Primitive ${pIndex}: Material: ${prim.material !== undefined ? prim.material : 'default'}`);
      });
    }
  });
}

console.log("\n--- MATERIALS ---");
if (gltf.materials) {
  gltf.materials.forEach((mat, index) => {
    console.log(`Material ${index}: ${mat.name}`);
    console.log(`  PBR:`, JSON.stringify(mat.pbrMetallicRoughness));
    if (mat.emissiveFactor) console.log(`  Emissive Factor:`, mat.emissiveFactor);
  });
}

console.log("\n--- SKINS ---");
if (gltf.skins) {
  gltf.skins.forEach((skin, index) => {
    console.log(`Skin ${index}: ${skin.name || 'unnamed'} (Joints: ${skin.joints ? skin.joints.length : 0})`);
  });
}
