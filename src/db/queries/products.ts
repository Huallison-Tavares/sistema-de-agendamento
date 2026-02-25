"use server"

import { eq } from "drizzle-orm";
import { db } from "..";
import { productTable } from "../schema";
import { productsTypes } from "@/types/menu";

export const setProduct = async (products: productsTypes) => {
    try{
        const result = await db.insert(productTable).values(products).returning();

        return result[0];
    }catch(error){
        console.error("Erro ao inserir produto:", error);
        throw error;
    }
}

export const deleteProduct = async(id: string) => {
    try {
        await db.delete(productTable)
        .where(eq(productTable.id, id));
        
        return { success: true };
    } catch (error) {
        console.error("Erro ao deletar o produto:", error);
        return { success: false, error: "Não foi possível deletar o produto." };
    }
}

export const updateProduct = async(id: string, products: productsTypes) => {
    try {
        await db.update(productTable)
        .set(products)
        .where(eq(productTable.id, id));

        return { success: true };
    } catch(error) {
        console.error("Erro ao deletar o produto:", error);
        return { success: false, error: "Não foi possível atualizar o produto." };
    }
}

export const findProduct = async(id: string) => {
    try {
        const result = await db.query.productTable.findFirst({
            where: (productTable, {eq}) => eq(productTable.id, id),
            with: {
                additional: true,
                groupOfAdditional: {
                    with: {
                        additional: true
                    }
                }
            }
        });

        return result;
    }catch (error){
        console.error("Erro ao buscar o produto:", error);
        throw error;
    }
}