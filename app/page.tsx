"use client";

import { GetImages } from "@/actions/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Home() {
  const [inferenceImage, setInferenceImage] = useState<File>();

  const inference = () => {
    // Aqui eu crio uma função no backend para realizar a inferência
    console.log("[INFERÊNCIA REALIZADA!!!!]");
  };


  const onBuscarDados= async () => {
    await GetImages();
  }

  return (
    <div className="flex flex-col justify-center mx-40">
      <div className="mt-40 flex flex-col gap-12">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="bg-[#7E1BCA] p-4 text-white rounded-xl text-2xl">
              Realizar Inferência
            </AccordionTrigger>
            <AccordionContent className="bg-violet-300 py-20 rounded-xl border-0">
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
                  onChange={(e) => setInferenceImage(e.target.files?.[0])}
                />
                <Button
                  disabled={inferenceImage === undefined}
                  onClick={inferenceImage !== undefined ? inference : undefined}
                  variant={"default"}
                  className="rounded-xl"
                >
                  Realizar Inferência
                </Button>
              </div>
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
                <Button onClick={onBuscarDados} variant={"ghost"} className="rounded-xl w-full text-xl">
                  Buscar dados
                </Button>
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
