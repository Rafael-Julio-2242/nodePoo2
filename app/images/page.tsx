'use client';

import { GetImages } from "@/actions/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ImageTransfer } from "@/interfaces/imageData";
import Image from "next/image";
import React, { useEffect, useState } from "react";


export default function ImagesPage() {

  const [healthyImages, setHealthyImages] = useState<ImageTransfer[]>([]);
  const [rustImages, setRustImages] = useState<ImageTransfer[]>([]);

  useEffect(() => {

    async function buscaImagens() {

      try {
        
        const imagesData = await GetImages();

        if (imagesData === null) {
          throw new Error('Erro no Servidor');
        }

        const { healthyImagesList, rustImagesList } = JSON.parse(imagesData);

        console.log({ healthyImagesList, rustImagesList });


        setHealthyImages(healthyImagesList);
        setRustImages(rustImagesList);
      } catch(error: any) {
        console.log('[HOUVE UM ERRO AO BUSCAR AS IMAGENS]: ', error.message);
      }

    }

    buscaImagens();
  },[]);

  return (
    <div className='flex gap-32 justify-around mt-20 w-full'>
      <Accordion className="w-full mx-4" type="single" collapsible>
          <AccordionItem value="item-1" className="border-0 w-full">
            <AccordionTrigger className="bg-[#7E1BCA] p-4 w-full text-white rounded-xl text-2xl">
              Saudáveis
            </AccordionTrigger>
            <AccordionContent className="bg-violet-300 py-20 rounded-xl border-0 w-full px-8 flex flex-col justify-center gap-8">
              {healthyImages.map((imgData, index) => {
                return (
                  <Image key={index} src={`data:image/jpeg;base64,${imgData.imageBase64}`} alt={imgData.name} width={400} height={200} />
                )
              })}
            </AccordionContent>
          </AccordionItem>
      </Accordion>
      <Accordion className="w-full mx-4" type="single" collapsible>
          <AccordionItem value="item-1" className="border-0 w-full">
            <AccordionTrigger className="bg-[#7E1BCA] p-4 text-white rounded-xl text-2xl w-full">
              Doentes
            </AccordionTrigger>
            <AccordionContent className="bg-violet-300 py-20 rounded-xl border-0 w-full px-8 flex flex-col justify-center gap-8">
              {rustImages.map((imgData, index) => {
                  return (
                    <Image key={index} src={`data:image/jpeg;base64,${imgData.imageBase64}`} alt={imgData.name} width={400} height={200} />
                  )
                })}
            </AccordionContent>
          </AccordionItem>
      </Accordion>
    </div>
  )

}