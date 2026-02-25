"use client";

import * as z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { groupOfAdditionalType } from "@/types/menu";
import { setGroupOfAdditional, updateGroupOfAdditional } from "@/db/queries/group-additional";
import { NumberInput } from "@/components/ui/number-input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface GroupOfAdditionalFormProps {
  productId: string;
  group: groupOfAdditionalType | undefined;
  action: string;
}

const formSchema = z.object({
  name: z.string("Nome invalido.").min(1, "O nome é um campo obrigatório."),
  max: z.int().min(1),
  min: z.int(),
  isRequired: z.boolean()
});

type FormSchemaType = z.infer<typeof formSchema>;

export function GroupOfAdditinalForm({
  productId,
  group,
  action
}: GroupOfAdditionalFormProps) {
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: group?.name ?? "",
      max: group?.max ?? 1,
      min: group?.min ?? 0,
      isRequired: group?.isRequired ?? false
    },
    mode: "all",
  });

  console.log(group)

  const [max, setMax] = useState(group?.max ?? 1);
  const [min, setMin] = useState(group?.min ?? 0);

  async function updateSubmit(data: FormSchemaType) {
    try {
      if(group == undefined){
        return;
      }

      const productUpdate: groupOfAdditionalType= {
        name: data.name,
        id: group.id,
        imageUrl: null,
        additional: group.additional,
        isRequired: data.isRequired,
        max: data.max,
        min: data.min,
        productId: group.productId
      };

      await updateGroupOfAdditional(group.id, productUpdate);

      toast.success("Grupo de adicionais atualizado!");
      router.back();
      
    } catch (error) {
      toast.error("Erro ao atualizar.");
    }
  }

  async function createSubmit(data: FormSchemaType) {
    try {
      await setGroupOfAdditional({
        id: crypto.randomUUID(),
        productId: productId,
        name: data.name,
        imageUrl: null,
        additional: [],
        isRequired: data.isRequired,
        max: data.max,
        min: data.min,
      });

      toast.success("Grupo de adicionais criado!");
      router.back();
    } catch (error) {
      toast.error("Erro ao criar.");
    }
  }

  async function onSubmit(data: FormSchemaType) {
    if (group !== undefined) {
      await updateSubmit(data);
    } else {
      await createSubmit(data);
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{action !== "edit" ? "Cadastrar novo" : "Editar"} grupo de adicionais</CardTitle>
        <CardDescription>
          Faça {action !== "edit" ? "o cadastro" : "a edição"} para continuar.
        </CardDescription>
      </CardHeader>
      <CardContent>
          <form
            id="form-product"
            className="w-full"
            onSubmit={form.handleSubmit(onSubmit)}
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
              <div className="flex gap-4">
                <Controller
                  name="min"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-fit">
                      <FieldLabel
                        htmlFor="form-rhf-demo-title"
                        className="gap-0.5"
                      >
                        Min
                      <span className="text-red-500">*</span>
                      </FieldLabel>
                      <NumberInput value={min} onChange={setMin} fields={field}/>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="max"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-fit">
                      <FieldLabel
                        htmlFor="form-rhf-demo-title"
                        className="gap-0.5"
                      >
                        Max
                      <span className="text-red-500">*</span>
                      </FieldLabel>
                      <NumberInput value={max} onChange={setMax} min={1} fields={field}/>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="isRequired"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <FieldSet data-invalid={fieldState.invalid}>
                      <FieldGroup data-slot="checkbox-group">
                        <Field orientation="horizontal">
                          <Checkbox
                            id="form-rhf-checkbox-responses"
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel
                            htmlFor="form-rhf-checkbox-responses"
                            className="font-normal"
                          >
                            É obrigatório
                          </FieldLabel>
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
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
                {action !== "edit" ? "Cadastrar" : "Atualizar"}
              </Button>
            </Field>
          </form>
      </CardContent>
    </Card>
  );
}
