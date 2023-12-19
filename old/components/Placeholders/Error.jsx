const ErrorPlaceholder = ({ message }) => {
    const msg = message || "Er ging iets mis"
    return (
        <div className="bg-[#ef4444] dark:bg-[#b91c1c] text-white px-4 py-3 mb-3" role="alert">
            <div className="flex">
                <div>
                    <p className="font-bold">Error!</p>
                    <p className="text-sm">{msg}</p>
                </div>
            </div>
        </div>
    )
}

export default ErrorPlaceholder
