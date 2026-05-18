import { useState } from 'react'


export default function TodoPage() {
    const [todos, setTodos] = useState([])
    const [isCreating, setIsCreating] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const [filter, setFilter] = useState('all')

    async function handleCreateTodo() {

    }

    return (
        <main className="flex min-h-screen p-8 bg-gray-50">
            <div className="flex flex-col mx-auto text-center gap-4 border rounded-md p-5">
                <h1 className="text-2xl font-bold border-b">Todo List</h1>

                {isCreating ? (
                    <form className='flex flex-col gap-3'>
                        <input
                            className='border rounded-md border-gray-500 p-1'
                            placeholder='Add a title'
                            onChange={(e) => setTitle(e.target.value)}
                        >
                        </input>
                        <textarea
                            className='border rounded-md px-1 border-gray-500'
                            placeholder='Add a description'
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>

                        <div className='flex px-2 gap-2'>
                            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value='all'>All</option>
                                <option value='active'>Active</option>
                                <option value='completed'>Completed</option>
                            </select>
                            <input type='date'>
                            </input>
                        </div>

                        <div className='flex gap-1 justify-end'>
                            <button 
                                onClick={() => {
                                    setDescription('')
                                    setIsCreating(false)
                                    setTitle('')
                                }}
                                className='border px-4 hover:bg-gray-500 bg-black text-white rounded-md'
                            >
                                X
                            </button>
                            <button 

                                className='border px-4 hover:bg-gray-500 bg-black text-white rounded-md'
                            >
                                ✓
                            </button>
                        </div>

                    </form>
                ) : (
                    <button
                        onClick={() => setIsCreating(true)}
                    >
                    Add a task
                    </button>
                )}

                <div className='flex'>
                    <button 
                        onClick={() => setFilter('all')}
                        className='px-4 hover:bg-gray-200'
                    >
                        All
                    </button>
                    |
                    <button 
                        onClick={() => setFilter('active')}
                        className='px-4 hover:bg-gray-200'
                    >
                        Active
                    </button>
                    |
                    <button 
                        onClick={() => setFilter('completed')}
                        className='px-4 hover:bg-gray-200'>
                        Completed
                    </button>
                </div>

                <div className='flex flex-1 border'>
                    {todos.map((todo) => {

                    })
                    }
                </div>

            </div>

        </main>
    )
}