import { Logo } from "@/components/general-ui/logo"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"

import { toast } from "sonner"
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Loader2 } from "lucide-react"

import { PersonalDataStep } from "./components/personal-data-step"
import { LocationDataStep } from "./components/location-data-step"
import { AuthDataStep } from "./components/auth-data-step"

import { useForm } from "react-hook-form"
import { useMultStepForm } from "@/hooks/useMulStepForm"
import { SignUpData, signUpScheme } from "@/schemas/sign-up"
import { zodResolver } from "@hookform/resolvers/zod"
import { StepFormControllers } from "./components/step-form-controllers"
import { useMutation } from "@tanstack/react-query"
import { signUp } from "@/api/general/sign-up"
import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"

export function SignUp() {
	const { mutateAsync: signUpEntity } = useMutation({
		mutationFn: signUp,
	})

	const navigate = useNavigate()
	const { stepForm, handleNext, handlePrevious, stepState } = useMultStepForm()

	const {
		register,
		handleSubmit,
		control,
		formState: { isSubmitting, errors },
		setValue,
	} = useForm<SignUpData>({
		resolver: zodResolver(signUpScheme),
	})

	async function handleSignUp(data: SignUpData) {
		try {
			await signUpEntity(data)

			toast.success("Conta cadastrada com sucesso!", {
				action: {
					label: "Fazer Login",
					onClick: () => {
						navigate(`/auth/entrar?email=${data.email}`)
					},
				},
			})
		} catch (error: any) {
			toast.error(String(error.response.data.message))
		}
	}

	useEffect(() => {
		const storedToken = localStorage.getItem("accessToken") as string

		try {
			const { access_level } = jwtDecode<any>(storedToken)
			if (access_level === "deposito") {
				navigate("/deposito", { replace: true })
			} else if (access_level === "farmacia") {
				navigate("/farmacia", { replace: true })
			} else if (access_level === "admin") {
				navigate("/administrador", { replace: true })
			} else {
				navigate("/auth/criar-conta", { replace: true })
			}
		} catch (error) {
			localStorage.removeItem("accessToken")
			navigate("/auth/criar-conta", { replace: true })
		}
	}, [navigate])

	return (
		<>
			<Helmet title="Cadastrar-se" />
			<Card className="w-[480px] h-[690px] py-6 px-12 max-lg:w-96 max-lg:px-6 max-lg:border-none max-lg:shadow-none">
				<CardHeader>
					<Logo />
					<div>
						Já possui uma conta?{" "}
						<Link to="/auth/entrar" className="text-emerald-600">
							Entrar
						</Link>
					</div>
				</CardHeader>

				<form
					className="flex flex-col gap-2 mt-6 text-sm"
					onSubmit={handleSubmit(handleSignUp)}
				>
					{stepForm === 1 && (
						<PersonalDataStep
							register={register}
							errors={errors}
							control={control}
							setValue={setValue}
						/>
					)}
					{stepForm === 2 && (
						<LocationDataStep
							setValue={setValue}
							register={register}
							errors={errors}
						/>
					)}
					{stepForm === 3 && (
						<AuthDataStep
							setValue={setValue}
							register={register}
							errors={errors}
						/>
					)}

					{stepState === "finished" && (
						<div className="w-full">
							<Button
								type="submit"
								className="w-full h-12 font-bold rounded-full bg-gradient-to-tr to-emerald-500 from-emerald-600"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<Loader2 className="animate-spin" />
										<span>Processando Pedido...</span>
									</>
								) : (
									<>
										<ArrowRight />
										<span>Finalizar</span>
									</>
								)}
							</Button>
						</div>
					)}

					<StepFormControllers
						stepForm={stepForm}
						onNext={handleNext}
						onPrevious={handlePrevious}
					/>
				</form>
			</Card>
		</>
	)
}
