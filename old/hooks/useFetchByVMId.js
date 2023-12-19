import { useFetch } from './useFetch.js'

export default function useFetchByVMId(vmId) {
	
	const { data, loading, error } = useFetch(`/vsphere/vm/${vmId}`)

	return {
		data,
		loading,
		error
	}
}