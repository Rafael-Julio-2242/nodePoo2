import { ImageData } from "@/interfaces/imageData";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ImageSchema = new Schema<ImageData>({
  name: String,
  path: String,
});


export {
  ImageSchema,
}

