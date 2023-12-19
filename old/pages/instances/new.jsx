import { useState, useReducer, useEffect } from 'react'
import Head from 'next/head'
import { getLayout } from '../../components/Layout/defaultLayout'
import { Storage } from '../../components/Storage'
import useFetchOperatingSystems from '../../hooks/useFetchOperatingSystems'
import ErrorPlaceholder from '../../components/Placeholders/Error'
import LoadingPlaceholder from '../../components/Placeholders/Loading'
import { createVM } from "../../hooks/useApi"
import { NavLink } from '../../components/NavLink'
import Confetti from 'react-confetti'
import ProjectsPlaceholder from '../../components/Placeholders/ProjectsPlaceholder'

const SuccessHolder = ({ servername }) => {
	return (
		<div className="container_wrapper confetti">
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
			/>
			<span className="text-2xl font-bold block text-center mb-2">
				<span className="block">🎉</span>
				Gelukt!
			</span>
			<span className="text-center block font-light">
				Je hebt succesvol server <span className="font-bold">{servername}</span> aangemaakt.
				<NavLink href="instance" className="block text-blue-100">Beheer je server.</NavLink>
			</span>
		</div>
	)
}

const CreatingInstancePlaceholder = () => {
	return (
		<div className="container_wrapper">
			<span className="text-2xl font-bold block text-center mb-2">
				<LoadingPlaceholder />
			</span>
			<span className="text-center block font-light">
				Virtual machine wordt aangemaakt ...
			</span>
		</div>
	)
}

const Home = () => {

	const [storage, setStorage] = useState('')
	const storageSize = (data) => {
		setStorage(data)
	}

	const userId = 24
	const [userProjects, setUserProjects] = useState([])
	useEffect(async () => {
		await fetch(`http://localhost:3001/api/v1/students/projects/${userId}`)
			.then(response => response.json())
			.then(setUserProjects)
			.catch(e => console.log(e))
	}, [])

	const { data, loading, error } = useFetchOperatingSystems()
	const [osLimit, setOsLimit] = useState(4)
	const loadMoreOS = () => {
		setOsLimit(data.length)
	}

	const [activeIndex, setActiveIndex] = useState()
	const activeState = (idx, name) => {
		// Reset the selected option
		setSelectedOption("")
		setActiveIndex(idx)
	}

	const formReducer = (state, event) => {
		return {
			...state,
			[event.name]: event.value
		}
	}

	const [formData, setFormData] = useReducer(formReducer, {})
	const handleChange = (event, i) => {
		const { name, value } = event.target
		setFormData({
			name: name,
			value: value
		})
	}

	const [instanceLoading, setInstanceLoading] = useState(false)
	const [instanceError, setInstanceError] = useState({ display: false, message: "" })
	const [instanceSuccess, setInstanceSuccess] = useState({ display: false, message: "" })

	const handleSubmit = async event => {
		setInstanceLoading(true)
		event.preventDefault()

		const vmInformation = {
			data: formData,
			storage: storage,
			OS: selectedOption,
			projectId: parseInt(selectedProject)
		}

		createVM(vmInformation)
			.then(res => setInstanceSuccess({ display: true, message: res.VM }))
			.catch((error) => setInstanceError({ display: true, message: "Er ging iets mis bij het aanmaken van de server" }))
			.finally(() => {
				setInstanceLoading(false)
				setTimeout(() => {
					setInstanceError({ display: false })
				}, 3000)
			})
	}

	const [selectedOption, setSelectedOption] = useState()
	const [selectedProject, setSelectedProject] = useState()

	if (userProjects?.length === 0) {
		return (
			<div className="w-full">
				<ProjectsPlaceholder />
			</div>
		)
	}

	return (
		<>
			<Head>
				<title>VM aanmaken - HU</title>
			</Head>

			<div className="w-full">
				{instanceSuccess.display ? <SuccessHolder servername={formData.serverName} /> : (
					instanceLoading ? <CreatingInstancePlaceholder /> : <form onSubmit={handleSubmit}>
						<div className="container_wrapper">
							<span className="text_label text-lg mt-0">Nieuwe server aanvragen</span>
							<p className="text_paragraph mb-0">
								Vraag een nieuwe server aan
							</p>

							<hr className="my-4" />

							<span className="text_label text-lg">Kies een besturingssysteem</span>
							<p className="text_paragraph">
								Kies een besturingssysteem voor de server.
							</p>

							<div className="grid grid-cols-4 gap-4">
								{
									data?.filter((item, idx) => idx < osLimit).map((os, index) => {

										const className = activeIndex === index ? 'operation_system active' : 'operation_system grayscale'

										return (
											<div className={className} key={index} onClick={() => activeState(index, selectedOption)}>
												<div className="flex justify-center pt-4">
													<img src={`${os.image}`} height={60} width={60} />
												</div>
												<span className="block text-grey-600 py-2 font-bold text-center pt-2 os__title">{os.name}</span>
												<div className="p-10 font-bold text-base-font-dark border-t-[1px] border-border-grey-100 bg-grey-200 rounded-b-[8px] dark:border-dark-400 dark:bg-dark-400 dark:text-white os__selector">
													<select className="w-full bg-grey-200 outline-none dark:bg-dark-400"
														onChange={e => setSelectedOption(e.target.value)}
														value={selectedOption}
													>
														<option value={null}>Versie</option>
														{
															os?.versions.map((version) => {
																return (
																	<option key={version.id} value={version.url}>{version.name}</option>
																)
															})
														}
													</select>
												</div>
											</div>
										)
									})
								}
							</div>
							{loading && <LoadingPlaceholder />}
							{error && <ErrorPlaceholder message="Kan geen gegevens ophalen" />}
							{
								data && osLimit < data?.length &&
								<div className="w-full">
									<span className="cursor-pointer text-sm text-center block mt-2 hover:text-blue-100 transition duration-400 border-[#cfd9fc] border dark:border-none text-base-font-dark dark:bg-dark-400 dark:text-white bg-[#f5f7ff] rounded-sm p-1" onClick={() => loadMoreOS()}>
										Meer besturingssystemen laden ...
									</span>
								</div>
							}

							<hr className="my-6" />
							<div className="flex mb-4 gap-8 relative">
								<div className="w-1/2">
									<span className="text_label text-lg">Werkgeheugen</span>

									<p className="text_paragraph">
										Selecteer het werkgeheugen voor de server. Maximaal 6GB.
									</p>

									<div className="w-full max-w-screen-xl mx-auto space-x-2 md:space-x-10 shadow-sm">
										<Storage storageSize={storageSize} />
									</div>
								</div>
								<div className="w-1/2">
									<span className="text_label text-lg">Server naam</span>
									<p className="text_paragraph">
										Personaliseer je server met een zelfgekozen naam.
									</p>
									<input type="text"
										name="serverName"
										placeholder="Server naam"
										className="input_field mt-0"
										onChange={e => handleChange(e)}
									/>
								</div>
							</div>
							<div className="flex mb-4 gap-8 relative">
								<div className="w-full">
									<span className="text_label text-lg">Selecteer een project</span>

									<p className="text_paragraph">
										Voeg een server toe aan een bestaand project.
									</p>

									<select className="w-full outline-none dark:bg-dark-400 input_field mt-0"
										onChange={e => setSelectedProject(e.target.value)}
										value={selectedProject}
									>
										<option value={null}>Selecteer een project</option>
										{
											userProjects?.map((project, key) => {
												return (
													<option key={key} value={project.project[0].id}>{project.project[0].name}</option>
												)
											})
										}
									</select>
								</div>
							</div>

							<div className="flex mb-4 gap-8 relative">
								<button type="submit" className="btn-primary blue w-full">Server aanmaken</button>
							</div>
							{instanceError.display && <ErrorPlaceholder message={instanceError.message} />}
						</div>
					</form>
				)
				}
			</div>
		</>
	)
}

// Import the default styling layout
Home.getLayout = getLayout

export default Home