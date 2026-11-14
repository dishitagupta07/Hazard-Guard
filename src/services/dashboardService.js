
import { mockLabs } from '../data/mockData'

/**
 * Provides laboratory data to the Dashboard.
 * Currently uses demonstration data.
 * Later, this service can retrieve live data from the backend.
 */
export function getDashboardLabs() {
  return mockLabs
}

export function getDashboardSource() {
  return 'demo'
}
