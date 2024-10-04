"use server";
import * as fs from "fs";
import path from 'path';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { ImageSchema } from "@/schemas/imageSchema";
import { ImageTransfer } from "@/interfaces/imageData";
import sharp from "sharp";

dotenv.config();
const url = process.env.MONGO_URL!;


async function preProcessImage(fileImage: string) {

  const buffer = Buffer.from(fileImage, 'base64');
  const image = await sharp(buffer)
    .resize(256, 256)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = image;

  const stringData = JSON.stringify({data, info});

  return stringData;
}


async function UploadImage(file: File) {

  try {
   
  } catch (error: any) {
    console.log("HOUVE UM ERRO AO SALVAR A IMAGEM: ", error.message);
    return false;
  } finally {
  }
}

async function GetImages() {
  try {
    await mongoose.connect(url);

    const healthyImageModel = mongoose.models[process.env.HEALTHY_MODEL_NAME!] || mongoose.model(process.env.HEALTHY_MODEL_NAME!, ImageSchema);
    const rustImageModel = mongoose.models[process.env.RUST_MODEL_NAME!] || mongoose.model(process.env.RUST_MODEL_NAME!, ImageSchema);

    const healthyImages = await healthyImageModel.find().sort({ _id: -1 }).limit(10); // Limitar a 10 Imagens
    const rustImages = await rustImageModel.find().sort({ _id: -1 }).limit(10); // Limitar a 10 imagens

    // Aqui eu tenho o caminho de cada uma das imagens
    // Será que se eu mandar os caminhos das imagens, ele já encontra elas?...
    
    // Vou precisar mandar os base64 das imagens....

    let healthyImagesList: ImageTransfer[] = [];
    let rustImagesList: ImageTransfer[] = [];

    console.log('[convertendo as imagens saudáveis em base64...]');
    for (const image of healthyImages) {
      const imagePath = image.path;
      const file = fs.readFileSync(path.resolve(imagePath));
      const base64Image = file.toString('base64');

      healthyImagesList.push({
        name: image.name,
        imageBase64: base64Image
      });
    }

    console.log('[convertendo as imagens doentes em base64...]');
    for (const image of rustImages) {
      const imagePath = image.path;
      const file = fs.readFileSync(path.resolve(imagePath));
      const base64Image = file.toString('base64');

      rustImagesList.push({
        name: image.name,
        imageBase64: base64Image
      });
    };

    console.log('[criando objeto de retorno].....');
    const returnObj = {
      healthyImagesList,
      rustImagesList
    }

    console.log('[criando string de retorno].....');
    const returnString = JSON.stringify(returnObj);

    console.log('[retornando....]');
    return returnString;
  } catch (error: any) {
    console.log('[HOUVE UM ERRO NA BUSCA DE IMAGENS]: ', error.message);
    return null;
  } finally {
    await mongoose.disconnect();
  }
}

export { UploadImage, GetImages, preProcessImage };
