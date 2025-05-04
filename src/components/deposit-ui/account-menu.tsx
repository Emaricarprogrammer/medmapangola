import { Check, Package, Truck, UserCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export function AccountMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="h-9 w-9 border cursor-pointer">
          <AvatarImage />
          <AvatarFallback className=" text-emerald-800">
            <UserCircle />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="text-neutral-700 mt-4 w-96 border shadow-xl  bg-white"
      >
        <div className="flex items-center justify-between p-4 text-sm">
          <strong>Luanda Sul</strong>
          <span className="flex items-center gap-1 rounded-md bg-gray-50 p-3 py-1.5 font-bold hover:cursor-pointer">
            <Package className="h-4 w-4" />
            30 Medicamentos
          </span>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-start gap-3 p-4 transition-all hover:cursor-pointer hover:rounded-sm hover:bg-neutral-50">
              <Truck className="h-6 w-6 text-emerald-500" />

              <div className="flex flex-col">
                <strong>Meu Depósito</strong>
                <span className="text-neutral-700 text-sm">
                  Editar dados do depósito
                </span>
              </div>
            </div>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>Actualizar Dados do depósito</DialogTitle>
            <DialogDescription>
              Actualize os dados do seu depósito
            </DialogDescription>

            <form action="">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground/80 text-sm">Firma</Label>
                  <Input className="bg-neutral-50 h-10" placeholder="" />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-foreground/80 text-sm">NIF</Label>
                  <Input className="bg-neutral-50 h-10" placeholder="" />
                </div>
              </div>

              <Button
                type="submit"
                className="flex items-center mt-3 ml-auto font-bold rounded-md bg-gradient-to-tr to-emerald-500 from-emerald-600 gap-1"
              >
                <Check className=" w-4 h-4" />
                <span>Salvar</span>
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </PopoverContent>
    </Popover>
  )
}
