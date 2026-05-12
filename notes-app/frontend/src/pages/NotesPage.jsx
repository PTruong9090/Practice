import { useEffect, useState } from "react"
import { getNotes, createNote, updateNote, deleteNote } from "../api/notesApi.js"
import NoteCard from "../components/NoteCard.jsx"
import EmptyState from "../components/EmptyState.jsx"
import NoteEditor from "../components/NoteEditor.jsx"

export default function NotesPage() {
    const [notes, setNotes] = useState([])
    const [selectedNoteId, setSelectedNoteId] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
 
    const selectedNote = notes.find((note) => note.id === selectedNoteId)

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

    async function handleDelete(id) {
        try {
            await deleteNote(id)
            setSelectedNoteId(null)
            await loadNotes()
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
            setIsLoading(true)
            const res = await getNotes()
            
            setNotes(res.data)
        } catch (error){
            console.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadNotes()
    }, [])

    return (
        <div className='flex flex-col md:flex-row min-h-screen w-full bg-gray-50'>

            {/* Mobile note picker */}
            <div className="md:hidden border-b bg-white p-3">
                <div className="flex gap-2">
                    <select
                        className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 font-medium text-gray-800 shadow-sm outline-none focus:border-black"
                        value={selectedNoteId || ""}
                        onChange={(e) => {
                            setSelectedNoteId(e.target.value)
                            setIsCreating(false)
                        }}
                    >
                    
                        <option value="">Select a note</option>
                        {notes.map((note) => (
                            <option key={note.id} value={note.id}>
                                {note.title}
                            </option>
                        ))}
                    </select>
                    {selectedNoteId && !isCreating ? (
                        <button 
                            onClick={() => {handleDelete(selectedNote.id)}}
                            className="rounded-md px-2 bg-black text-white hover:bg-gray-500"
                        >
                            X
                        </button>
                    ) : null }
                    <button 
                        onClick={() => {
                            setSelectedNoteId(null)
                            setIsCreating(true)
                        }} 
                        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
                    >
                        New
                    </button>
                </div>
            </div>

            <aside className='flex hidden md:flex w-full md:w-72 flex-col bg-white shrink-0 border-r'>
                <header className='flex items-center justify-between border-b p-4'>
                    <h1 className='text-xl font-semibold'>Notes</h1>
                    <button 
                        onClick={() => {
                            setSelectedNoteId(null)
                            setIsCreating(true)
                        }}
                        className='rounded-md px-3 py-2 hover:bg-gray-500 text-small text-white bg-black'>New</button>
                </header>

                <section className='flex flex-1 flex-col gap-2 max-h-64 md:max-h-none overflow-y-auto p-3'>
                    {/* Insert Note Component */}
                    {isLoading ? (
                        <p>Loading notes...</p>
                    ) : (notes.map((note) => (
                            <NoteCard 
                                key={note.id}
                                note={note}
                                isSelected={note.id === selectedNoteId}
                                onDelete={() => handleDelete(note.id)}
                                onSelect={() => {
                                    setSelectedNoteId(note.id);
                                    setIsCreating(false);
                            }}/>
                    )))}
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
                        key={selectedNote.id}
                        mode='Edit'
                        initialTitle={selectedNote.title}
                        initialBody={selectedNote.body}
                        onSave={(data) => handleUpdateNote(selectedNote.id, data)}
                        onCancel={() => setSelectedNoteId(null)}
                    />
                ) : (
                    <EmptyState/>
                )}
            </main>
        </div>
    )
}