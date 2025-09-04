## Scenario 2: Image Loading Simulation

This file demonstrates async image loading using JavaScript Promises:

1. **Type 1**: Uses `Promise.race` with a timeout to simulate loading errors.
2. **Type 2**: Uses random success/failure to simulate real network unpredictability.
3. **Uses**: `Promise.allSettled` to handle multiple images simultaneously and report success/failure.
