import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormStepProps } from "@/schemas/sign-up"
import {
  BriefcaseBusiness,
  LucideUserCog,
  Barcode,
  Building,
} from "lucide-react"
import { Controller } from "react-hook-form"

export function PersonalDataStep({ register, errors, control }: FormStepProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label className="flex items-center text-foreground/60 ml-2 gap-1">
          <BriefcaseBusiness className="w-4 h-4" />
          <span>Firma</span>
        </Label>
        <Input
          type="text"
          placeholder="Firma, Lda"
          className="bg-neutral-50 placeholder:text-neutral-500 h-12"
          {...register("firma")}
        />
        <span className="text-rose-600 text-sm font-light text-left ">
          {errors.company &&
            typeof errors.company.message === "string" &&
            errors.company.message}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <Label className="flex items-center text-foreground/60 ml-2 gap-1">
          <LucideUserCog className="w-4 h-4" />
          <span>Tipo de Entidade</span>
        </Label>

        <Controller
          name="tipo_entidade"
          control={control}
          render={({ field }) => {
            return (
              <Select defaultValue="" onValueChange={field.onChange}>
                <SelectTrigger className="bg-neutral-50 placeholder:text-neutral-500 h-12">
                  <SelectValue placeholder="Selecione uma entidade" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="farmacia">Farmácia</SelectItem>
                  <SelectItem value="deposito">Depósito</SelectItem>
                </SelectContent>
              </Select>
            )
          }}
        />
        <span className="text-rose-600 text-sm font-light text-left ">
          {errors.entity &&
            typeof errors.entity.message === "string" &&
            errors.entity.message}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <Label className="flex items-center text-foreground/60 ml-2 gap-1">
          <Barcode className="w-4 h-4" />
          <span>NIF</span>
        </Label>
        <Input
          type="text"
          placeholder="00000000LA"
          className="bg-neutral-50 placeholder:text-neutral-500 h-12"
          {...register("nif")}
        />
        <span className="text-rose-600 text-sm font-light text-left ">
          {errors.nif &&
            typeof errors.nif.message === "string" &&
            errors.nif.message}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <Label className="flex items-center text-foreground/60 ml-2 gap-1">
          <Building className="w-4 h-4" />
          <span>Cidade</span>
        </Label>
        <Input
          type="text"
          placeholder="Adcione sua cidade"
          className="bg-neutral-50 placeholder:text-neutral-500 h-12"
          {...register("cidade")}
        />
        <span className="text-rose-600 text-sm font-light text-left ">
          {errors.city &&
            typeof errors.city.message === "string" &&
            errors.city.message}
        </span>
      </div>
    </div>
  )
}
