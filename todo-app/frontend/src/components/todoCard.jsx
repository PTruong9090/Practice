import { useState } from "react"
import { toggleTodo } from "../api/api"
import EditForm from "./EditForm"

function capitalize(word) {
    if (!word) return ''
    return word.charAt(0).toUpperCase() + word.slice(1)
}


export default function TodoCard({ todo, onDelete, onEdit, onToggle }) {
    const [isEditing, setIsEditing] = useState(false)

    function formatDueDate(dateString) {
        if (!dateString) return ''

        return new Date(dateString).toLocaleDateString('en-US', {
            timeZone: 'UTC',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }


    return (
        <>
        {isEditing ? (
            <EditForm
                todo={todo}
                onCancel={() => setIsEditing(false)}
                onSave={async (updatedData) => {
                    await onEdit(updatedData)
                    setIsEditing(false)
                }}
            />
        ) : (
            <div className="flex flex-col w-full border-b p-2 ">
                <div className="flex flex-row gap-1">
                    <input 
                        className="h-5 w-5 accent-black cursor-pointer m-2 shrink-0"
                        type='checkbox' 
                        checked={todo.completed} 
                        onChange={(e) => onToggle(e.target.checked)}
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                        <h2 className={`text-md font-semibold text-left ${todo.completed ? 'line-through' : ''}`}>
                            {todo.title}
                        </h2>
                        <p className='text-xs text-gray-600 text-left mb-2 line-clamp-2'>{todo.description}</p>
                        <p className="font-semibold text-sm text-left">{todo.completed ? 'Completed' : `Due: ${formatDueDate(todo.dueDate)}`}</p>
                </div>

                <div className="flex justify-end pr-4 font-semibold">{capitalize(todo.priority)}</div>
                </div>

                <div className="flex justify-end gap-1">
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-1 text-sm border border-gray-300 hover:bg-gray-200"
                    >
                        Edit
                    </button >
                    <button 
                        onClick={onDelete}
                        className="px-3 py-1 text-sm border border-gray-300 hover:bg-gray-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        )}
        </>
    )
}