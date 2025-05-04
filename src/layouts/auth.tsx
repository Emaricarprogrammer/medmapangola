import { Outlet } from "react-router-dom";

export function AuthLayout() {
	return (
		<div
			className='bg-cover bg-center h-screen text-center border flex flex-col justify-center items-center'
			style={{ backgroundImage: "url('/main-bg.png')" }}
		>
			<Outlet />
		</div>
	);
}
