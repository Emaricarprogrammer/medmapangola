import { CartProps } from "@/contexts/cart"

export interface Order extends CartProps {
	date: Date
	total: number
	status: "pendente" | "concluido" | "cancelado"
}
