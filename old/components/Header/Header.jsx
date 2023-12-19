import { NavLink } from '../NavLink'
import useDarkMode from "../../hooks/useDarkMode"
import useComponentVisible from '../../hooks/useComponentVisible'
import { useLoaded } from '../../hooks/useLoaded'
import Logo from '../../assets/svg/hu-logo.svg'

const Sidebar = () => {
	const [colorTheme, setTheme] = useDarkMode()
	const loaded = useLoaded()

	const {
		ref,
		isComponentVisible,
		setIsComponentVisible
	} = useComponentVisible(false)

	return (
		<header>
			<div className="w-full max-w-screen-xl mx-auto space-x-2 md:space-x-10">
				<div className="relative flex items-center">
					<NavLink href="/">
						<Logo width={140} height={40} />
					</NavLink>

					<div className="flex items-center space-x-4 ml-auto">
						{loaded && colorTheme === "light" ? (
							<svg
								onClick={() => setTheme("light")}
								xmlns="http://www.w3.org/2000/svg"
								className="cursor-pointer h-5 w-5 text-yellow-100 transition duration-400 ease-in-out focus:outline-none sm:block hover:text-accent hover:-translate-y-1 focus-visible:outline-accent"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor" role="img"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
								/>
							</svg>
						) : (
							<svg
								onClick={() => setTheme("dark")}
								xmlns="http://www.w3.org/2000/svg"
								className="cursor-pointer h-5 w-5 text-blue-100 transition duration-400 ease-in-out focus:outline-none sm:block hover:text-accent hover:-translate-y-1 focus-visible:outline-accent"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
								/>
							</svg>
						)}
						<div ref={ref}>
							<div className="relative">
								<span className="btn-primary blue" onClick={() => setIsComponentVisible(!isComponentVisible)}>
									Nathan
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className={`transition duration-400 ease-in-out inline-block ml-2 text-white ${isComponentVisible ? 'rotate-180 align-bottom' : ''}`}
										fill={'currentColor'} 
										height={24} 
										width={24} 
									>
										<path
											strokeWidth={2}
											d="M12 15.375 6 9.375 7.4 7.975 12 12.575 16.6 7.975 18 9.375Z"
										/>
									</svg>
								</span>

								{isComponentVisible && (
									<div className="topmenu transition duration-400 ease-in-out">
										<ul>
											{[
												['Instellingen', '/settings'],
												['Uitloggen', '/login']
											].map(([title, url]) => (
												<NavLink href={url} key={title}>
													<li>{title}</li>
												</NavLink>
											)
											)}
										</ul>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Sidebar