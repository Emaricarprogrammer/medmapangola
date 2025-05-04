import { Loader2, Lock, EyeOff, Eye } from "lucide-react"

import { Logo } from "@/components/general-ui/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Card, CardHeader } from "@/components/ui/card"

import { Helmet } from "react-helmet-async"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
	ResetPasswordData,
	resetPasswordSchema,
} from "@/schemas/reset-password"
import { useNavigate } from "react-router-dom"
import { resetPassword } from "@/api/general/reset-password"

export function ResetPassword() {
	const [showPassword, setShowPassword] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<ResetPasswordData>({
		resolver: zodResolver(resetPasswordSchema),
	})

	const navigate = useNavigate()

	async function handleResetPassword(data: ResetPasswordData) {
		try {
			const queryParams = new URLSearchParams(window.location.search)
			const authToken = queryParams.get("auth")

			if (!authToken) {
				throw new Error("Token de autenticação não encontrado na URL")
			}

			const response = await resetPassword(data.newPassWord, authToken)

			toast.success(response.message || "Senha alterada com sucesso", {
				action: {
					label: "Fazer Login",
					onClick: () => navigate("/auth/sign-in"),
				},
			})
		} catch (error: any) {
			toast.error(
				error.response?.data?.message || "Ops! Falha ao repor credenciais."
			)
		}
	}

	return (
		<>
			<Helmet title="Repor Credencias" />
			<Card className="w-[480px] h-[600px] p-12 max-lg:w-96 max-lg:px-6 max-lg:border-none max-lg:shadow-none">
				<CardHeader>
					<Logo />
					<div className="text-foreground">
						Ao repor a sua palavra passe certifique que será fácil de lembrar
					</div>
				</CardHeader>

				<form
					className="flex flex-col gap-6"
					onSubmit={handleSubmit(handleResetPassword)}
				>
					<div className="flex flex-col gap-2 relative">
						<Label className="flex items-center text-foreground/60 ml-2 gap-1">
							<Lock className="w-4 h-4" />
							<span>Palavra passe</span>
						</Label>
						<Input
							type={showPassword ? "text" : "password"}
							placeholder="*** *** ***"
							className="bg-neutral-50/50 h-12"
							{...register("newPassWord")}
						/>
						<button
							type="button"
							title={showPassword ? "Esconder" : "Mostrar"}
							className="absolute right-3 top-14 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeOff className="w-5 h-5" />
							) : (
								<Eye className="w-5 h-5" />
							)}
						</button>
						<span className="text-rose-600 text-sm text-left">
							{errors.newPassWord && errors.newPassWord.message}
						</span>
					</div>

					<div className="w-full">
						<Button
							className="w-full h-12 font-bold rounded-full bg-gradient-to-tr to-emerald-500 from-emerald-600"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<Loader2 className="animate-spin" />
									<span>Processando...</span>
								</>
							) : (
								<span>Repor Palavra Passe</span>
							)}
						</Button>
					</div>
				</form>
			</Card>
		</>
	)
}
