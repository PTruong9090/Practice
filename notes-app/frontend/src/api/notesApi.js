import { request } from "./request"


export function getNotes() {
    return request('notes', {
        method: 'GET',
    })
}

export function createNote(note) {
    return request('notes', {
        method: 'POST',
        body: JSON.stringify(note),
    })
}

export function updateNote(id, note) {
    return request(`notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(note),
    })
}

export function deleteNote(id) {
    return request(`notes/${id}`, {
        method: 'DELETE',
    })
}