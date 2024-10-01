"use server";

import { MongoClient, GridFSBucket } from "mongodb";
import * as fs from "fs/promises";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { ImageSchema } from "@/schemas/imageSchema";

dotenv.config();
const url = process.env.MONGO_URL!;

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

    const healthyImages = await healthyImageModel.find();
    const rustImages = await rustImageModel.find();

    // Aqui eu tenho o caminho de cada uma das imagens
    // Será que se eu mandar os caminhos das imagens, ele já encontra elas?...

    console.log('[HEALTHY IMAGES]: ', healthyImages);
    console.log('[RUST IMAGES]: ', rustImages);

    

    return JSON.stringify({ healthyImages, rustImages });
  } catch (error: any) {
    console.log('[HOUVE UM ERRO NA BUSCA DE IMAGENS]: ', error.message);
    return null;
  } finally {
    await mongoose.disconnect();
  }
}

export { UploadImage, GetImages };
