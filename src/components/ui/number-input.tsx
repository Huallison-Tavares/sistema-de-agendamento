"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberInputProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  fields: any;
}

export function NumberInput({ 
  value = 0, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  fields
}: NumberInputProps) {
  return (
    <div className="flex items-center gap-1 w-fit border rounded-lg p-1 bg-background">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md cursor-pointer"
        onClick={() => fields.onChange(Number(fields.value) - 1)}
        disabled={fields.value <= min}
        type="button"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <Input
        {...fields}
        type="number"
        value={fields.value}
        onChange={(e) => fields.onChange(Number(e.target.value))}
        className="h-8 w-16 border-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-0"
      />

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md cursor-pointer"
        onClick={() => fields.onChange(Number(fields.value) + 1)}
        disabled={fields.value >= max}
        type="button"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}