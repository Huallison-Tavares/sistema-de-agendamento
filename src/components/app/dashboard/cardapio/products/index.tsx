"use client"

import { ProductForm } from "@/components/commun/forms/productForm";
import { findProduct } from "@/db/queries/products";
import { productsTypes } from "@/types/menu";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductRegister = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const action = searchParams.get("action");
    const categoryId = searchParams.get("categoryId");

    const [product, setProduct] = useState<productsTypes | undefined>(undefined);
      
      useEffect(() => {
        async function loadData(productId: string) {
          const result = await findProduct(productId);
          setProduct(result);
        }

        if(id !== null && action == "edit"){
            loadData(id);
        }

      }, [id]);

    return (  
        <>
            {action == "edit" ? (
                <>
                    {product !== undefined ? (
                        <ProductForm product={product} categoryId={product?.categoryId ?? ""} action={action}/>
                    ) : (
                        <h2>Carregando...</h2>
                    )}
                </>
            ): (
                <ProductForm product={undefined} categoryId={categoryId ?? ""} action={action ?? "create"}/>
            )}
        </>
    );
}
 
export default ProductRegister;