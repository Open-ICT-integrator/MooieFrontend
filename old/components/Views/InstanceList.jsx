import { useEffect, useState } from "react"
import useComponentVisible from '../../hooks/useComponentVisible'
import { Status } from '../Enums/ServerStatus'
import ServerPlaceholder from '../Placeholders/ServerPlaceholder'
import SettingsIcon from '../../assets/svg/settingsdots.svg'
import MemoryIcon from '../../assets/svg/memory_black_24dp.svg'
import ProjectIcon from '../../assets/svg/projects.svg'
import PublicIcon from '../../assets/svg/public_black_24dp.svg'
import ComputerIcon from '../../assets/svg/computer.svg'
import LoadingPlaceholder from '../../components/Placeholders/Loading'
import { power } from "../../hooks/useApi"
import { NavLink } from '../../components/NavLink'

const InstanceList = ({ instanceDetails, alertStatus, isLoading }) => {
	const [loading, setLoading] = useState(false)

	const {
		ref,
		isComponentVisible,
		setIsComponentVisible
	} = useComponentVisible(false)

	const useFetchByVMId = async (vmId) => {
		setLoading(true)
		return await fetch(`http://localhost:3001/api/v1/vsphere/vm/${vmId}`, { method: 'GET' })
			.then(response => response.json())
			.then(res => res)
			.catch(err => console.log(err))
			.finally(() => setLoading(false))
	}

	const powerStatus = (e, vmId, command) => {
		e.preventDefault()

		const data = {
			id: vmId,
			state: command
		}

		alertStatus({
			loading: true
		})

		power(data)
			.then(res => {
				alertStatus({
					active: true,
					message: `Success - ${command}`
				})
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => alertStatus({
				loading: false
			}))
	}


	if (!instanceDetails) {
		return <LoadingPlaceholder />
	}

	if (instanceDetails?.length === 0) {
		return <ServerPlaceholder />
	}

	return (
		instanceDetails?.map((instance, key) => {

			const machine = instance.machine[0]
			const [powerState, setPowerState] = useState("")
			const [machineDetails, setMachineDetails] = useState("")

			useEffect(async () => {
				const machineDetails = await useFetchByVMId(machine.vm)
				setPowerState(machineDetails?.value?.power_state)
				setMachineDetails(machineDetails?.value)
			}, [])

			let serverPowerStatus = powerState === Status.ONLINE ? "bg-green" : powerState === Status.SUSPENDED ? "bg-orange" : "bg-red-100"
			let actionStatus = powerState === Status.ONLINE ? ['Uitschakelen', 'stop'] : powerState === Status.SUSPENDED ? ['Inschakelen', 'start'] : ['Inschakelen', 'start']
			let powerStatusMenu = [
				[actionStatus[0], actionStatus[1]],
				['Herstarten', 'reset'],
				['Suspend', 'suspend'],
				//['Verwijderen', '/#']
			]

			return (
				<div className="instance" key={key}>
					<div className="head">
						<div className="flex justify-between">
							<div className="order-first">
								<span className="relative h-3 w-3">
									{(powerState === Status.ONLINE || powerState === Status.SUSPENDED) &&
										<span className={`animate-ping absolute inline-flex h-3 w-3 ${powerState === Status.ONLINE ? "bg-green" : "bg-orange"} rounded-full opacity-75 mt-[7px]`}></span>}

									<span className={`relative inline-block rounded-full h-3 w-3 ${serverPowerStatus} mt-[7px]`}></span>
								</span>
								<span className="ml-3">
									{machine.name}
								</span>
							</div>
							<div className="order-last relative">
								<span className="cursor-pointer" onClick={() => setIsComponentVisible(isComponentVisible === key ? -1 : key)}>
									<SettingsIcon
										fill={'currentColor'}
										width={24}
										height={24}
										className="text-base-font-dark dark:text-white hover:text-blue-100 dark:hover:text-blue-100 transition duration-800 ease-in-out focus:outline-none hover:text-accent" />
								</span>
								{isComponentVisible === key && <div className="action_menu" ref={ref}>
									<ul>
										{powerStatusMenu.map(([title, command]) => (
											<a key={title} onClick={(e) => powerStatus(e, machine.vm, command)}>
												<li>
													{title}
												</li>
											</a>
										)
										)}
									</ul>
								</div>}
							</div>
						</div>
					</div>
					<div className="pt-m px-xl">
						<div className="flex gap-8">
							{(loading || isLoading) ? <LoadingStates /> : <><div className="w-1/2">
								<ul className="instance_details">
									<li>
										<MemoryIcon fill={'currentColor'} width={24} height={24} className="text-grey-600 dark:text-white inline mr-2" />
										<span>CPU</span>
										<span className="float-right">{machineDetails?.cpu?.count}</span>
									</li>
									<li>
										<PublicIcon fill={'currentColor'} width={24} height={24} className="text-grey-600 dark:text-white inline mr-2" />
										<span>Network adapter 1</span>
										<span className="float-right">{machineDetails?.nics?.[0].value.backing.network_name} | {machineDetails?.nics?.[0].value.mac_address}</span>
									</li>
									<li>
										<MemoryIcon fill={'currentColor'} width={24} height={24} className="text-grey-600 dark:text-white inline mr-2" />
										<span>Memory</span>
										<span className="float-right">{machineDetails?.memory?.size_MiB} MB</span>
									</li>
								</ul>
							</div>
								<div className="w-1/2">
									<ul className="instance_details">
										<li>
											<ComputerIcon fill={'currentColor'} width={24} height={24} className="text-grey-600 dark:text-white inline mr-2" />
											<span>Guest OS</span>
											<span className="float-right">{machineDetails?.guest_OS}</span>
										</li>
										<li>
											<PublicIcon fill={'currentColor'} width={24} height={24} className="text-grey-600 dark:text-white inline mr-2" />
											<span>Instance ID</span>
											<span className="float-right">{machineDetails?.identity?.instance_uuid}</span>
										</li>
										<li>
											<ProjectIcon fill={'currentColor'} width={24} height={24} className="text-grey-600 dark:text-white inline mr-2" />
											<span>Project</span>
											<span className="float-right">
												<NavLink href={`/projects/project/${instance.projectId}`} className="block text-blue-100">
													{instance.projectName}
												</NavLink>
											</span>
										</li>
									</ul>
								</div></>}
						</div>
					</div>
				</div>
			)
		})
	)
}

const LoadingStates = () => {
	return (
		<>
			<div className="w-1/2">
				<ul className="instance_details">
					<li>
						<MemoryIcon fill={'currentColor'} width={24} height={24} className="text-grey-600 dark:text-white inline mr-2" />
						<span className="skeleton">Memory</span>
					</li>
					<li>
						<PublicIcon fill={'currentColor'} width={24} height={24} className="text-grey-600 dark:text-white inline mr-2" />
						<span className="skeleton">Memory</span>

					</li>
					<li>
						<MemoryIcon fill={'currentColor'} width={24} height={24} className="text-grey-600 dark:text-white inline mr-2" />
						<span className="skeleton">Memory</span>
					</li>
				</ul>
			</div>
			<div className="w-1/2">
				<ul className="instance_details">
					<li>
						<MemoryIcon fill={'currentColor'} width={24} height={24} className="text-grey-600 dark:text-white inline mr-2" />
						<span className="skeleton">Memory</span>
					</li>
					<li>
						<PublicIcon fill={'currentColor'} width={24} height={24} className="text-grey-600 dark:text-white inline mr-2" />
						<span className="skeleton">Memory</span>

					</li>
					<li>
						<MemoryIcon fill={'currentColor'} width={24} height={24} className="text-grey-600 dark:text-white inline mr-2" />
						<span className="skeleton">Memory</span>
					</li>
				</ul>
			</div>
		</>
	)
}

export default InstanceList