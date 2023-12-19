import { NavLink } from '../NavLink'
import PropTypes from 'prop-types'
import ErrorIcon from '../../assets/svg/error.svg'
import useComponentVisible from '../../hooks/useComponentVisible'

const SidebarRow = ({ Url, Icon, Title, children }) => {

    const {
		ref,
		isComponentVisible,
		setIsComponentVisible
	} = useComponentVisible(false)

    return (
        <>
            <li ref={ref}>
                <NavLink href={Url} exact>
                    <Icon fill={'currentColor'} width={24} height={24} className="inline-block mr-2 text-grey-600 dark:text-white"/>
                    {Title}
                </NavLink>
            </li>
            { children &&// pass id or smth
                <ul className="sidebar__navigation_menu">
                    {children}
                </ul> 
            }
        </>
    )
}

SidebarRow.propTypes = {
	Url: PropTypes.string.isRequired,
	Icon: PropTypes.func.isRequired,
	Title: PropTypes.string.isRequired
}

SidebarRow.defaultProps = {
	Title: 'Undefined',
	Url: 'Undefined',
	Icon: ErrorIcon
}

export default SidebarRow