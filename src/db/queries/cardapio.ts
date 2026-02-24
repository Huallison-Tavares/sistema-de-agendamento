"use server"

import { db } from "..";


export const getCardapio = async () => {
    return await db.query.categoryTable.findMany({
        with: {
            products: {
                with: {
                    groupOfAdditional: {
                        with: {
                            additional: true
                        }
                    },
                    additional: true
                }
            }
        }
    });
};

