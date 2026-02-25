"use client";

import * as z from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Edit } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { MenuType, productsTypes } from "@/types/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setProduct, updateProduct } from "@/db/queries/products";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  categoryId: string;
  product: productsTypes | undefined;
  action: string;
}

const formSchema = z.object({
  name: z.string("Nome invalido.").min(1, "O nome é um campo obrigatório."),
  description: z.string("Descrição invalida").nullable(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function ProductForm({
  categoryId,
  product,
  action
}: ProductFormProps) {
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name,
      description: product?.description,
    },
    mode: "all",
  });

  async function updateSubmit(data: FormSchemaType) {
    try {
      if(product == undefined){
        return;
      }

      const productUpdate: productsTypes = {
        description: data.description,
        name: data.name,
        id: product.id,
        categoryId: categoryId,
        imageUrl: null,
        additional: product.additional,
        groupOfAdditional: product.groupOfAdditional,
      };

      await updateProduct(product.id, productUpdate);

      toast.success("Produto atualizado!");
      router.back();
      
    } catch (error) {
      toast.error("Erro ao atualizar.");
    }
  }

  async function createSubmit(data: FormSchemaType) {
    try {
      await setProduct({
        id: crypto.randomUUID(),
        categoryId: categoryId,
        name: data.name,
        description: data.description,
        imageUrl: null,
        additional: [],
        groupOfAdditional: []
      });

      toast.success("Produto criado!");
      router.back();
    } catch (error) {
      toast.error("Erro ao criar.");
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{action !== "edit" ? "Cadastrar novo" : "Editar"} produto</CardTitle>
        <CardDescription>
          Faça {action !== "edit" ? "o cadastro" : "a edição"} para continuar.
        </CardDescription>
      </CardHeader>
      <CardContent>
          <form
            id="form-product"
            className="w-full"
            onSubmit={form.handleSubmit(product !== undefined ? updateSubmit : createSubmit)}
          >
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-demo-title"
                      className="gap-0.5"
                    >
                      Nome
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite o nome"
                      autoComplete="on"
                      type="text"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-demo-title"
                      className="gap-0.5"
                    >
                      Descrição
                    </FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite uma descrição"
                      autoComplete="on"
                      type="text"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Field
              orientation="horizontal"
              className="mt-4 flex w-full justify-center"
            >
              <Button
                type="submit"
                form="form-product"
                className="cursor-pointer"
              >
                Atualizar
              </Button>
            </Field>
          </form>
      </CardContent>
    </Card>
  );
}
