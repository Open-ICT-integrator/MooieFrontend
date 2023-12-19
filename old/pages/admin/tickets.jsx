import Head from 'next/head'
import { getLayout } from '../../components/Layout/defaultLayout'
import { NavLink } from '../../components/NavLink'
import useComponentVisible from '../../hooks/useComponentVisible'
import { TicketsSampleData, Status } from '../../data/tickets'
import SettingsIcon from '../../assets/svg/settingsdots.svg'

const Tickets = () => {

    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = useComponentVisible(false)

    return (
        <>
            <Head>
                <title>Ticket beheren - HU</title>
            </Head>
            <div className="w-full">
                <div className="container_wrapper px-0 py-0">
                    <div className="p-25">
                        <span className="text_label text-lg mt-0">Ticket beheren</span>
                        <div className="flex items-center gap-4 pt-4">
                            <table className="border-collapse table-auto w-full text-sm text-base-font-dark">
                                <thead>
                                    <tr>
                                        <th className="table-th">#</th>
                                        <th className="table-th">Student</th>
                                        <th className="table-th">Operator</th>
                                        <th className="table-th">Onderwerp</th>
                                        <th className="table-th">Datum</th>
                                        <th className="table-th">Status</th>
                                        <th className="table-th">Acties</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-base-font-dark dark:bg-dark-300">
                                    {
                                        TicketsSampleData?.map((ticket, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td className="table-td">{ticket.id}</td>
                                                    <td className="table-td">Hugo</td>
                                                    <td className="table-td">
                                                        {ticket.engineer || 'none'}
                                                    </td>
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
                                                    <td className="table-td">
                                                        <div className="order-last relative">
                                                            <span className="cursor-pointer" onClick={() => setIsComponentVisible(isComponentVisible === key ? -1 : key)} ref={ref}>
                                                                <SettingsIcon
                                                                    fill={'currentColor'}
                                                                    width={24}
                                                                    height={24}
                                                                    className="inline text-base-font-dark dark:text-white hover:text-blue-100 dark:hover:text-blue-100 transition duration-800 ease-in-out focus:outline-none hover:text-accent"
                                                                />
                                                            </span>
                                                            {isComponentVisible === key && <div className="action_menu">
                                                                <ul>
                                                                    {[
                                                                        [`${ticket.status === Status.CLOSED ? "Heropenen" : "Sluiten"}`, '/#'],
                                                                        [`${ticket.status === Status.OPEN ? "Claim" : "Unclaim"}`, '/#'],
                                                                        ['Verwijderen', '/#']
                                                                    ].map(([title, url]) => (
                                                                        <NavLink href={url} key={title}>
                                                                            <li>
                                                                                {title}
                                                                            </li>
                                                                        </NavLink>
                                                                    )
                                                                    )}
                                                                </ul>
                                                            </div>}
                                                        </div>
                                                    </td>
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
