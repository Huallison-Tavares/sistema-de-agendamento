import { AccordionTrigger } from "@/components/ui/accordion";
import { deleteCategory } from "@/db/queries/category";
import { MenuType } from "@/types/menu";
import { ChevronDownIcon, GripVertical, Layers, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface HeaderCardapioProps {
    categoryId: string;
    categoryName: string;
    countProduct: number;
    setMenu: Dispatch<SetStateAction<MenuType[]>>,
}

const HeaderCardapio = ({
    categoryId,
    categoryName,
    countProduct,
    setMenu,
}: HeaderCardapioProps) => {
    const handleDeleteCategory = async () => {
        try{
            await deleteCategory(categoryId);
            setMenu((prevMenu) => prevMenu.filter(item => item.id !== categoryId));
            toast.success("Categoria deletada com sucesso.", {
                position: "top-right"
            })
        }catch(error){
            toast.error("Erro ao salvar.");
        }
    }

    return ( 
        <div className="flex items-center gap-2">
            <GripVertical className="text-muted-foreground" size={18} />
            <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg text-red-600">
                        <Layers size={20} />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="text-xl font-bold text-gray-800">{categoryName}</span>
                        <span className="text-xs text-muted-foreground">{countProduct} Produtos Cadastrados</span>
                    </div>
                </div>

                <div className="flex gap-2 justify-center items-center h-full ">
                    <Trash width={16} className="text-red-600 cursor-pointer z-20" onClick={() => handleDeleteCategory()}/>
                    <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                </div>
            </AccordionTrigger>
        </div>
    );
}
 
export default HeaderCardapio;