import React, { useState, useReducer } from "react"
import { addOperatingSystem } from "../hooks/useApi"
import ErrorPlaceholder from '../components/Placeholders/Error'
import SuccessPlaceholder from '../components/Placeholders/Success'

const ImageUpload = () => {
	const [file, setFile] = useState(null)
	const [base64File, setBase64File] = useState()

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

	async function encodeImageFileAsURL(element) {
		let file = element.files[0]
		let reader = new FileReader()
		reader.onloadend = () => {
			setBase64File(reader.result)
		}
		reader.readAsDataURL(file)
	}

	const uploadSingleFile = async (e) => {
		await encodeImageFileAsURL(e.target)
		setFile(URL.createObjectURL(e.target?.files[0]))
	}

	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)
	const handleSubmit = async event => {
		event.preventDefault()

		const projectInformation = {
			data: formData,
			image: base64File
		}

		addOperatingSystem(projectInformation)
			.then(res => {
				setSuccess(true)
				console.log(res)
			})
			.catch((error) => setError(true))
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="block w-full">
				{success && <SuccessPlaceholder message="Toegevoegd aan database"/>}
				{error && <ErrorPlaceholder message="Er ging iets mis!"/>}
			</div>
			<div className="grid grid-rows-3 grid-flow-col gap-4">

				<div className="col-span-2">
					<input type="text"
						placeholder="Naam"
						className="input_field"
						name="name"
						onChange={e => handleChange(e)}
					/>
				</div>
				<div className="col-span-2">
					<input type="text"
						placeholder="Versie"
						className="input_field"
						name="version"
						onChange={e => handleChange(e)}
					/>
				</div>
				<div className="col-span-2">
					<input type="text"
						placeholder="GuestOS (CENTOS_7, CENTOS_6_64, ...)"
						className="input_field"
						name="iso"
						onChange={e => handleChange(e)}
					/>
				</div>

				<div className="col-span-2">
					<button type="submit" className="btn-primary blue w-full">Upload ISO</button>
				</div>
				<div className={`${!file ? "cursor-pointer bg-grey-200 border-1 border-dashed border-border-grey-100 dark:bg-dark-400 dark:border-dark-400 dark:text-white" : "border-1 border-dashed border-[#7edfa7] dark:bg-dark-400 dark:border-blue-700 dark:text-white"} rounded-lg grid place-content-center row-span-4`}>
					{file && (
						<div
							className="w-20 h-20 flex items-center justify-center mx-auto"
							type="file"
						>
							<img src={file} alt="" />
						</div>
					)}
					{!file ?
						<label htmlFor="uploadFile" className="text-base-font-dark font-bold dark:text-white">Upload thumbnail</label> :
						<label htmlFor="uploadFile" className="text-base-font-dark font-bold mt-5 block dark:text-white">Thumbnail aanpassen</label>
					}
					<input type="file" id="uploadFile" className="hidden" onChange={uploadSingleFile} />
				</div>
			</div>
		</form>

	)
}

export default ImageUpload
