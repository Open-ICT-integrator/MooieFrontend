import { useState } from "react"
import Head from 'next/head'
import { getLayout } from '../../components/Layout/defaultLayout'
import InstanceList from '../../components/Views/InstanceList'
import useFetchInstancesById from '../../hooks/useFetchInstancesById'
import LoadingPlaceholder from '../../components/Placeholders/Loading'
import SuccessPlaceholder from '../../components/Placeholders/Success'
import LoadingIcon from '../../assets/svg/loading.svg'
import ErrorPlaceholder from '../../components/Placeholders/Error'

const LoadingPlaceholderAlert = () => {
	return (
		<div className="container_wrapper">
			<span className="text-2xl font-bold block text-center mb-2">
				<div className="flex justify-center">
					<LoadingIcon fill={'currentColor'} width={24} height={24} className="mr-2 text-blue-100 dark:text-white animate-spin block" />
				</div>
			</span>
			<span className="text-center block font-light">
				De wijzigingen worden doorgevoerd, een moment geduld.
			</span>
		</div>
	)
}

const Instance = () => {

	const userId = 24
	const { data, loading, error } = useFetchInstancesById(userId)
	const [alert, setAlert] = useState({
		active: false,
		message: "",
		loading: false
	})

	if (error) {
		return (
		<div className="w-full">
			<ErrorPlaceholder />
		</div>
		)
	}

	return (
		<>
			<Head>
				<title>Mijn Virtual Machines - HU</title>
			</Head>

			<div className="w-full">
				{alert.loading && <LoadingPlaceholderAlert />}
				{alert.active && <SuccessPlaceholder message={alert.message} />}
				{loading && <LoadingPlaceholder />}
				{!loading && !alert.loading && <InstanceList instanceDetails={data} alertStatus={setAlert} isLoading={alert.loading} isError={error} />}
			</div>
		</>
	)
}

// Import the default styling layout
Instance.getLayout = getLayout

export default Instance