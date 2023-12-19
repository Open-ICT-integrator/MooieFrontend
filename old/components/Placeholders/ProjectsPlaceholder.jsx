import { NavLink } from '../NavLink'

const ProjectsPlaceholder = () => {
	return (
		<div className="container_wrapper">
			<span className="text-2xl font-bold block text-center mb-2">
				Geen projecten
			</span>
			<span className="text-center block font-light">
				<NavLink href="/projects/new" className="text-blue-100">Maak eerst een nieuw project aan.</NavLink>
			</span>
		</div>
	)
}

export default ProjectsPlaceholder