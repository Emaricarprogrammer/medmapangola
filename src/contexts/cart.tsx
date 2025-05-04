import { createContext, useEffect, useState } from "react"
import { Medicinal } from "@/@types/medicinals"
import { toast } from "sonner"
import { ShoppingBag } from "lucide-react"
import { Order } from "@/@types/pharmacy-orders"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registerOrder } from "@/api/pharmacy/register-order"

export interface CartProps extends Medicinal {
	quantity?: number
}

interface CartContextType {
	cartItems: CartProps[]
	totalItems: number

	addMedicinalToCart: (medicinal: CartProps) => void
	removeMedicinalFromCart: (medicinal: CartProps) => void

	onIncrementQuantity: (medicinal: CartProps) => void
	onDecrementQuantity: (medicinal: CartProps) => void

	orders: Order[]
	totalOrders: number
	addOrders: () => void
}
export const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [cartItems, setCartItems] = useState<CartProps[]>([])
	const [orders, setOrders] = useState<Order[]>([])

	const totalItems = cartItems.length
	const totalOrders = orders.length

	function addMedicinalToCart(medicinal: CartProps) {
		const medicinalAlreadyExistInTheCart = cartItems.some((item) => {
			return item.id_medicamento === medicinal.id_medicamento
		})

		if (medicinalAlreadyExistInTheCart) {
			const updatedCartItems = cartItems.map((item) => {
				if (item.id_medicamento === medicinal.id_medicamento) {
					return {
						...item,
						quantity: item.quantity ? item.quantity + 1 : 1,
					}
				}

				return item
			})

			toast.warning(
				`${medicinal.nome_generico} Já existe no carrinho, Deseja Aumetar a Quantidade?, `,

				{
					icon: <ShoppingBag className="w-5 h-5" />,
					action: {
						label: "Confirmar",
						onClick: () => {
							setCartItems(updatedCartItems)
						},
					},
				}
			)
		} else {
			setCartItems([...cartItems, { ...medicinal, quantity: 1 }])
			toast.success(`${medicinal.nome_generico} adicionado ao carrinho!`)
		}
	}

	function removeMedicinalFromCart(medicinal: CartProps) {
		const cartItemsWithoutRemoved = cartItems.filter((item) => {
			return item.id_medicamento !== medicinal.id_medicamento
		})

		setCartItems(cartItemsWithoutRemoved)
		toast.warning(`${medicinal.nome_generico} removido do carrinho!`)
	}

	function onIncrementQuantity(medicinal: CartProps) {
		const updatedCartItems = cartItems.map((item) => {
			if (item.id_medicamento === medicinal.id_medicamento) {
				return {
					...item,
					quantity: item.quantity ? item.quantity + 1 : 1,
				}
			}

			return item
		})

		setCartItems(updatedCartItems)
	}

	function onDecrementQuantity(medicinal: CartProps) {
		const updatedCartItems = cartItems.map((item) => {
			if (medicinal.id_medicamento === item.id_medicamento) {
				return {
					...medicinal,
					quantity: medicinal.quantity ? medicinal.quantity - 1 : 1,
				}
			} else {
				return item
			}
		})

		setCartItems(updatedCartItems)
	}

	const queryClient = useQueryClient()

	const { mutateAsync: registerOrderFn } = useMutation({
		mutationFn: registerOrder,
		onError(error: any) {
			console.log(error.response.data.message)
		},
		onMutate() {
			queryClient.invalidateQueries({ queryKey: ["orders"] })
		},
	})

	async function addOrders() {
		cartItems.map((order) => {
			setOrders((prev) => [
				...prev,
				{
					...order,
					status: "pendente",
					date: new Date(),
					total: order.preco * Number(order.quantity),
				},
			])
		})
	}

	useEffect(() => {
		orders.map(async (order) => {
			const id_medicamento = order.id_medicamento
			const quantidade_aquisicao = order.quantity
			const total_compra = order.total

			await registerOrderFn({
				id_medicamento,
				quantidade_aquisicao,
				total_compra,
			})
		})
	}, [orders])

	return (
		<CartContext.Provider
			value={{
				cartItems,
				totalItems,
				orders,
				totalOrders,
				addOrders,
				addMedicinalToCart,
				removeMedicinalFromCart,
				onIncrementQuantity,
				onDecrementQuantity,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
