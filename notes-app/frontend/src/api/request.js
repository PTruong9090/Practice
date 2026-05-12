const API_BASE_URL = import.meta.env.VITE_API_URL

export function normalizeBaseUrl(url) {
    return url.replace(/\/+$/, '')
}

export async function request(path, options = {}) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`

    const res = await fetch(`${normalizeBaseUrl(API_BASE_URL)}/api${normalizedPath}`, {
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

    return data
    
}