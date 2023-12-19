import { useState, useReducer } from 'react'
import Head from 'next/head'
import { getLayout } from '../../components/Layout/defaultLayout'
import { createProject } from "../../hooks/useApi"
import ErrorPlaceholder from '../../components/Placeholders/Error'
import SuccessPlaceholder from '../../components/Placeholders/Success'

const New = () => {

	const [projectMembers, setProjectMembers] = useState([{ id: "" }])
	const MEMBER_MAX = 8

	const handleInputChange = (e, i) => {
		const { name, value } = e.target
		const list = [...projectMembers]
		list[i][name] = value
		setProjectMembers(list)
	}

	const handleRemoveClick = i => {
		const list = [...projectMembers]
		list.splice(i, 1)
		setProjectMembers(list)
	}

	const handleAddClick = () => {
		if (projectMembers.length >= MEMBER_MAX) {
			return
		}

		setProjectMembers([...projectMembers, { id: "" }])
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

	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)
	const handleSubmit = event => {
		event.preventDefault()
		console.log('Submitting')

		const projectInformation = {
			project: formData,
			members: projectMembers
		}

		createProject(projectInformation)
			.then(res => {
				setSuccess(true)
				console.log(res)
			})
			.catch((error) => setError(true))
	}

	return (
		<>
			<Head>
				<title>Nieuw Project - HU</title>
			</Head>

			<div className="w-full">
				<form onSubmit={handleSubmit}>
					<div className="container_wrapper">
						{success && <SuccessPlaceholder />}
						{error && <ErrorPlaceholder />}
						<span className="text_label text-lg mt-0">Project aanmaken</span>
						<hr className="my-4" />
						<div className="flex mb-4 gap-8 relative">
							<div className="w-1/2">
								<span className="text_label text-lg">Project details</span>
								<p className="text_paragraph">
									Een korte beschrijving van het project.
								</p>
								<input
									type="text"
									placeholder="Projectnaam"
									className="input_field mb-2 mt-0"
									name="name"
									onChange={e => handleChange(e)}
								/>
								<textarea
									placeholder="Project beschrijving"
									name="description"
									onChange={e => handleChange(e)}
									className="relative outline-none p-15 border-1 border-border-grey-100 w-full rounded-standard shadow-sm transition duration-400 hover:border-blue-100 dark-states"
								></textarea>
							</div>
							<div className="w-1/2">
								<span className="text_label text-lg">Studenten toevoegen</span>
								<p className="text_paragraph">
									Beheer studenten met toegang tot het project.
								</p>

								{
									projectMembers?.map((x, i) => {
										return (
											<div className="relative mt-3" key={i}>
												<input
													type="text_paragraph"
													placeholder="Studentnummer"
													name="id"
													onChange={e => handleInputChange(e, i)}
													className="outline-none p-12 border-1 border-border-grey-100 w-full rounded-standard shadow-sm transition duration-400 
													hover:border-blue-100 focus:border-blue-100 dark-states"
													value={x.id}
												/>
												<span className="absolute inline-block z-10 right-5 top-[50%] translate-y-[-50%]">
													{
														projectMembers.length !== 1 &&
														<span className={`btn-primary-round minus h-sm w-sm ${projectMembers.length - 1 === i && projectMembers.length !== MEMBER_MAX ? 'absolute right-[30px]' : ''}`}
															onClick={() => handleRemoveClick(i)}></span>
													}
													{
														projectMembers.length - 1 === i && projectMembers.length !== MEMBER_MAX &&
														<span className="btn-primary-round plus h-sm w-sm" onClick={handleAddClick}></span>
													}
												</span>
											</div>
										)
									})
								}
							</div>
						</div>
						<div className="flex gap-8 relative">
							<button type="submit" className="btn-primary blue w-full">Project aanmaken</button>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}

// Import the default styling layout
New.getLayout = getLayout

export default New