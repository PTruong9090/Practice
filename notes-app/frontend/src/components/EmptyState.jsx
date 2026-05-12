
export default function EmptyState() {
    return (
        <section className="flex flex-1 items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-700">No Note Selected</h2>
                <p className="mt-2 text-gray-500">Select a note or create a new one</p>
            </div>
        </section>
    )
}