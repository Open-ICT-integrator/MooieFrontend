import { useFetch } from './useFetch.js'

export default function useFetchOperatingSystems() {
	
	const { data, loading, error } = useFetch('os/all')

	return {
		data,
		loading,
		error
	}
}