import { useCart } from "./useCart"

export function useSummary() {
  const { cartItems } = useCart()

  const summary = cartItems.reduce(
    (acc, cartItem) => {
      acc.subtotal += cartItem.preco * Number(cartItem.quantity)
      acc.total = acc.subtotal
      return acc
    },
    {
      total: 0,
      subtotal: 0,
    }
  )

  return { summary }
}
