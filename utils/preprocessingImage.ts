


export function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target!.result as string;
      img.onload = () => resolve(img);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}