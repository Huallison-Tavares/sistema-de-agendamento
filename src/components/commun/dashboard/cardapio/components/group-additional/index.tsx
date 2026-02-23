import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Additional from "../additional";

const GroupAdditional = () => {
    return ( 
        <div className="pl-6 border-l-2 border-red-100 space-y-4">
            <Card className="p-4 bg-slate-50/50">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2 items-center">
                        <h4 className="font-semibold text-sm">Escolha sua Carne</h4>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Obrigatório</Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600">+ Opção</Button>
                </div>

                {/* NÍVEL 3: OS ADICIONAIS EM SI */}
                <Additional />
                
            </Card>

            <Button variant="outline" className="w-full border-dashed">
                <Plus className="mr-2 h-4 w-4" /> Novo Grupo
            </Button>
        </div>
    );
}
 
export default GroupAdditional;