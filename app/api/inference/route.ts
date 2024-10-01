import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest) {

  console.log('[CHEGOU]!!');

  try {

    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = (body.file as File) || null;

    if (file === null) {
      console.log('[ARQUIVO NULO]!!!');
      return NextResponse.json({ message: "Arquivo Nulo" }, { status: 400 });
    }

    console.log('[Nome do arquivo]: ', file.name);

    const arrayBuffer = await file.arrayBuffer();
    
    // const resized = tf.image.resizeBilinear(imgTensor, [224, 224]);
    // const normalized = resized.div(tf.scalar(255));
    // const batched = normalized.expandDims(0); 

    // Aqui eu preciso carregar o modelo
    // e retornar a resposta

    
    console.log('[Nenhum erro....]');
    return NextResponse.json({ message: 'Ok', respostaInferencia: '' }, { status: 200 });
  } catch(error: any) {
    console.log('[ERRO AO EXECUTAR A INFERÊNCIA]: ', error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

}


export {
  POST
}
