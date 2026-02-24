"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Check, GripVertical, Layers, X } from "lucide-react"
import { AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "sonner"
import { setCategory } from "@/db/queries/category"
import { Dispatch, SetStateAction } from "react"
import { MenuType } from "@/types/menu"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  name: z
  .string("Nome invalido.")
  .min(3, "O nome deve ter pelo menos 3 caracteres.")
})

type FormSchemaType = z.infer<typeof formSchema>;

interface CategoryFormProps{
  setMenu: Dispatch<SetStateAction<MenuType[]>>,
  setShowCategoryForm: Dispatch<SetStateAction<boolean>>,
}

export function CategoryForm({
  setMenu,
  setShowCategoryForm
}: CategoryFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: ""
    },
    mode: "all"
  });

  const closeCategoryForm = () => {
    setShowCategoryForm(false);
    form.reset();
  }

  async function onSubmit(data: FormSchemaType) {
    try{
      const result = await setCategory(data.name);

      setMenu(prevMenu => [
        ...prevMenu, 
        {
          id: result.id,
          name: result.name,
          products: [],
        }
      ]);
      
      closeCategoryForm();

      toast.success("Categoria criada com sucesso.", {
          position: "top-right"
      });
    }catch(error) {
      toast.error("Erro ao salvar.");
    }
  }

  return (
    <Card className="w-full p-0">
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-2">
                      <GripVertical className="text-muted-foreground" size={18} />
                      <AccordionTrigger className="hover:no-underline" asChild>
                          <div className="flex items-center! justify-start gap-3">
                            <div className="bg-red-100 p-2 rounded-lg text-red-600">
                                <Layers size={20} />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                  <Input
                                      {...field}
                                      id="form-rhf-demo-title"
                                      aria-invalid={fieldState.invalid}
                                      placeholder="Digite o nome da categoria"
                                      autoComplete="on"
                                      type="text"
                                      className="text-xl font-bold text-gray-800"
                                  />
                                  {fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                                  )}
                                </div>

                                <div className="flex">
                                  <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 cursor-pointer" type="submit">
                                      <Check size={16} />
                                  </Button>
                                  <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 cursor-pointer" onClick={() => closeCategoryForm()}>
                                      <X size={16} />
                                  </Button>
                                </div>
                            </div>
                          </div>
                      </AccordionTrigger>
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
