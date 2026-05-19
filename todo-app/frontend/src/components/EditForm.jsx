import { useState } from "react"

export default function EditForm({ todo, onCancel, onSave }) {
    
    const [initialTitle, setInitialTitle] = useState(todo.title)
    const [initialDescription, setInitialDescription] = useState(todo.description)
    const [initalCompleted, setInitialCompleted] = useState(todo.completed)
    const [initialDueDate, setInitialDueDate] = useState(
        todo.dueDate ? todo.dueDate.split('T')[0] : '')
    const [initialPriority, setInitialPriority] = useState(todo.priority)
    const [isSaving, setIsSaving] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
            setIsSaving(true)
            await onSave({
                title: initialTitle,
                description: initialDescription,
                completed: initalCompleted,
                dueDate: initialDueDate,
                priority: initialPriority,
            })
        } catch (error) {
            setIsSaving(false)
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }
 
    return (
        <form className='flex flex-col w-full gap-3 p-4' onSubmit={handleSubmit}>
            <input
                className='border rounded-md border-gray-500 p-1'
                placeholder='Add a title'
                value={initialTitle}
                onChange={(e) => setInitialTitle(e.target.value)}
            >
            </input>
            <textarea
                className='border rounded-md px-1 border-gray-500'
                placeholder='Add a description'
                value={initialDescription}
                onChange={(e) => setInitialDescription(e.target.value)}
            >
            </textarea>

            <div className='flex md: px-2 gap-4 justify-center text-sm'>
                <select value={String(initalCompleted)} onChange={(e) => setInitialCompleted(e.target.value === 'true')}>
                    <option value={'false'}>Active</option>
                    <option value={'true'}>Completed</option>
                </select>
                <select value={initialPriority} onChange={(e) => setInitialPriority(e.target.value)}>
                    <option value={'low'}>Low</option>
                    <option value={'medium'}>Medium</option>
                    <option value={'high'}>High</option>
                </select>
                <input type='date' value={initialDueDate} onChange={(e) => setInitialDueDate(e.target.value)}>
                    
                </input>
            </div>

            <div className='flex gap-1 justify-end'>
                <button 
                    disabled={isSaving}
                    type='button'
                    onClick={() => onCancel()}
                    className='border px-4 hover:bg-gray-500 bg-black text-white rounded-md'
                >
                    X
                </button>
                <button 
                    disabled={isSaving}
                    className='border px-4 hover:bg-gray-500 bg-black text-white rounded-md'
                >
                    ✓
                </button>
            </div>

        </form>
    )
}