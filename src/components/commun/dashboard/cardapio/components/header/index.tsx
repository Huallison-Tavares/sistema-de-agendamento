import { AccordionTrigger } from "@/components/ui/accordion";
import { GripVertical } from "lucide-react";

const HeaderCardapio = () => {
    return ( 
        <div className="w-full flex items-center gap-2">
            <GripVertical className="text-muted-foreground" size={16} />
            <AccordionTrigger className="hover:no-underline py-4 w-full cursor-pointer">
                <div className="flex flex-col items-start gap-1">
                    <span className="text-lg font-bold">Burgers</span>
                    <span className="text-sm text-muted-foreground font-normal">3 grupos de adicionais</span>
                </div>
            </AccordionTrigger>
        </div>
    );
}
 
export default HeaderCardapio;