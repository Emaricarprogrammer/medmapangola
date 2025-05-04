import { Logo } from "@/components/general-ui/logo";
import { Button } from "@/components/ui/button";

import { User, UserPlus } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export function Landing() {
	const navigate = useNavigate();

	function handleNavigateToLogin() {
		navigate("/auth/entrar", { replace: true });
	}
	function handleNavigateToRegister() {
		navigate("/auth/criar-conta", { replace: true });
	}
	return (
		<>
			<Helmet title='Início' />

			<main
				className='bg-cover bg-center h-screen flex flex-col text-center items-center py-36'
				style={{ backgroundImage: "url('/main-bg.png')" }}
			>
				<div className='max-xl:flex max-xl:items-center max-xl:flex-col max-xl:gap-6 max-xl:justify-center max-xl:h-screen'>
					<Logo />

					<div className='mt-12 max-xl:mt-0 flex flex-col gap-6 items-center max-xl:w-96'>
						<header className='w-max max-sm:w-fit text-4xl fontxl-mono tracking-wide max-lg:text-3xl'>
							<h1 className='max-lg:hidden'>Medicamentos ao seu alcance:</h1>
							<h2 className='relative animate-typing overflow-hidden whitespace-nowrap max-sm:animate-pulse max-sm:overflow-visible max-sm:whitespace-normal'>
								Encontre os Depósitos Mais Próximos
								<span className='absolute inset-y-0 right-0 w-[2px] max-sm bg-black animate-[cursorBlink_1s_steps(2)_infinite]'></span>
							</h2>
						</header>

						<article className='w-[800px] max-sm:max-w-xl max-sm:w-fit px-4 text-xl text-foreground/80 tracking-wide max-lg:text-lg'>
							Nosso sistema conecta voçê aos depósitos mais próximos em poucos
							cliques. Pesquise pelo medicamento necessário e encontre
							rapidamene.
						</article>

						<div className='flex gap-4 items-center justify-center'>
							<Button
								size='lg'
								onClick={handleNavigateToRegister}
								className='bg-neutral-900 hover:bg-neutral-800 rounded-lg flex gap-1 items-center'
							>
								<UserPlus className='h-4 w-4' />
								<span>Criar Conta</span>
							</Button>

							<Button
								size='lg'
								onClick={handleNavigateToLogin}
								className='rounded-lg bg-gradient-to-tr to-emerald-500 flex gap-1 items-center from-emerald-600'
							>
								<User className='h-4 w-4' />
								<span>Entrar</span>
							</Button>
						</div>
					</div>
				</div>

				<footer className='w-full px-20 max-lg:px-10 py-10 absolute bottom-0 max-lg:justify-center flex items-end justify-between'>
					<div className='flex items-end gap-2 max-lg:hidden'>
						<img src='/logo.png' />
						<span>Contactos</span>
					</div>

					<div className='flex items-center justify-between gap-6 max-sm:hidden'>
						<NavLink to='#'>Termos & condições</NavLink>
						<NavLink to='#'>Guia</NavLink>
						<NavLink to='#'>Cookies</NavLink>
					</div>
				</footer>
			</main>
		</>
	);
}
