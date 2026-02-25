import { Button } from "@/components/ui/button";
import { additionalTypes } from "@/types/menu";
import { convertPriceReal } from "@/utils/convertPrice";
import React from "react";

interface AdditionalProps {
    additionals: additionalTypes[]
}

const Additional = ({
    additionals
}: AdditionalProps) => {
    return ( 
        <div className="space-y-2">
            {additionals.map(additional => (
                <React.Fragment key={additional.id}>
                    <div className="flex justify-between p-2 bg-white rounded border text-xs">
                        <span>{additional.name}</span>
                        <span className="text-green-600">+ {convertPriceReal(additional.priceInCents)}</span>
                    </div>
                </React.Fragment>
            ))}
            <Button variant="ghost" size="sm" className="w-full h-7 text-[10px] text-blue-600">
                + Adicionar Opção
            </Button>
        </div>
    );
}
 
export default Additional;