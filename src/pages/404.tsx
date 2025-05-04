import { jwtDecode } from "jwt-decode"
import { ArrowLeft } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

export function NotFound() {
	const storedToken = localStorage.getItem("accessToken")

	if (!storedToken || typeof storedToken !== "string") {
		throw new Error("Token de autenticação ausente ou inválido")
	}

	const { access_level } = jwtDecode<any>(storedToken)
	return (
		<>
			<Helmet title="Not found" />

			<div className="flex flex-col gap-4 h-screen items-center justify-center text-emerald-600">
				<div className="flex gap-4 items-center">
					<div>
						<strong className="text-8xl font-extrabold">404</strong>
					</div>

					<div className="flex flex-col gap-4 text-neutral-800">
						<h1 className="text-4xl font-bold relative animate-typing overflow-hidden whitespace-nowrap max-sm:animate-pulse max-sm:overflow-visible max-sm:whitespace-normal">
							Página não encontrada
						</h1>
						<p>Não conseguimos encontrar a página solicitada</p>
					</div>
				</div>

				<Link
					to={access_level === "farmacia" ? "/farmacia" : "deposito"}
					className="text-white bg-gradient-to-t to-emerald-500 from-emerald-400 rounded-full py-3 px-6 flex items-center gap-4 justify-center"
				>
					<ArrowLeft />
					<span>Voltar</span>
				</Link>
			</div>
		</>
	)
}
