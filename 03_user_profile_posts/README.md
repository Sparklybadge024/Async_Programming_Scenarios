# Scenario 3: Fetching User Profiles & Posts

This scenario demonstrates fetching user profile information and posts asynchronously using JavaScript Promises.

## Features
- **Type 1**: Separate functions to fetch profile and posts (runs in parallel or series).  
- **Type 2**: Combined function to fetch both profile and posts.  
- **Type 3**: Extended example with post index and all posts returned.  

## Concepts Used
- `Promise.all()` → Run profile and post requests in parallel.  
- Chaining Promises → Fetch profile first, then fetch posts.  
- Error handling with `reject` and `.catch()`.  
