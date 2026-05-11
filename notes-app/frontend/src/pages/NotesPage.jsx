import { useEffect, useState } from "react"
import { getNotes } from "../api/notesApi.js"
import { createNote } from "../api/notesApi.js"
import { updateNote } from "../api/notesApi.js"
import NoteCard from "../components/NoteCard.jsx"
import EmptyState from "../components/EmptyState.jsx"
import NoteEditor from "../components/NoteEditor.jsx"

export default function NotesPage() {
    const [notes, setNotes] = useState([])
    const [selectedNoteId, setSelectedNoteId] = useState(null)
    const [isCreating, setIsCreating] = useState(false)

    const selectedNote = notes.find((note) => notes.id === selectedNoteId)

    async function handleCreateNote(data) {
        try {
            const res = await createNote(data)
            await loadNotes()

            setSelectedNoteId(res.data.id)
            setIsCreating(false)

        } catch (error) {
            console.error(error.message)
        }
    }

    async function handleUpdateNote(id, data) {
        try {
            await updateNote(id, data)
            await loadNotes()
            
        } catch (error) {
            console.error(error.message)
        }
    }

    async function loadNotes() {
        try {
            const res = await getNotes()

            setNote(res.data)
        } catch (error){
            console.error(error.message)
        }
    }

    useEffect(() => {
        loadNotes()
    }, [])

    return (
        <div className='flex min-h-screen w-full bg-gray-50'>
            <aside className='flex w-72 flex-col bg-white shrink-0 border-r'>
                <header className='flex items-center justify-between border-b p-4'>
                    <h1 className='text-xl font-semibold'>Notes</h1>
                    <button 
                        onClick={() => {
                            setSelectedNoteId(null)
                            setIsCreating(true)
                        }}
                        className='rounded-md px-3 py-2 hover:bg-gray-500 text-small text-white bg-black'>New</button>
                </header>

                <section className='flex-1 flex-row overflow-y-auto p-3'>
                    {/* Insert Note Component */}
                    {notes.map((note) => (
                        <NoteCard 
                            key={note.id}
                            note={note}
                            isSelected={note.id === selectedNoteId}
                            onSelect={() => setSelectedNoteId(note.id)}/>
                    ))}
                </section>
            </aside>

            <main className="flex flex-1 flex-col">
                {isCreating ? (
                    <NoteEditor
                        mode='Create'
                        initialTitle=''
                        initialBody=''
                        onSave={handleCreateNote}
                        onCancel={() => setIsCreating(false)}
                    
                    />
                ) : selectedNote ? (
                    <NoteEditor 
                        mode='Edit'
                        initialTitle={selectedNote.title}
                        initialBody={selectedNote.body}
                        onSave={(data) => handleUpdateNote(selectedNote.id, data)}
                    />
                ) : (
                    <EmptyState/>
                )}
            </main>
        </div>
    )
}