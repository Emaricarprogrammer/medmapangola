import { HandPlatter, Hospital } from "lucide-react"

interface EntityTypeProps {
  type: "farmacia" | "deposito"
}
export function EntityType({ type }: EntityTypeProps) {
  return (
    <div className="flex items-center gap-1">
      {type === "deposito" && (
        <>
          <HandPlatter className="w-4 h-4" />
          <span>Depósito</span>
        </>
      )}
      {type === "farmacia" && (
        <>
          <Hospital className="w-4 h-4" />
          <span>Farmácia</span>
        </>
      )}
    </div>
  )
}
