# Scenario 4: Competing Servers (Promise.race)

This scenario simulates fetching data from two different servers (A and B).  
Each server responds in a random time, and the first one to respond "wins" using `Promise.race`.

## Features
- Two separate functions (`fetchFromServerA`, `fetchFromServerB`) that simulate server response with random delay.
- Uses `Promise.race()` to resolve the fastest response between two servers.
- Error handling with reject messages including response time.

## Concepts Used
- Randomized async delay (`setTimeout` + `Math.random`).
- `Promise.race()` → return whichever server responds first.
- Error handling with `.catch()`.
