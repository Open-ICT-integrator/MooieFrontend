const SuccessPlaceholder = ({ message }) => {
    const msg = message || "Succesvol opgeslagen"
    return (
        <div className="bg-[#16a34a] text-white px-4 py-3 mb-3" role="alert">
            <div className="flex">
                <div>
                    <p className="font-bold">Gelukt!</p>
                    <p className="text-sm">{msg}</p>
                </div>
            </div>
        </div>
    )
}

export default SuccessPlaceholder
