const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const decryptFile = (inputFile, outputFile, password) => {
  const fileBuffer = fs.readFileSync(inputFile);
  const iv = fileBuffer.subarray(0, 16);
  const encryptedData = fileBuffer.subarray(16);

  const key = crypto.createHash("sha256").update(password).digest();
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  const decrypted = Buffer.concat([
    decipher.update(encryptedData),
    decipher.final()
  ]);

  fs.writeFileSync(outputFile, decrypted);
  console.log("Decrypted successfully to", outputFile);
};

const inputPath = path.join(__dirname, "character.enc");
const outputPath = path.join(__dirname, "character_decrypted.glb");

decryptFile(inputPath, outputPath, "Character3D#@");
