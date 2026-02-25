import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { groupOfAdditionalType } from "@/types/menu";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

type ItemActionProps = {
    link: string;
    handleDelete: ((group: groupOfAdditionalType | undefined) => void) | (() => void);
    group?: groupOfAdditionalType;
    itemName?: string;
}

export const ItemAction = ({
    handleDelete,
    link,
    itemName,
    group
}: ItemActionProps) => {
    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer">Ações do item</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link
                            href={link}
                            className="flex gap-2 justify-center items-center"
                        >
                            <Edit width={16}/>
                            Editar {itemName ?? "item"}
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button
                            className="flex p-0! gap-2 cursor-pointer bg-transparent text-black font-normal hover:bg-transparent h-fit"
                            onClick={() => handleDelete(group)}
                        >
                            <Trash width={16}/>
                            Excluir {itemName ?? "item"}
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}