'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";


export default function ImagesPage() {

  return (
    <div className='flex gap-32 justify-around mt-20 w-full'>
      <Accordion className="w-full mx-4" type="single" collapsible>
          <AccordionItem value="item-1" className="border-0 w-full">
            <AccordionTrigger className="bg-[#7E1BCA] p-4 w-full text-white rounded-xl text-2xl">
              Saudáveis
            </AccordionTrigger>
            <AccordionContent className="bg-violet-300 py-20 rounded-xl border-0 w-full">
              aoba {/* Aqui tem que vir uma lista de imagens */}
            </AccordionContent>
          </AccordionItem>
      </Accordion>
      <Accordion className="w-full mx-4" type="single" collapsible>
          <AccordionItem value="item-1" className="border-0 w-full">
            <AccordionTrigger className="bg-[#7E1BCA] p-4 text-white rounded-xl text-2xl w-full">
              Doentes
            </AccordionTrigger>
            <AccordionContent className="bg-violet-300 py-20 rounded-xl border-0 w-full">
              aoba  {/* Aqui tem que vir uma lista de imagens */}
            </AccordionContent>
          </AccordionItem>
      </Accordion>
    </div>
  )

}