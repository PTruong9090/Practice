const API_BASE_URL = import.meta.env.VITE_API_URL

export async function request(path, options = {}) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        }
    })

    let data = null

    if (res.status !== 204) {
        data = await res.json().catch(() => null)
    }

    if (!res.ok) {
        throw new Error(data?.message || "Request failed.")
    }
    
}