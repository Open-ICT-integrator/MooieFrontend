import React from 'next/router'
import Head from 'next/head'
import { getLayout } from '../../components/Layout/defaultLayout'
import { NavLink } from '../../components/NavLink'
import { TicketsSampleData } from '../../data/tickets'

const Tickets = () => {

	return (
		<>
			<Head>
				<title>Ticket overzicht - HU</title>
			</Head>
			<div className="w-full">
				<div className="container_wrapper px-0 py-0">
					<div className="border-b-[1px] border-grey-100 dark:border-dark-500 relative flex items-center">
						<ul className="flex items-center space-x-4 ml-auto">
							<li className="inline-block p-15 px-xl border-l-[1px] border-grey-100 dark:bg-dark-400 dark:border-dark-500 hover:dark:bg-blue-light transition duration-400">
								<NavLink href="/tickets/new" exact>
									<svg
										className="inline-block pr-2 text-grey-600 dark:text-white"
										xmlns="http://www.w3.org/2000/svg"
										height={24}
										viewBox="0 0 24 24"
										width={24}
										fill={'currentColor'}
									>
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
									</svg>
									Nieuwe ticket aanmaken
								</NavLink>
							</li>
						</ul>
					</div>
					<div className="p-25">
						<span className="text_label text-lg mt-0">Mijn tickets</span>
						<div className="flex items-center gap-4 pt-4">
							<table className="border-collapse table-auto w-full text-sm text-base-font-dark">
								<thead>
									<tr>
										<th className="table-th">#</th>
										<th className="table-th">Onderwerp</th>
										<th className="table-th">Datum</th>
										<th className="table-th">Status</th>
									</tr>
								</thead>
								<tbody className="bg-white text-base-font-dark dark:bg-dark-300">
									{
										TicketsSampleData?.map((ticket, key) => {
											return (
												<tr key={key}>
													<td className="table-td">{ticket.id}</td>
													<td className="table-td">
														<NavLink href={`/tickets/${ticket.id}`} exact>
															{ticket.subject}
														</NavLink>
													</td>
													<td className="table-td">{ticket.date}</td>
													{[ticket.status].map(([status, color]) => (
														<td className={`table-td text-${color} dark:text-${color}`} key={status}>
															{status}
														</td>
													)
													)}
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

// Import the default styling layout
Tickets.getLayout = getLayout

export default Tickets
