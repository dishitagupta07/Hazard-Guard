
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/**
 * Reusable function for making HTTP requests to the backend.
 *
 * Example later:
 * apiRequest('/labs')
 * apiRequest('/sensors/readings')
 */
export async function apiRequest(endpoint, options = {}) {
  if (!API_BASE_URL) {
    throw new Error(
      'Backend API URL is not configured. Add VITE_API_BASE_URL to your .env file.'
    )
  }

  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    )
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export { API_BASE_URL }
