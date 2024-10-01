import dotenv from "dotenv";
import * as fs from "fs";
import path from 'path';
import mongoose, { Connection } from "mongoose";
import { HealthyImageModel, RustImageModel } from "./schemas/imageSchema";


(async () => {

  try {

    const healthyImageDir = './dataset/healthy';
    const rustImageDir = './dataset/rust';

    console.log('[--------------------------------------- HEALTHY ---------------------------------------------------]');

    fs.readdirSync(healthyImageDir).forEach(async file => { // Subindo imagens para o bucket "Healthy"
      const filePath = path.join(__dirname, healthyImageDir, file);
      
      const instance = await HealthyImageModel.findOne({ path: filePath });
      
      if (!instance) {

        const healthyImage = new HealthyImageModel({
          name: file,
          path: filePath
        });

        console.log('[SAVING HEALTHY IMAGE....]');
        await healthyImage.save();
      
        await healthyImage.db.close();
      }

    });
    console.log('[--------------------------------------- HEALTHY ---------------------------------------------------]');

    console.log('[--------------------------------------- RUST ---------------------------------------------------]');
    fs.readdirSync(rustImageDir).forEach(async file => { // Mudar a forma de fazer. Criar vários objetos ImageData e salvar de uma vez
      const filePath = path.join(__dirname, rustImageDir, file);

      const instance = await RustImageModel.findOne({ path: filePath });


      if (!instance) {
        const rustImage = new RustImageModel({
          name: file,
          path: filePath
        });
        console.log('[SAVING RUST IMAGE.....]');
        await rustImage.save();

        console.log('[Closing....]');
        await rustImage.db.close();
      }

    });
    console.log('[--------------------------------------- RUST ---------------------------------------------------]');

    console.log('[IMAGENS SALVAS COM SUCESSO]!');
  } catch (error: any) {
    console.log("HOUVE UM ERRO NA EXECUÇÃO DO SCRIPT: ", error.message);
  }
})();
