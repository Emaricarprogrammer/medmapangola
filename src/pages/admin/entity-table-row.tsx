import { TableRow, TableCell } from "@/components/ui/table"
import { EntityType } from "./entity-type"
import { Trash } from "lucide-react"

export function EntityTableRow() {
  return (
    <TableRow>
      <TableCell className="py-3 max-xl:py-2">Santa Catarina LDA</TableCell>
      <TableCell className="py-3 max-xl:py-2">
        <EntityType type="deposito" />
      </TableCell>
      <TableCell className="py-3 max-xl:py-2">02/05/1015</TableCell>
      <TableCell className="py-3 max-xl:py-2">
        <span
          title="Eliminar entidade"
          className="flex gap-2 items-center text-rose-600 cursor-pointer bg-rose-50 w-fit py-1 px-2 text-sm rounded-full"
        >
          <Trash className="w-4 h-4" />
          Eliminar conta
        </span>
      </TableCell>
    </TableRow>
  )
}
