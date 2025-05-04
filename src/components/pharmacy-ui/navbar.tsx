import { useCart } from "@/hooks/useCart"
import { HandPlatter, House, Package } from "lucide-react"
import { NavLink } from "react-router-dom"

export function PharmacyNavbar() {
  const { totalOrders } = useCart()

  return (
    <nav className="flex flex-col gap-10 font-light max-sm:flex-row max-sm:text-sm max-sm:gap-8 text-neutral-300 tracking-wide">
      <NavLink
        to="/farmacia"
        className="flex items-center gap-2 max-sm:gap-0 max-sm:flex-col text-neutral-400 font-medium hover:text-neutral-200"
      >
        <House className="h-5 w-5 max-sm:w-5 max-sm:h-5" />
        <span className="max-sm:xs">Home</span>
      </NavLink>

      <NavLink
        to="/farmacia/depositos-disponiveis"
        className="flex items-center gap-2 max-sm:gap-0 max-sm:flex-col text-neutral-400 font-medium hover:text-neutral-200"
      >
        <HandPlatter className="h-5 w-5 max-sm:w-5 max-sm:h-5" />
        <span className="max-sm:xs">Depósitos</span>
      </NavLink>

      <NavLink
        to="/farmacia/encomendas"
        className="flex items-center relative gap-2 max-sm:gap-0 max-sm:flex-col text-neutral-400 font-medium hover:text-neutral-200"
      >
        <Package className="h-5 w-5 max-sm:w-5 max-sm:h-5" />
        <span className="max-sm:xs">Encomendas</span>

        {totalOrders !== 0 && (
          <div className="w-5 h-5 flex items-center animate-ping max-lg:left-12 justify-center text-xs absolute left-36 rounded-full bg-rose-600 text-white">
            {totalOrders}
          </div>
        )}
      </NavLink>
    </nav>
  )
}
