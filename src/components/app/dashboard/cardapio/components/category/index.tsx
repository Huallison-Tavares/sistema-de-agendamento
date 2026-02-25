import { AccordionTrigger } from "@/components/ui/accordion";
import { deleteCategory, updateCategory } from "@/db/queries/category"; // Supondo que exista updateCategory
import { MenuType } from "@/types/menu";
import { Check, ChevronDownIcon, Edit, GripVertical, Layers, Trash, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"; // Importe seu componente de Input
import { Button } from "@/components/ui/button";

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
    
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(categoryName);

    const handleDeleteCategory = async () => {
        try {
            await deleteCategory(categoryId);
            setMenu((prevMenu) => prevMenu.filter(item => item.id !== categoryId));
            toast.success("Categoria deletada com sucesso.");
        } catch (error) {
            toast.error("Erro ao deletar.");
        }
    }

    const handleUpdateCategory = async () => {
        if (!newName.trim() || newName === categoryName) {
            setIsEditing(false);
            return;
        }

        try {
            await updateCategory(categoryId, newName);
            
            setMenu((prevMenu) => 
                prevMenu.map(item => item.id === categoryId ? { ...item, name: newName } : item)
            );
            
            setIsEditing(false);
            toast.success("Categoria atualizada!");
        } catch (error) {
            toast.error("Erro ao atualizar.");
        }
    }

    return (
        <div className="flex items-center gap-2">
            <GripVertical className="text-muted-foreground" size={18} />
            <AccordionTrigger className="hover:no-underline py-5" asChild>
                <div>
                    <div className="flex items-center gap-3" onClick={(e) => isEditing && e.stopPropagation()}>
                        <div className="bg-red-100 p-2 rounded-lg text-red-600">
                            <Layers size={20} />
                        </div>
                    
                        <div className="flex flex-col items-start">
                            {isEditing ? (
                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                    <Input
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="h-8 w-50"
                                        autoFocus
                                    />
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 cursor-pointer" onClick={handleUpdateCategory}>
                                        <Check size={16} />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 cursor-pointer" onClick={() => setIsEditing(false)}>
                                        <X size={16} />
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <span className="text-xl font-bold text-gray-800">{categoryName}</span>
                                    <span className="text-xs text-muted-foreground">{countProduct} Produtos Cadastrados</span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2 justify-center items-center h-full">
                        {/* Botão de Editar alterna o estado */}
                        <Edit
                            width={16}
                            className="cursor-pointer z-20 hover:text-blue-600"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(true);
                            }}
                        />
                        <Trash
                            width={16}
                            className="text-red-600 cursor-pointer z-20"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCategory();
                            }}
                        />
                        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                    </div>
                </div>
            </AccordionTrigger>
        </div>
    );
}

export default HeaderCardapio;