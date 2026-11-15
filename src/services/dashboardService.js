
import { apiRequest } from './api'

export async function getDashboardLabs() {
  const response = await apiRequest('/dashboard/summary')
  return response.data
}

export function getDashboardSource() {
  return 'live'
}
