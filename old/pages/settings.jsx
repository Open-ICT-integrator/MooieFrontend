import Head from 'next/head'
import { getLayout } from '../components/Layout/defaultLayout'

const Settings = () => {

	return (
		<>
			<Head>
				<title>Account instellingen - HU</title>
			</Head>
			<div className="w-full">
				<div className="container_wrapper">
					<span className="block text-base-font-dark pb-2 text-lg font-bold dark:text-white">Instellingen</span>
					<p className="text-base text-grey-600 mb-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, mollitia necessitatibus excepturi fugit nobis sit, maiores quis a voluptas doloremque ea in reiciendis natus eveniet! Laboriosam nemo autem labore deserunt.
					</p>
					<hr className="my-4" />

					<div className="settings_wrapper">
						<label htmlFor="username" className="block font-base-font-dark mb-2 font-bold">Gebruikersnaam</label>
						<input type="text"
							id="username"
							placeholder="Gebruikersnaam"
							className="input_field mt-0 mb-2"
						/>
					</div>
					<div className="settings_wrapper">
						<label htmlFor="password" className="block font-base-font-dark mb-2 font-bold">Huidige wachtwoord</label>
						<input type="password"
							id="password"
							placeholder="Wachtwoord"
							className="input_field mt-0 mb-2"
						/>
					</div>
					<hr className="my-4" />
					<div className="settings_wrapper">
						<label htmlFor="newpassword" className="block font-base-font-dark mb-2 font-bold">Nieuw wachtwoord</label>
						<input type="password"
							id="newpassword"
							placeholder="Wachtwoord"
							className="input_field mt-0 mb-2"
						/>
					</div>
					<div className="settings_wrapper">
						<label htmlFor="passwordrepeat" className="block font-base-font-dark mb-2 font-bold">Nieuw wachtwoord herhalen</label>
						<input type="password"
							id="passwordrepeat"
							placeholder="Wachtwoord"
							className="input_field mt-0"
						/>
					</div>
					<hr className="my-4" />
					<div className="settings_wrapper">
						<label htmlFor="email" className="block font-base-font-dark mb-2 font-bold">E-mail</label>
						<p className="text-base text-grey-600 mb-4">
							Je kunt je e-mailadres niet aanpassen. Mocht je school e-mail toch zijn gewijzigd maak dan een ticket aan.
						</p>
						<input type="email"
							id="email"
							placeholder="naam.achternaam@student.hu.nl"
							disabled
							className="input_field cursor-not-allowed dark:border-none dark:opacity-60 text-white"
						/>
					</div>
					<div className="flex mb-4 gap-8 relative">
						<div className="w-full">
							<button className="btn-primary blue w-full mt-3">Wijzigen</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

// Import the default styling layout
Settings.getLayout = getLayout

export default Settings