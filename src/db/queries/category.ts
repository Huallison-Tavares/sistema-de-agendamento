"use server"

import { eq } from "drizzle-orm";
import { db } from "..";
import { categoryTable } from "../schema";

export const setCategory = async (name: string) => {
    try{
        const result = await db.insert(categoryTable).values({
            name: name
        }).returning();

        return result[0]
    }catch(error){
        console.error("Erro ao inserir categoria:", error);
        throw error;
    }
}

export const deleteCategory = async(id: string) => {
    try {
        await db.delete(categoryTable)
        .where(eq(categoryTable.id, id));
        
        return { success: true };
    } catch (error) {
        console.error("Erro ao deletar categoria:", error);
        return { success: false, error: "Não foi possível deletar a categoria." };
    }
}

export const updateCategory = async(id: string, newName: string) => {
    try {
        await db.update(categoryTable)
        .set({ name: newName })
        .where(eq(categoryTable.id, id));

        return { success: true };
    } catch(error) {
        console.error("Erro ao deletar categoria:", error);
        return { success: false, error: "Não foi possível atualizar a categoria." };
    }
}