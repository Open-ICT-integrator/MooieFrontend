import Head from 'next/head'
import { getLayout } from '../../components/Layout/defaultLayout'
import { NavLink } from '../../components/NavLink'
import useComponentVisible from '../../hooks/useComponentVisible'
import SettingsIcon from '../../assets/svg/settingsdots.svg'
import useFetchProjects from '../../hooks/useFetchProjects'
import ErrorPlaceholder from '../../components/Placeholders/Error'
import LoadingPlaceholder from '../../components/Placeholders/Loading'
import PlusIcon from '../../assets/svg/plus.svg'
import ProjectsPlaceholder from '../../components/Placeholders/ProjectsPlaceholder'

const Overview = () => {

    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = useComponentVisible(false)

    const userId = 24
    const { data, loading, error } = useFetchProjects(userId)

    if (data?.length === 0) {
		return (
			<div className="w-full">
				<ProjectsPlaceholder />
			</div>
		)
	}

    return (
        <>
            <Head>
                <title>Mijn projecten - HU</title>
            </Head>
            <div className="w-full">
                <div className="flex justify-end">
					<NavLink href="/projects/new">
						<button className="group btn-primary mb-3 p-2 rounded-standard bg-[#22c8a2] dark:bg-[#071a37] dark:border-1 dark:border-blue-100 dark:hover:bg-blue-light">
							<PlusIcon fill={'currentColor'} width={24} height={24} className="inline-block text-white dark:text-white" />
							<span className="ml-2 mr-2 hidden group-hover:inline text-white">Nieuw project</span>
						</button>
					</NavLink>
				</div>
                <div className="container_wrapper px-0 py-0">
                    <div className="p-25">
                        <span className="text_label text-lg mt-0">Mijn projecten</span>
                        {loading && <LoadingPlaceholder />}
                        {error && <ErrorPlaceholder message={'Kan geen projecten ophalen'}/>}
                        <div className="flex items-center gap-4 pt-4">      
                            {data && <table className="border-collapse table-auto w-full text-sm text-base-font-dark">
                                <thead>
                                    <tr>
                                        <th className="table-th">#</th>
                                        <th className="table-th">Naam</th>
                                        <th className="table-th">Beschrijving</th>
                                        <th className="table-th">Acties</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-base-font-dark dark:bg-dark-300">
                                    {
                                        data?.map((project, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td className="table-td">{project.project[0].id}</td>
                                                    <td className="table-td">{project.project[0].name}</td>
                                                    <td className="table-td">
                                                        {project.project[0].description}
                                                    </td>
                                                    <td className="table-td">
                                                        <div className="order-last relative">
                                                            <span className="cursor-pointer" onClick={() => setIsComponentVisible(isComponentVisible === key ? -1 : key)} ref={ref}>
                                                                <SettingsIcon
                                                                    fill={'currentColor'}
                                                                    width={24}
                                                                    height={24}
                                                                    className="text-base-font-dark dark:text-white hover:text-blue-100 dark:hover:text-blue-100 transition duration-800 ease-in-out focus:outline-none hover:text-accent"
                                                                />
                                                            </span>
                                                            {isComponentVisible === key && <div className="action_menu">
                                                                <ul>
                                                                    {[
                                                                        ['Aanpassen', `/projects/project/${project.project[0].id}`]
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
                            </table>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Import the default styling layout
Overview.getLayout = getLayout

export default Overview
