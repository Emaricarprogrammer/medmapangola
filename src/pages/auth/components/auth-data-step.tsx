import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormStepProps } from "@/schemas/sign-up"
import { AtSign, Phone, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export function AuthDataStep({ register, errors }: FormStepProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Label className="flex items-center text-foreground/60 ml-2 gap-1">
          <Phone className="w-4 h-4" />
          <span>Telefone</span>
        </Label>
        <Input
          type="number"
          placeholder="999 999 999"
          className="bg-neutral-50 placeholder:text-neutral-500 h-12"
          {...register("contacto", { valueAsNumber: true })}
        />
        <span className="text-rose-600 text-sm font-light text-left ">
          {errors.phone &&
            typeof errors.phone.message === "string" &&
            errors.phone.message}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="flex items-center text-foreground/60 ml-2 gap-1">
          <AtSign className="w-4 h-4" />
          <span>E-mail</span>
        </Label>
        <Input
          type="email"
          placeholder="seu@email.com"
          className="bg-neutral-50 placeholder:text-neutral-500 h-12"
          {...register("email")}
        />
        <span className="text-rose-600 text-sm font-light text-left ">
          {errors.email &&
            typeof errors.email.message === "string" &&
            errors.email.message}
        </span>
      </div>
      <div className="flex flex-col gap-2 relative">
        <Label className="flex items-center text-foreground/60 ml-2 gap-1">
          <Lock className="w-4 h-4" />
          <span>Palavra passe</span>
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="*** *** ***"
            className="bg-neutral-50 placeholder:text-neutral-500 h-12 pr-10"
            {...register("password")}
          />

          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <span className="text-rose-600 text-sm font-light text-left">
          {errors.password &&
            typeof errors.password.message === "string" &&
            errors.password.message}
        </span>
      </div>
    </div>
  )
}
