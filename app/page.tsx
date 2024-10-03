"use client";
import '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { useState } from "react";
import { loadImage } from '@/utils/preprocessingImage';


export default function Home() {
  const [inferenceImage, setInferenceImage] = useState<File>();

  const [inferenceLoading, setInferenceLoading] = useState(false);

  const [modelLoading, setModelLoading] = useState(false);

  const [model, setModel] = useState<tf.LayersModel>();

  const inference = async () => {
    // Aqui eu crio uma função no backend para realizar a inferência
    if (inferenceImage === undefined) return;

    try {
      setInferenceLoading(true);

      const model = await tf.loadLayersModel('');
      


      // Depois eu preciso carregar o modelo e dai então
      // iniciar a inferência
      // Depois mostrar o resultado
      

      console.log("tudo ok!");
    } catch (error: any) {
      console.log("[Houve um erro ao realizar a inferência]: ", error.message);
      return;
    } finally {
      setInferenceLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setInferenceImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    async function loadModel() {
      try {
        setModelLoading(true);

        

        const model = await tf.loadLayersModel('/modeljson/model.json');
        setModel(model);
        console.log('[model loaded]....');
      } catch(error: any) {
        console.log("[Houve um erro ao carregar o modelo]: ", error.message);
      } finally {
        setModelLoading(false);
      }
    }

    loadModel();
  },[]);

  return (
    <div className="flex flex-col justify-center mx-40">
      <div className="mt-40 flex flex-col gap-12">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="bg-[#7E1BCA] p-4 text-white rounded-xl text-2xl">
              Realizar Inferência
            </AccordionTrigger>
            <AccordionContent className="bg-violet-300 py-20 rounded-xl border-0">
              {inferenceLoading ? (
                <>Carregando...</>
              ) : (
                <>
                  <div className="mx-40 flex flex-col gap-8">
                    <Label
                      htmlFor="inferenceInput"
                      className="text-xl text-black text-center rounded-xl"
                    >
                      Selecione uma Imagem para Realizar a Inferência
                    </Label>
                    <Input
                      id="inferenceInput"
                      type="file"
                      accept="image/*"
                      placeholder="Selecione uma imagem"
                      multiple={false}
                      className="rounded-xl hover:cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <Button
                      disabled={inferenceImage === undefined}
                      onClick={
                        inferenceImage !== undefined ? inference : undefined
                      }
                      variant={"default"}
                      className="rounded-xl"
                    >
                      Realizar Inferência
                    </Button>
                  </div>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="bg-[#7E1BCA] p-4 text-white rounded-xl text-2xl text-center">
              Gerenciamento de dados
            </AccordionTrigger>
            <AccordionContent className="bg-violet-300 py-20 rounded-xl">
              <div className="mx-40 flex gap-8">
                <Button variant={"ghost"} className="rounded-xl w-full text-xl">
                  Inserir dados
                </Button>
                <a
                  className="rounded-xl w-full text-xl"
                  href="/images"
                  target="_blank"
                >
                  <Button
                    variant={"ghost"}
                    className="rounded-xl w-full text-xl"
                  >
                    Buscar dados
                  </Button>
                </a>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="bg-[#7E1BCA] p-4 text-white rounded-xl text-2xl">
              Modelo
            </AccordionTrigger>
            <AccordionContent className="bg-violet-300 py-20 rounded-xl">
              <div className="mx-40 flex gap-8">
                <Button variant={"ghost"} className="rounded-xl w-full text-xl">
                  Treinar Modelo
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
