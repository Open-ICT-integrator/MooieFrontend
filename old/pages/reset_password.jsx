import { NavLink } from '../components/NavLink'
import { getLayout } from '../components/Layout/subLayout'

const ResetPassword = () => {

	return (
		<>
			<div className="container_wrapper">
				<input type="number" placeholder="Studentnummer" className="input_field" />
				<button className="btn-primary blue w-full mt-5">Wachtwoord opvragen</button>
			</div>
			<span className="text-center block mt-5">
				<NavLink href="/login">
					Al een account? <span className="text-blue-700 mt-3">Login</span>
				</NavLink>
			</span>
		</>
	)
}

// Import the default styling layout
ResetPassword.getLayout = getLayout

export default ResetPassword