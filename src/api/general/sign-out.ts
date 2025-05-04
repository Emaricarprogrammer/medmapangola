import { api } from "@/services/axios"

export async function signOut() {
	await api.post("auth/logout")
}
