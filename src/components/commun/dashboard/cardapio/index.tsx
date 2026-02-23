import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"
import HeaderCardapio from "./components/header"
import GroupAdditional from "./components/group-additional"

export function CadastroCardapio() {
  return (
    <div className="w-full flex justify-center">
        <Accordion type="single" collapsible className="w-1/2 space-y-4">
        {/* NÍVEL 1: CATEGORIA */}
        <AccordionItem value="categoria-1" className="border rounded-lg px-4 shadow-sm bg-white">
            <HeaderCardapio />

            <AccordionContent className="pt-2 pb-6 space-y-4">
                {/* NÍVEL 2: GRUPO DE ADICIONAIS */}
                <GroupAdditional />
            </AccordionContent>
        </AccordionItem>
        </Accordion>
    </div>
  )
}