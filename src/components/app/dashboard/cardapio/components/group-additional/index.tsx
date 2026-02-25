import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, UtensilsCrossed } from "lucide-react";
import Additional from "../additional";
import { groupOfAdditionalType, MenuType } from "@/types/menu";
import { ItemAction } from "@/components/commun/itemActions";
import { deleteGroupOfAdditional, updateGroupOfAdditional } from "@/db/queries/group-additional";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface GroupAdditionalProps {
    groupAdditional: groupOfAdditionalType[]
    setMenu: Dispatch<SetStateAction<MenuType[]>>,
    productId: string
}

const GroupAdditional = ({
    groupAdditional,
    setMenu,
    productId
}: GroupAdditionalProps) => {
    
    const handleDelete = async (group: groupOfAdditionalType | undefined) => {
        try {
            if(group === undefined){
                return;
            }

            await deleteGroupOfAdditional(group.id);

            setMenu((prevMenu) => prevMenu.map((category) => ({
                ...category,
                products: category.products.map((product) => ({
                    ...product,
                    groupOfAdditional: product.groupOfAdditional.filter((g) => g.id !== group.id)
                }))
            })));

            toast.success("Grupo de adicionais deletado com sucesso.");
        } catch (error) {
            toast.error("Erro ao deletar.");
        }
    }

    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {groupAdditional.map(group => (
                <Card key={group.id} className="p-4 border-dashed border-2">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <UtensilsCrossed size={14} className="text-orange-500" />
                            <h4 className="text-sm font-bold">{group.name}</h4>
                            <Badge variant="secondary" className="text-[10px]">{group.isRequired ? "Obrigatoria": "Opcional"}</Badge>
                        </div>

                        <ItemAction 
                            handleDelete={handleDelete}
                            group={group} 
                            link={`/admin/dashboard/cardapio/grupo-de-adicionais?id=${group.id}&action=edit`} 
                            itemName="Grupo de Adicionais"
                        />
                    </div>

                    {/* NÍVEL 4: ADICIONAIS (Itens finais) */}
                    <Additional additionals={group.additional}/>
                </Card>
            ))}

            {/* Botão para novo grupo */}
            <Link
                href={`/admin/dashboard/cardapio/grupo-de-adicionais?productId=${productId}`} 
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 text-muted-foreground hover:bg-white hover:text-red-500 transition-colors"
            >
                <Plus size={20} />
                <span className="text-xs font-medium mt-1">Novo Grupo de Adicionais</span>
            </Link>
        </div>
    );
}
 
export default GroupAdditional;