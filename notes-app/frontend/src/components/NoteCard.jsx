

export default function NoteCard({note, isSelected, onSelect}) {
    return (
        <button 
            onClick={onSelect}
            className={`w-full rounded-md p-3 text-left 
                ${isSelected ? "bg-gray-200" : "hover: bg-gray-100"}`} 
        >
        <h2 className="">{note.title}</h2>
        <p className="">{note.body}</p>

        </button>
    )
}