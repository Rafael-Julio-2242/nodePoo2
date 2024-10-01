"use server";

import { MongoClient, GridFSBucket } from "mongodb";
import * as fs from "fs";

const url = process.env.MONGO_URL!;
const dbName = process.env.DB_NAME!;
const healthyBucketName = process.env.HEALTHY_BUCKET_NAME!;
const rustBucketName = process.env.RUST_BUCKET_NAME!;

async function UploadImage(file: File) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, {
      bucketName: process.env.BUCKET_NAME!,
    });

    const uploadStream = bucket.openUploadStream(file.name);
    fs.createReadStream(file.webkitRelativePath)
      .pipe(uploadStream)
      .on("error", (error: any) => {
        console.log("HOUVE UM ERRO AO ENVIAR A IMAGEM: ", error.message);
      })
      .on("finish", () => {
        console.log("Imagem salva com sucesso!");
      });

    return true;
  } catch (error: any) {
    console.log("HOUVE UM ERRO AO SALVAR A IMAGEM: ", error.message);
    return false;
  } finally {
    await client.close();
  }
}

async function GetImages() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);

    const healthyBucket = new GridFSBucket(db, { bucketName: healthyBucketName });
    const rustBucket = new GridFSBucket(db, { bucketName: rustBucketName });

    const healthyImages = await healthyBucket.find().toArray();
    const rustImages = await rustBucket.find().toArray();

    if (healthyImages.length === 0) console.log("[NAO FOI ENCONTRADA NENHUMA IMAGEM HEALTHY]");
    else {
      console.log('[HEALTHY IMAGES ARRAY]');
      console.log('-------------------------------------------------------------');
      healthyImages.forEach(image => {
        console.log(`Name: ${image.filename} - id: ${image._id} - Size: ${image.length} - UpDate: ${image.uploadDate}`);
      })
      console.log('-------------------------------------------------------------');
    }

    if (rustImages.length === 0) console.log('[NÃO FOI ENCONTRADA NENHUMA IMAGEM RUST]');
    else {
      console.log('[RUST IMAGES ARRAY]');
      console.log('-------------------------------------------------------------');
      rustImages.forEach(image => {
        console.log(`Name: ${image.filename} - id: ${image._id} - Size: ${image.length} - UpDate: ${image.uploadDate}`);
      })
      console.log('-------------------------------------------------------------');
    }

    return { healthyImages, rustImages };
  } catch (error: any) {
    console.log("[HOUVE UM ERRO AO BUSCAR AS IMAGENS]: ", error.message);
    return null;
  } finally {
    await client.close();
  }
}

export { UploadImage, GetImages };
