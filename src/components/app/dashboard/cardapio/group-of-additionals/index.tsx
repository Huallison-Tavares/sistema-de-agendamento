"use client"

import { GroupOfAdditinalForm } from "@/components/commun/forms/groupAdditinalsForm";
import { findGroupOfAdditional } from "@/db/queries/group-additional";
import { groupOfAdditionalType } from "@/types/menu";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GroupOfAdditionalsRegister = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const action = searchParams.get("action");
    const productId = searchParams.get("productId");

    const [group, setGroup] = useState<groupOfAdditionalType | undefined>(undefined);
      
    useEffect(() => {
        async function loadData(groupId: string) {
            const res = await findGroupOfAdditional(groupId);
            setGroup(res);
        }

        if(id !== null && action == "edit"){
            loadData(id);
        }

    }, [id]);

    return ( 
        <>
            {action == "edit" ? (
                <>
                    {group !== undefined ? (
                        <GroupOfAdditinalForm group={group} productId={group?.productId} action={action}/>
                    ) : (
                        <h2>Carregando...</h2>
                    )}
                </>
            ): (
                <GroupOfAdditinalForm group={undefined} productId={productId ?? ""} action={action ?? "create"}/>
            )}
        </>
    );
}
 
export default GroupOfAdditionalsRegister;