import { useFetch } from './useFetch.js'

export default function useFetchInstancesById(userId) {
	
	const { data, loading, error } = useFetch(`vm/all/${userId}`)

	return {
		data,
		loading,
		error
	}
}