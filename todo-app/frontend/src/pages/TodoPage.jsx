import { useState } from 'react'

export default function TodoPage() {
    const [isCreating, setIsCreating] = useState(false)

    return (
        <main className="flex min-h-screen p-8 bg-gray-50">
            <div className="flex-col mx-auto text-center">
                <h1 className="font-bold">Todo List</h1>

                {!isCreating ? (
                    <form>
                        <input
                            className=''
                            placeholder='Type here'
                        >
                        
                        </input>
                    </form>
                ) : (
                    <button></button>
                )}
            </div>

        </main>
    )
}