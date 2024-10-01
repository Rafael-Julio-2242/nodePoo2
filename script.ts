import dotenv from "dotenv";
import * as fs from "fs/promises";
import path from 'path';
import mongoose from "mongoose";
import { ImageSchema } from "./schemas/imageSchema";


const insereDatasetInicial = async () => {
  dotenv.config();
  try {
    const url = process.env.MONGO_URL!;

    const healthyImageDir = './dataset/healthy';
    const rustImageDir = './dataset/rust';

    await mongoose.connect(url);

    console.log('[--------------------------------------- HEALTHY ---------------------------------------------------]');

    const healthyFiles = await fs.readdir(healthyImageDir);
    const healthyPromises = healthyFiles.map(async file => {
      const filePath = path.join(__dirname, healthyImageDir, file);
      const healthyImageModel = mongoose.model(process.env.HEALTHY_MODEL_NAME!, ImageSchema);

      const healthyImage = new healthyImageModel({
        name: file,
        path: filePath
      });

      if (healthyImage.isNew) {
        console.log('[SAVING HEALTHY IMAGE.....]');
        await healthyImage.save();
      }
    })


    console.log('[--------------------------------------- HEALTHY ---------------------------------------------------]');

    console.log('[--------------------------------------- RUST ---------------------------------------------------]');
    
    const rustFiles = await fs.readdir(rustImageDir);
    const rustPromises = rustFiles.map(async file => {
      const filePath = path.join(__dirname, rustImageDir, file);
      const rustImageModel = mongoose.model(process.env.RUST_MODEL_NAME!, ImageSchema);

      const rustImage = new rustImageModel({
        name: file,
        path: filePath
      });

      if (rustImage.isNew) {
        console.log('[SAVING RUST IMAGE.....]');
        await rustImage.save();
      }
    });

    console.log('[--------------------------------------- RUST ---------------------------------------------------]');

    await Promise.all([...healthyPromises, ...rustPromises]);

    console.log('[IMAGENS SALVAS COM SUCESSO]!');
    
  } catch (error: any) {
    console.log("HOUVE UM ERRO NA EXECUÇÃO DO SCRIPT: ", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

const buscaImagensTeste = async () => {
    // Buscar imagens
    dotenv.config();
    try {
      const url = process.env.MONGO_URL!;
      await mongoose.connect(url);
  
      const healthyImageModel = mongoose.model(process.env.HEALTHY_MODEL_NAME!, ImageSchema);
      const rustImageModel = mongoose.model(process.env.RUST_MODEL_NAME!, ImageSchema);
  
      const healthyImages = await healthyImageModel.find();
      const rustImages = await rustImageModel.find();
  
      console.log('[HEALTHY IMAGES]: ', healthyImages);
      console.log('[RUST IMAGES]: ', rustImages);
  
    } catch(error: any) {
      console.log('[HOUVE UM ERRO NA EXECUÇÃO DA BUSCA]: ', error.message);
    } finally {
      await mongoose.disconnect();
    }  
}