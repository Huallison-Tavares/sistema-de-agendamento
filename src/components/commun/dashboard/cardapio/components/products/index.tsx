import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Package } from "lucide-react";
import { ReactNode } from "react";

interface ProductsProps {
    children: ReactNode | ReactNode[];
    productName: string;
}

const Products = ({
    children,
    productName
}: ProductsProps) => {
    return ( 
        <AccordionItem value="prod-1" className="border rounded-lg px-4 bg-slate-50/50">
            <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center gap-3">
                    <Package size={16} className="text-blue-500" />
                    <span className="font-semibold text-gray-700">{productName}</span>
                </div>
            </AccordionTrigger>
            
            <AccordionContent className="space-y-4">
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}
 
export default Products;