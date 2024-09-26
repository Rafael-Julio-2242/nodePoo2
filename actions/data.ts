'use server';

import { MongoClient, GridFSBucket } from 'mongodb';
import * as fs from 'fs';


const url = process.env.MONGO_URL!;
const dbName = process.env.DB_NAME!;


async function UploadImage(file: File) {

 const client = new MongoClient(url);

 try {
  await client.connect();
  const db = client.db(dbName);
  const bucket = new GridFSBucket(db, { bucketName: process.env.BUCKET_NAME! });

  const uploadStream = bucket.openUploadStream(file.name);
  fs.createReadStream(file.webkitRelativePath)
   .pipe(uploadStream)
   .on('error', (error: any) => {
    console.log('HOUVE UM ERRO AO ENVIAR A IMAGEM: ', error.message);
   })
   .on('finish', () => {
    console.log('Imagem salva com sucesso!');
   });

  return true;
 } catch(error: any) {
  console.log('HOUVE UM ERRO AO SALVAR A IMAGEM: ', error.message);
  return false;
 } finally {
  await client.close();
 }

}


export {
 UploadImage
}
