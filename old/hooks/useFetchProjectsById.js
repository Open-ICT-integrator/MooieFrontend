import { useFetch } from './useFetch.js'

export default function useFetchOperatingSystems(projectId) {
	
	const { data, loading, error } = useFetch(`projects/${projectId}`)

	return {
		data,
		loading,
		error
	}
}