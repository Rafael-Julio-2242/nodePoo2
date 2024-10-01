import { ImageData } from "@/interfaces/imageData";
import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.MONGO_URL!;

const con = mongoose.createConnection(url);

const ImageSchema = new Schema<ImageData>({
  name: String,
  path: String,
});

const HealthyImageModel = con.model('HealthyImage', ImageSchema);
const RustImageModel = con.model('RustImage', ImageSchema);

export {
  ImageSchema,
  HealthyImageModel,
  RustImageModel
}

