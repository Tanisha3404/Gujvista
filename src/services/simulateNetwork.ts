// Local data answers instantly, so we add a short pause to make
// loading states visible while testing. Removed in Phase 3.
export const SIMULATED_DELAY_MS = 400

export function simulateNetwork(ms: number = SIMULATED_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}