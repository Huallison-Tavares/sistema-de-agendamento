import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, UtensilsCrossed } from "lucide-react";
import Additional from "../additional";
import { groupOfAdditionalType } from "@/types/menu";

interface GroupAdditionalProps {
    groupAdditional: groupOfAdditionalType[]
}

const GroupAdditional = ({
    groupAdditional
}: GroupAdditionalProps) => {
    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {groupAdditional.map(group => (
                <Card key={group.id} className="p-4 border-dashed border-2">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <UtensilsCrossed size={14} className="text-orange-500" />
                            <h4 className="text-sm font-bold">{group.name}</h4>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">{group.isRequired ? "Obrigatoria": "Opcional"}</Badge>
                    </div>

                    {/* NÍVEL 4: ADICIONAIS (Itens finais) */}
                    <Additional additionals={group.additional}/>
                </Card>
            ))}

            {/* Botão para novo grupo */}
            <button className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 text-muted-foreground hover:bg-white hover:text-red-500 transition-colors">
                <Plus size={20} />
                <span className="text-xs font-medium mt-1">Novo Grupo de Adicionais</span>
            </button>
        </div>
    );
}
 
export default GroupAdditional;