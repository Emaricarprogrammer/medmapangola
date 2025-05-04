import { Toolbar } from "@/components/pharmacy-ui/toolbar"
import { ShoppingCart, ShoppingBasket } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { useCart } from "@/hooks/useCart"
import { CartItem } from "./cart-item"
import { Link } from "react-router-dom"
import { CartSummary } from "./cart-summary"

export function Cart() {
  const { cartItems } = useCart()

  return (
    <>
      <Helmet title='Encomendas' />

      <div>
        <Toolbar
          children={<ShoppingCart className='text-emerald-700 h-6 w-6' />}
          legend='Carrinho'
        />
      </div>

      <div className='mt-12 grid grid-cols-[1fr_400px] h-96 overflow-y-scroll max-sm:h-[30rem] gap-12 max-lg:grid-cols-1'>
        <div className='bg-white p-8 rounded-tl-3xl rounded-br-3xl shadow-lg border border-neutral-200 h-fit'>
          {cartItems.length !== 0 ? (
            cartItems.map((item) => {
              return <CartItem key={item.id_medicamento} item={item} />
            })
          ) : (
            <div className='flex flex-col items-center justify-center gap-4 p-8 text-center'>
              <div className='w-20 max-sm:hidden h-20 bg-neutral-100 rounded-full flex items-center justify-center'>
                <ShoppingBasket className='w-8 h-8 text-neutral-400' />
              </div>

              <div className='flex flex-col gap-1'>
                <h3 className='text-lg font-medium text-neutral-800'>
                  Seu carrinho está vazio
                </h3>
                <p className='text-neutral-500'>
                  Adicione medicamentos para vê-los aparecer aqui
                </p>
              </div>

              <Link
                to='/farmacia'
                className='mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'
              >
                Ver medicamentos
              </Link>
            </div>
          )}
        </div>

        <CartSummary />
      </div>
    </>
  )
}
