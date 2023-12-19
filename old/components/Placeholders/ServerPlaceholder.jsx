import { NavLink } from '../NavLink'

const ServerPlaceholder = () => {
    return (
        <div className="container_wrapper">
            <span className="text-2xl font-bold block text-center mb-2">
                Geen servers
            </span>
            <span className="text-center block font-light">
                <NavLink href="new" className="text-blue-100">Vraag een server aan.</NavLink>
            </span>
        </div>
    )
}

export default ServerPlaceholder
