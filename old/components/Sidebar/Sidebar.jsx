import SidebarRow from './SidebarRow'
import PlusIcon from '../../assets/svg/plus.svg'
import DnsIcon from '../../assets/svg/dns.svg'
import TicketIcon from '../../assets/svg/tickets.svg'
import UsersIcon from '../../assets/svg/group.svg'
import ProjectsIcon from '../../assets/svg/projects.svg'

const Sidebar = () => {

    return (
        <div className="w-1/5 hidden md:block">
            <div className="sidebar">
                <nav>
                    <div className="sidebar__navigation_heading">
                        Dashboard
                    </div>
                    <ul className="sidebar__navigation_menu">
                        <SidebarRow Icon={PlusIcon} Title="Server aanmaken" Url={'/instances/new'} />
                        <SidebarRow Icon={DnsIcon} Title="Mijn servers" Url={'/instances/instance'} />
                        <SidebarRow Icon={ProjectsIcon} Title="Mijn projecten" Url={'/projects/overview'} />
                        {/* <SidebarRow Icon={TicketIcon} Title="Mijn tickets" Url={'/tickets/tickets'} /> */}
                    </ul>
                </nav>
            </div>

            <div className="sidebar mt-5">
                <nav>
                    <div className="sidebar__navigation_heading">
                        Administrator
                    </div>
                    <ul className="sidebar__navigation_menu">
                        <SidebarRow Icon={PlusIcon} Title="ISO toevoegen" Url={'/admin/iso/new'} />
                        {/* <SidebarRow Icon={UsersIcon} Title="Gebruikers beheren" Url={'#'} />
                        <SidebarRow Icon={TicketIcon} Title="Tickets" Url={'/admin/tickets'} /> */}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar