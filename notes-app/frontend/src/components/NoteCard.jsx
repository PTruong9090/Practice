

export default function NoteCard({note, isSelected, onSelect}) {
    return (
        <button 
            onClick={onSelect}
            className={`w-full rounded-md p-3 text-left
                ${isSelected ? "bg-gray-200" : "hover:bg-gray-100"}`} 
        >
        <h2 className="text-xl font-bold text-gray-800">{note.title}</h2>
        <p className="text-gray-500">{note.body}</p>

        </button>
    )
}