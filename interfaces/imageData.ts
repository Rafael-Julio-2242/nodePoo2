interface ImageData {
  name: string;
  path: string;
}

interface ImageTransfer {
  name: string;
  imageBase64: string;
}

export type {
  ImageData,
  ImageTransfer
}