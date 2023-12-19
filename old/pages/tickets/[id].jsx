import { useRouter } from 'next/router'
import Head from 'next/head'
import { getLayout } from '../../components/Layout/defaultLayout'
import { TicketsSampleData, Status } from '../../data/tickets'
import { NavLink } from '../../components/NavLink'

const Ticket = () => {

	const router = useRouter()
	const { id } = router.query

	return (
		<>
			<div className="w-full">
				<div className="container_wrapper px-0 py-0">
					<div className="border-b-[1px] border-grey-100 dark:border-dark-500 relative flex items-center">
						<ul className="flex items-center space-x-4 ml-auto">
							<li className="inline-block p-15 px-xl border-l-[1px] border-grey-100 dark:bg-dark-400 dark:border-dark-500 hover:dark:bg-blue-light transition duration-400">
								<NavLink href="/tickets/tickets" exact>
									Terug naar mijn tickets
								</NavLink>
							</li>
						</ul>
					</div>
					<div className="p-25">
						{
							TicketsSampleData?.filter(ticket => ticket.id == id).map((ticket, key) => {
								return (
									<div key={key}>
										<Head>
											<title>{ticket.subject} - HU</title>
										</Head>
										<span className="text_label mt-0 text-sm font-normal">
											{ticket.product}
										</span>
										<span className="text_label text-lg mt-0">[#{ticket.id}] {ticket.subject}</span>
										<hr className="my-4" />
										<div className="reaction_wrapper">
											<div className="reaction_body">
												<div className="reaction_customer">
													<div className="flex reaction_header font-bold mb-3">
														<span>
															Gelder van den Brink
														</span>
														<span className="flex items-center space-x-4 ml-auto text-grey-700 dark:text-white font-normal">
															24-04-2022 01:28 PM
														</span>
													</div>
													<p className="leading-8">
														{ticket.description}
													</p>
												</div>
											</div>

											<div className="reaction_body">
												<div className="reaction_operator">
													<div className="flex reaction_header font-bold mb-3">
														<span>
															Martijn Bellaard
														</span>
														<span className="flex items-center space-x-4 ml-auto text-grey-700 dark:text-white font-normal">
															24-04-2022 01:27 PM
														</span>
													</div>
													<p className="leading-8">
														Nee!
													</p>
												</div>
											</div>
											<div className="reaction_body">
												<div className="reaction_operator">
													<div className="flex reaction_header font-bold mb-3">
														<span>
															Martijn Bellaard
														</span>
														<span className="flex items-center space-x-4 ml-auto text-grey-700 dark:text-white font-normal">
															24-04-2022 01:27 PM
														</span>
													</div>
													<p className="leading-8">
														{ticket.description}
													</p>
												</div>
											</div>
											<div className="reaction_body">
												<div className="reaction_customer">
													<div className="flex reaction_header font-bold mb-3">
														<span>
															Gelder van den Brink
														</span>
														<span className="flex items-center space-x-4 ml-auto text-grey-700 dark:text-white font-normal">
															24-04-2022 01:28 PM
														</span>
													</div>
													<p className="leading-8">
														{ticket.description.slice(0, 147)}
													</p>
												</div>
											</div>
										</div>

										<hr className="my-4" />
										{
											ticket.status !== Status.CLOSED ? (
												<>
													<span className="text_label text-lg mt-0 mb-4">Voeg een reactie toe</span>
													<textarea className="relative outline-none p-15 border-1 border-border-grey-100 w-full rounded-standard shadow-sm transition duration-400 hover:border-blue-100 dark-states"
														defaultValue="">
													</textarea>
													<div className="flex items-center">
														<div className="flex items-center space-x-4 ml-auto">
															<button className="btn-primary blue mt-2">Verstuur</button>
															<button className="btn-primary red mt-2 ml-2">Ticket sluiten</button>
														</div>
													</div>
												</>
											) : (
												<span className="text-center block font-bold">
													<div className="p-2 bg-red-100 dark:border-1 text-white dark:bg-red-dark-100 dark:border-red-100 px-[6px] rounded-standard">
														TICKET GESLOTEN
													</div>
												</span>
											)
										}
									</div>
								)
							})
						}

					</div>
				</div>
			</div>
		</>
	)
}

// Import the default styling layout
Ticket.getLayout = getLayout

export default Ticket