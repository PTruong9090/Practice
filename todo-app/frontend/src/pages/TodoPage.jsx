import { useState, useEffect } from 'react'
import { getTodoList, createTodo, deleteTodo, editTodo, toggleTodo, getTodo } from '../api/api.js'
import CreateForm from '../components/createForm'
import TodoCard from '../components/todoCard.jsx'

export default function TodoPage() {
    const [loadingTodoList, setLoadingTodoList] = useState(false)

    const [todos, setTodos] = useState([])
    const [isCreating, setIsCreating] = useState(false)
    const [filter, setFilter] = useState('all')

    const filteredTodos = 
        filter === 'all' ?
            todos :
            filter === 'active' ?
                todos.filter((todo) => todo.completed === false) :
                    todos.filter((todo) => todo.completed === true)

    async function handleSubmit(data) {
        try {
            
            const res = await createTodo(data)
            await loadTodoList()

        } catch (error) {
            console.error(error)
        } finally {
            
            setIsCreating(false)
        }
    }

    async function loadTodoList() {
        try {
            setLoadingTodoList(true)
            const res = await getTodoList()
            setTodos(res.data)

        } catch (error) {
            console.error(error)
        } finally {
            setLoadingTodoList(false)
        }
    }

    async function handleDelete(id) {
        try {
            await deleteTodo(id)
            await loadTodoList()

        } catch (error) {
            console.error(error)
        }
    }

    async function handleEdit(id, updatedData) {
        try {
            await editTodo(id, updatedData)
            await loadTodoList()
        } catch (error) {
            console.error(error)
        }
    }

    async function handleToggle(id, completed) {
        try {
            await toggleTodo(id, completed)
            await loadTodoList()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        loadTodoList()
    }, [])

    return (
        <main className="flex min-h-screen p-8 bg-gray-50">
            <div className="flex flex-col w-full max-w-md mx-auto text-center gap-4 border rounded-md p-5">
                <h1 className="text-2xl font-bold border-b">Todo List</h1>

                {isCreating ? (
                    <CreateForm
                        onSave={handleSubmit}
                        onCancel={() => setIsCreating(false)}
                    />
                ) : (
                    <button
                        className='border bg-black text-white rounded-md mx-5 border-gray-300 hover:bg-gray-600 font-semibold'
                        onClick={() => setIsCreating(true)}
                    >
                    Add a Task
                    </button>
                )}

                <div className='flex w-full rounded-md border border-gray-300 overflow-hidden'>
                    <button 
                        onClick={() => setFilter('all')}
                        className={`flex-1 px-3 text-sm border-gray-300
                            ${filter === 'all' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}
                            `}
                    >
                        All
                    </button>
            
                    <button 
                        onClick={() => setFilter('active')}
                        className={`flex-1 px-3 text-sm border-gray-300 border-l
                            ${filter === 'active' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200 '}`}
                    >
                        Active
                    </button>
                
                    <button 
                        onClick={() => setFilter('completed')}
                        className={`flex-1 px-3 text-sm border-gray-300
                            ${filter === 'completed' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200 '}`}>
                        Completed
                    </button>
                </div>

                <div className='flex flex-1 flex-col border rounded-md'>
                    {!loadingTodoList ? (filteredTodos.map((todo) => (
                        filteredTodos ? (
                            <TodoCard 
                                key={todo.id}
                                todo={todo}
                                onDelete={() => handleDelete(todo.id)}
                                onEdit={(updatedData) => handleEdit(todo.id, updatedData)}
                                onToggle={(completed) => handleToggle(todo.id, completed)}
                            />
                        ) : (
                            <>No tasks available</>
                    )))) : (
                        <>Loading todo list...</>
                    )}
                </div>

            </div>

        </main>
    )
}