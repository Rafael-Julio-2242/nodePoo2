import sharp from "sharp";
import * as tf from '@tensorflow/tfjs';

async function preProcessImage(fileImage: File) {


  const buffer = Buffer.from(await fileImage.arrayBuffer());
  const image = await sharp(buffer)
    .resize(256, 256)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = image;

  const image4D = tf.tensor4d(data, [1, info.height, info.width, info.channels]);

  return image4D;
}

export {
  preProcessImage
}