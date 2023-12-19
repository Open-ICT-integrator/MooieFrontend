import { useFetch } from './useFetch.js'

export default function useFetchOperatingSystems(userId) {
	
	const { data, loading, error } = useFetch(`students/projects/${userId}`)

	return {
		data,
		loading,
		error
	}
}