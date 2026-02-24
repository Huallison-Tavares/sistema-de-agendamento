"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus} from "lucide-react";
import Products from "./components/products";
import HeaderCardapio from "./components/category";
import { getCardapio } from "@/db/queries/cardapio";
import GroupAdditional from "./components/group-additional";
import { MenuType } from "@/types/menu";
import React, { useEffect, useState } from "react";
import { CategoryForm } from "../../forms/categoryForm";
import { cn } from "@/lib/utils";

export function CadastroCardapio() {
  const [menu, setMenu] = useState<MenuType[]>([]);
  
  useEffect(() => {
    async function loadData() {
      const result = await getCardapio();
      setMenu(result);
    }
    loadData();
  }, []);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  
  return (
    <div className="p-4 space-y-6">
      <Accordion type="multiple" className="w-full space-y-4">
        {menu.map((card: MenuType) => (
          <AccordionItem key={card.id} value={card.id} className="border rounded-xl px-4 bg-white shadow-sm">
            {/* NÍVEL 1: CATEGORIA */}
            <HeaderCardapio categoryId={card.id} categoryName={card.name} countProduct={card.products.length} setMenu={setMenu}/>

            <AccordionContent className="pt-2 pb-6 space-y-6">
              {card.products.map(prod => (
                <React.Fragment key={prod.id}>
                  {/* NÍVEL 2: PRODUTOS (Dentro da Categoria) */}
                  <Accordion type="single" collapsible className="ml-6 space-y-3">
                      <Products productName={prod.name}>
                        {/* NÍVEL 3: GRUPOS DE ADICIONAIS (Dentro do Produto) */}
                        <GroupAdditional groupAdditional={prod.groupOfAdditional}/>
                      </Products>
                  </Accordion>
                </React.Fragment>
              ))}
              <Button variant="outline" className="w-full ml-6 bg-white border-red-200 text-red-600 hover:bg-red-50">
                <Plus size={16} className="mr-2" /> Novo Produto em {card.name}
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
        
        {/* Fomulario para adicionar uma categoria */}
        <AccordionItem value="form-1" className={cn("w-full", showCategoryForm ? "flex" : "hidden")}>
          <CategoryForm setMenu={setMenu} setShowCategoryForm={setShowCategoryForm}/>
        </AccordionItem>

        <Button 
          variant="outline" 
          className="w-full ml-6 bg-white border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
          onClick={() => setShowCategoryForm(true)}
        >
          <Plus size={16} className="mr-2" /> Criar nova Categoria
        </Button>
      </Accordion>
    </div>
  );
}