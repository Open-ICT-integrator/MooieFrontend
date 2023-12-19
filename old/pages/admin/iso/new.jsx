//import { useState, useReducer } from 'react'
import ImageUpload from '../../../components/ImageUpload'
import Head from 'next/head'
import { getLayout } from '../../../components/Layout/defaultLayout'
//import useFetchOperatingSystems from '../../../hooks/useFetchOperatingSystems'

const AddIso = () => {

	//const { data, loading, error } = useFetchOperatingSystems()

	return (
		<>
			<Head>
				<title>ISO toevoegen - HU</title>
			</Head>
			<div className="w-full">
				<div className="container_wrapper">
					<span className="text_label text-lg mt-0">ISO toevoegen</span>
					<p className="leading-7 text_paragraph">
						Beheer de besturingssystemen waarmee een server aangemaakt kan worden.
					</p>

					<hr className="my-4" />
					<ImageUpload />
					{/* <hr className="my-4" />
					<span className="text_label text-lg">Overzicht</span>
					<p className="leading-7 text_paragraph">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, mollitia necessitatibus excepturi.
					</p>
					<div className="flex items-center gap-4 pt-4">
						<table className="border-collapse table-auto w-full text-sm">
							<thead>
								<tr>
									<th className="table-th">#</th>
									<th className="table-th">Operation System</th>
									<th className="table-th">Actions</th>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-dark-300">
								{
									data?.map((os, key) => {
										return (
											<tr key={key}>
												<td className="table-td">{os.id}</td>
												<td className="table-td">{os.name}</td>
												<td className="table-td">
													delete | edit | icons
												</td>
											</tr>
										)
									})
								}
							</tbody>
						</table>
					</div> */}
				</div>
			</div>
		</>
	)
}

// Import the default styling layout
AddIso.getLayout = getLayout

export default AddIso

