
import { useState } from "react";


export default function NoteEditor({mode, initialTitle, initialBody, onSave, onCancel}) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        onSave({
            title,
            body,
        })
    }

    return (
        <form
            className='w-full flex flex-1 flex-col'
            onSubmit={handleSubmit}
        >
            <input
                className="w-full bg-transparent text-3xl font-bold"
                placeholder="Untitled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className='mt-6 flex-1 resize-none text-lg bg-transparent outline-none'
                placeholder='Start writing'
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />

            <div className="mt-4 flex outline-none gap-2">
                <button
                    type='button'
                    className="rounded-md border px-4 py-2"
                    onClick={onCancel}
                >
                Cancel
                </button>

                <button
                    className="rounded-md bg-black px-4 py-2 text-white"
                >
                {mode === 'Create' ? 'Create' : 'Save'}
                </button>
            </div>
        </form>
    )
}