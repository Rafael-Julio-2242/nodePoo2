"use client";
import "@tensorflow/tfjs";
import * as tf from "@tensorflow/tfjs";
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
import Swal from "sweetalert2";
import { preProcessImage, UploadImage } from "@/actions/data";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CLASSNAMES = ["healthy", "rust"];

export default function Home() {

  const [inferenceImage, setInferenceImage] = useState<File>();

  const [insertImage, setInsertImage] = useState<File>();
  const [insertImageType, setInsertImageType] = useState<'healthy' | 'rust' | ''>('');

  const [insertLoading, setInsertLoading] = useState(false);

  const [inferenceLoading, setInferenceLoading] = useState(false);

  const [modelLoading, setModelLoading] = useState(false);

  const [model, setModel] = useState<tf.LayersModel>();

  const inference = async () => {
    // Aqui eu crio uma função no backend para realizar a inferência
    if (inferenceImage === undefined) return;

    if (model === undefined) {
      Swal.fire({
        icon: "error",
        title: "Modelo não carregado!",
        text: "O modelo não foi carregado! Por favor reinicie a página",
      });
      return;
    }

    try {
      setInferenceLoading(true);

      const imageArrayBuffer = await inferenceImage.arrayBuffer();
      const imageBase64 = Buffer.from(imageArrayBuffer).toString("base64");

      const image = JSON.parse(
        await preProcessImage(
          JSON.stringify(imageBase64)
        )
      );      

      const image4D = tf.tensor4d(image.data.data, [
        1,
        image.info.height,
        image.info.width,
        image.info.channels,
      ]);

      const prediction = model.predict(image4D);

      const predictedClassIndex = (prediction as any).argMax(-1).arraySync()[0];

      const inferenceResult = CLASSNAMES[predictedClassIndex]; // Resultado da predição

      Swal.fire({
        icon: "success",
        title: "Inferência concluída!",
        text: `A imagem foi classificada como ${
          inferenceResult === "healthy" ? "saudável" : "doente"
        }`,
      });
      // Exibir resultado da inferência na modal
    } catch (error: any) {
      console.log("[Houve um erro ao realizar a inferência]: ", error.message);
      Swal.fire({
        icon: "error",
        title: "Houve um erro ao realizar a inferência!",
        text: error.message,
      });
      return;
    } finally {
      setInferenceLoading(false);
    }
  };

  const onInsertImage = async () => { 
    if (insertImage === undefined) return;
    if (insertImageType === '') return;

    try {
      setInsertLoading(true);

      const imageArrayBuffer = await insertImage.arrayBuffer();
      const imageBase64 = Buffer.from(imageArrayBuffer).toString("base64");

      const result = await UploadImage(imageBase64, insertImageType);
      
      if (!result) {
        Swal.fire({
          icon: "error",
          title: "Houve um erro ao inserir a imagem!",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Imagem inserida com sucesso!",
      });
      setInsertImage(undefined);
      setInsertImageType('');
    } catch(error: any) { 
      Swal.fire({
        icon: "error",
        title: "Houve um erro ao inserir a imagem!",
        text: error.message,
      })
    } finally {
      setInsertLoading(false);
    }

  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setInferenceImage(event.target.files[0]);
    }
  };

  const handleInsertFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setInsertImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    async function loadModel() {
      try {
        setModelLoading(true);

        const model = await tf.loadLayersModel("/modeljson/model.json");
        setModel(model);
      } catch (error: any) {
        console.log("[Houve um erro ao carregar o modelo]: ", error.message);
        Swal.fire({
          icon: "error",
          title: "Houve um erro ao carregar o modelo!",
          text: error.message,
        });
      } finally {
        setModelLoading(false);
      }
    }

    loadModel();
  }, []);



  return (
    <div className="flex flex-col justify-center mx-40">
      <div className="mt-40 flex flex-col gap-12">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="bg-[#7E1BCA] p-4 text-white rounded-xl text-2xl">
              Realizar Inferência
            </AccordionTrigger>
            <AccordionContent className="bg-violet-300 py-20 rounded-xl border-0">
              {inferenceLoading || modelLoading ? (
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"ghost"} className="rounded-xl w-full text-xl">
                      Inserir dados
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex flex-col gap-8">
                      <Label>Selecione o Tipo da Imagem</Label>
                      <Select onValueChange={(value) => setInsertImageType((value as any))}>
                        <SelectTrigger>
                          <SelectValue placeholder="O tipo da Imagem" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="healthy">Saudável</SelectItem>
                          <SelectItem value="rust">Doente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-8">
                      <Label htmlFor='insertImageInput'>Selecione a Imagem</Label>
                      <Input
                        id="insertImageInput"
                        type="file"
                        accept="image/*"
                        placeholder="Selecione uma imagem"
                        multiple={false}
                        className="rounded-xl hover:cursor-pointer"
                        onChange={handleInsertFileChange}
                      />
                    </div>
                    <Button
                      disabled={insertImage === undefined || insertImageType === ''}
                      onClick={insertImage !== undefined && insertImageType !== '' ? onInsertImage : undefined}
                    >
                      Inserir Imagem
                    </Button>
                  </DialogContent>
                </Dialog>
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
      </div>
    </div>
  );
}
