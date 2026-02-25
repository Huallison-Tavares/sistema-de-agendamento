"use server"

import { eq } from "drizzle-orm";
import { db } from "..";
import { groupOfAdditionalTable } from "../schema";
import { groupOfAdditionalType } from "@/types/menu";

export const setGroupOfAdditional = async (groupOfAdditional: groupOfAdditionalType) => {
    try{
        const result = await db.insert(groupOfAdditionalTable).values(groupOfAdditional).returning();

        return result[0];
    }catch(error){
        console.error("Erro ao inserir grupo de adicionais:", error);
        throw error;
    }
}

export const deleteGroupOfAdditional = async(id: string) => {
    try {
        await db.delete(groupOfAdditionalTable)
        .where(eq(groupOfAdditionalTable.id, id));
        
        return { success: true };
    } catch (error) {
        console.error("Erro ao deletar o grupo de adicionais:", error);
        return { success: false, error: "Não foi possível deletar o grupo de adicionais." };
    }
}

export const updateGroupOfAdditional = async(id: string, groupOfAdditional: groupOfAdditionalType) => {
    try {
        await db.update(groupOfAdditionalTable)
        .set(groupOfAdditional)
        .where(eq(groupOfAdditionalTable.id, id));

        return { success: true };
    } catch(error) {
        console.error("Erro ao deletar o grupo de adicionais:", error);
        return { success: false, error: "Não foi possível atualizar o grupo de adicionais." };
    }
}

export const findGroupOfAdditional = async(id: string) => {
    try {
        const result = await db.query.groupOfAdditionalTable.findFirst({
            where: (groupOfAdditionalTable, {eq}) => eq(groupOfAdditionalTable.id, id),
            with: {
                additional: true,
            }
        });

        return result;
    }catch (error){
        console.error("Erro ao buscar o grupo de adicionais:", error);
        throw error;
    }
}