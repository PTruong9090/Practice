function truncateText(text, maxLength = 80) {
    if (!text) return ''

    if (text.length <= maxLength) {
        return text
    }

    return text.slice(0, maxLength).trim() + "..."
}

export default function NoteCard({note, isSelected, onSelect, onDelete}) {

    return (
        <div
            onClick={onSelect}
            className={`w-full rounded-md p-3 text-left
                ${isSelected ? "bg-gray-200" : "hover:bg-gray-100"}`} 
        >
            <div className="flex flex-row justify-between">
                <h2 className="text-xl font-bold text-gray-800">{note.title}</h2>
                <button 
                    className="rounded-md px-2 bg-black text-white hover:bg-gray-500"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    X
                </button>
            </div>
            <p className="text-gray-500">{truncateText(note.body)}</p>

        </div>
    )
}