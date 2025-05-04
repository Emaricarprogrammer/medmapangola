import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import { useSummary } from "@/hooks/useSummary"
import { priceFormatter } from "@/utils/formatter"
import { Package, ShoppingBag, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function CartSummary() {
  const navigate = useNavigate()
  const { totalItems, addOrders } = useCart()
  const { summary } = useSummary()

  async function handleEncomend() {
    addOrders()
    toast.success(`(${totalItems}) Items Enviados Para Encomenda!`, {
      action: {
        label: "visualizar",
        onClick: () => navigate("/farmacia/encomendas"),
      },
      icon: <Package />,
    })
  }

  return (
    <div className="bg-white p-6 rounded-tl-3xl rounded-br-3xl border border-neutral-200 shadow-sm">
      <h1 className="font-bold text-neutral-800 text-lg flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-emerald-600" />
        Resumo da Encomenda
      </h1>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
          <span className="text-neutral-600">Total de Medicamentos</span>
          <strong className="text-neutral-900 font-medium">{totalItems}</strong>
        </div>

        <div className="flex items-center justify-between py-3 px-2">
          <span className="text-neutral-600">Subtotal</span>
          <strong className="text-neutral-900 font-medium">
            {priceFormatter.format(summary.subtotal)}
          </strong>
        </div>

        <div className="flex items-center justify-between py-3 px-2 border-t border-dashed border-neutral-200 pt-4">
          <span className="text-neutral-800 font-semibold">Total</span>
          <strong className="text-emerald-600 text-xl font-bold">
            {priceFormatter.format(summary.total)}
          </strong>
        </div>

        <Button
          onClick={handleEncomend}
          disabled={totalItems === 0}
          className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 rounded-lg font-medium gap-2 transition-colors"
        >
          <ShoppingCart className="h-5 w-5" />
          Finalizar Encomenda
        </Button>
      </div>
    </div>
  )
}
