import React from 'next/router'
import { useState } from 'react'
import Head from 'next/head'
import { getLayout } from '../../components/Layout/defaultLayout'

const CreateTicket = () => {
	const [inputs, setInputs] = useState({});
	const subjects = ["General", "VM", "Website", "Admin"]
	const placeholder_VMs = ["A", "B", "C"]	
	const validation_errors = []

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}) )
	}

	const handleValidation = () => {
		let formIsValid = true

		if(inputs.subject == "default") {
			formIsValid = false
			validation_errors["subject"] = "Selecteer een onderwerp uit de lijst."
		}

		if(!inputs.title) {
			formIsValid = false
			validation_errors["title"] = "Geef een titel aan uw ticket."
		}

		if(!inputs.description) {
			formIsValid = false
			validation_errors["description"] = "Beschrijf uw probleem."
		}

		return formIsValid
	}
	
	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(inputs)

		if(handleValidation()) {
			alert("Form valid")
		} else{
			alert("Form has errors {}")
		}
	}

	return (
		<>
			<Head>
				<title>Ticket aanmaken - HU</title>
			</Head>
			<div className="w-full">
				<div className="container_wrapper">
					<span className="text_label text-lg mt-0">Ticket aanmaken</span>
					<p className="leading-7 text_paragraph">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, mollitia necessitatibus excepturi fugit nobis sit, maiores quis a voluptas doloremque.
					</p>
					<hr className="my-4" />

					<form onSubmit={handleSubmit}>
						<select name="subject" value={inputs.subject} onChange={handleChange} 
							className="w-full bg-grey-200 outline-none dark:bg-dark-400 input_field">
								<option value="default">Selecteer een onderwerp</option>
								{
									subjects.map(subject => 
											<option value={subject} key={subject}>{subject}</option>
										)
								}
						</select>

						<select name="vm" value={inputs.vm} onChange={handleChange} 
							className="w-full bg-grey-200 outline-none dark:bg-dark-400 input_field">
								<option value="default">	Geen product (optioneel)</option>
								{
									placeholder_VMs.map(vm => 
										<option value={vm} key={vm}>Virtual Machine {vm}</option>
									)
								}
						</select>

						<hr className="my-4" />

						<input name="title" value={inputs.title || ""} onChange={handleChange} type="text" placeholder="Onderwerp ticket"
							className="input_field mb-4 mt-0"
							/>
						<textarea name="description" value={inputs.description || ""} onChange={handleChange} placeholder="Beschrijf uw probleem"
							className="relative outline-none p-15 border-1 border-border-grey-100 w-full rounded-standard shadow-sm transition duration-400 hover:border-blue-100 dark-states">
						</textarea>

						<button type="submit" className="btn-primary blue w-full mt-2">Ticket aanmaken</button>
					</form>
				</div>
			</div>
		</>
	)
}

// Import the default styling layout
CreateTicket.getLayout = getLayout

export default CreateTicket
