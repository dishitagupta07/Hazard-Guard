
import { io } from 'socket.io-client'

let socket = null

/**
 * Connects the frontend to the backend Socket.IO server.
 * Call this only after the backend server URL is available.
 */
export function connectSocket() {
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL

  if (!SOCKET_URL) {
    console.warn(
      'Socket.IO is not connected. VITE_SOCKET_URL is not configured yet.'
    )
    return null
  }

  if (socket?.connected) {
    return socket
  }

  if (socket) {
    socket.disconnect()
  }

  socket = io(SOCKET_URL, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  })

  socket.on('connect', () => {
    console.log('Connected to Hazard Guard server:', socket.id)
  })

  socket.on('disconnect', (reason) => {
    console.log('Disconnected from Hazard Guard server:', reason)
  })

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error.message)
  })

  return socket
}

/**
 * Returns the existing socket instance.
 */
export function getSocket() {
  return socket
}

/**
 * Disconnects the socket when it is no longer needed.
 */
export function disconnectSocket() {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
