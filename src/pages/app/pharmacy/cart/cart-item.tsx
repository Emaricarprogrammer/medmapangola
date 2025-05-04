import { CartProps } from "@/contexts/cart"
import { useCart } from "@/hooks/useCart"
import { priceFormatter } from "@/utils/formatter"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemProps {
  item: CartProps
}
export function CartItem({ item }: CartItemProps) {
  const { removeMedicinalFromCart, onIncrementQuantity, onDecrementQuantity } =
    useCart()

  return (
    <div className='flex items-center border-b pb-4 gap-4 justify-between p-4 hover:bg-neutral-50 transition-colors'>
      <div className='flex items-center gap-4'>
        <div className='w-20 h-20 bg-white border border-neutral-200 rounded-lg overflow-hidden flex items-center justify-center'>
          <img
            src={item.imagem}
            alt={item.nome_comercial}
            className='w-full h-full object-contain'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <strong className='text-neutral-800'>{item.nome_generico}</strong>
          <span className='text-sm text-neutral-500'>
            {item.categoria} · {item.quantidade_disponivel} caixas Disponíveis
          </span>

          <div className='flex gap-3 mt-2'>
            <div className='flex items-center gap-3 bg-neutral-100/70 rounded-lg px-3 py-1'>
              <button
                onClick={() => {
                  onDecrementQuantity(item)
                }}
                className='text-emerald-600 hover:text-emerald-700 transition-colors w-5 h-5 flex items-center justify-center rounded-lg hover:bg-emerald-50'
              >
                <Minus className='w-3 h-3' />
              </button>

              <span className='text-sm font-medium w-5 text-center'>
                {item.quantity}
              </span>
              <button
                onClick={() => {
                  onIncrementQuantity(item)
                }}
                className='text-emerald-600 hover:text-emerald-700 transition-colors w-5 h-5 flex items-center justify-center rounded-lg hover:bg-emerald-50'
              >
                <Plus className='w-3 h-3' />
              </button>
            </div>

            <button
              onClick={() => {
                removeMedicinalFromCart(item)
              }}
              className='flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 transition-colors'
            >
              <Trash2 className='w-4 h-4' />
              <span className='max-sm:hidden'>Remover</span>
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-1 items-end max-sm:hidden'>
        <span className='font-bold text-neutral-800'>
          {priceFormatter.format(item.preco * Number(item.quantity))}
        </span>
        <span className='text-neutral-800 text-xs'>
          {priceFormatter.format(item.preco)} / Caixa
        </span>
      </div>
    </div>
  )
}
