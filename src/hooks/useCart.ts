import { CartContext } from "@/contexts/cart"
import { useContext } from "react"

export const useCart = () => useContext(CartContext)
