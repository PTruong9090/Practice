import { request } from "./http.js";

export function getTodoList() {
    return request('todo', {
        method: 'GET'
    })
}

export function getTodo(id) {
    return request(`todo/${id}`, {
        method: 'GET'
    })
}

export function editTodo(id, data) {
    return request(`todo/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
}

export function toggleTodo(id, completed) {
    return request(`todo/${id}/toggle`, {
        method: 'PUT',
        body: JSON.stringify({completed})
    })
}

export function deleteTodo(id) {
    return request(`todo/${id}`, {
        method: 'DELETE'
    })
}

export function createTodo(todo) {
    return request('todo', {
        method: 'POST',
        body: JSON.stringify(todo)
    })
} 