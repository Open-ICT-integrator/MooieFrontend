import LoadingIcon from '../../assets/svg/loading.svg'

const LoadingPlaceholder = () => {
    return (
        <div className="flex justify-center">
            <LoadingIcon fill={'currentColor'} width={24} height={24} className="mr-2 text-blue-100 dark:text-white animate-spin block"/>
        </div>
    )
}

export default LoadingPlaceholder
