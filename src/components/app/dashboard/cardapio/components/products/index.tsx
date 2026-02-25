import { ProductForm } from "@/components/commun/forms/productForm";
import { ItemAction } from "@/components/commun/itemActions";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteProduct } from "@/db/queries/products";
import { MenuType, productsTypes } from "@/types/menu";
import { Edit, Package, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { toast } from "sonner";

interface ProductsProps {
    children: ReactNode | ReactNode[];
    productName: string;
    product: productsTypes;
    setMenu: Dispatch<SetStateAction<MenuType[]>>,
}

const Products = ({
    children,
    productName,
    product,
    setMenu
}: ProductsProps) => {
    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(product.id);

            setMenu((prevMenu) => prevMenu.map((category) => ({
                ...category,
                products: category.products.filter((p) => p.id !== product.id)
            })));

            toast.success("Produto deletado com sucesso.");
        } catch (error) {
            toast.error("Erro ao deletar.");
        }
    }

    return ( 
        <AccordionItem value="prod-1" className="border rounded-lg px-4 bg-slate-50/50">
            <div className="flex items-center">
                <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center gap-3">
                        <Package size={16} className="text-blue-500" />
                        <span className="font-semibold text-gray-700">{productName}</span>
                    </div>
                </AccordionTrigger>
                
                <ItemAction 
                    handleDelete={handleDeleteProduct} 
                    link={`/admin/dashboard/cardapio/produto?id=${product.id}&action=edit`} 
                    itemName="Produto"
                />
            </div>
            
            <AccordionContent className="space-y-4">
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}
 
export default Products;