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
import { GripVertical, Layers } from "lucide-react"
import { AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "sonner"
import { setCategory } from "@/db/queries/category"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { MenuType } from "@/types/menu"

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
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: ""
    },
    mode: "all"
  })

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
      setShowCategoryForm(false);
      form.reset();
      toast.success("Categoria criada com sucesso.", {
          position: "top-right"
      });
    }catch(error) {
      toast.error("Erro ao salvar.");
    }
  }

  return (
    <Card className="w-full sm:max-w-md p-0">
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
                      <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3">
                              <div className="bg-red-100 p-2 rounded-lg text-red-600">
                                  <Layers size={20} />
                              </div>
                              <div className="flex flex-col items-start">
                                  <Input
                                      {...field}
                                      id="form-rhf-demo-title"
                                      aria-invalid={fieldState.invalid}
                                      placeholder="Digite o nome da categoria"
                                      autoComplete="on"
                                      type="text"
                                      className="text-xl font-bold text-gray-800"
                                      onBlur={(e) => {
                                          field.onBlur(); // Avisa o RHF que o campo perdeu o foco
                                          form.handleSubmit(onSubmit)(); // Dispara a função de submit
                                      }}
                                  />
                                  {fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                                  )}
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
