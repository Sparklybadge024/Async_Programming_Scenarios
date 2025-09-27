API Batching Simulation:
This project demonstrates API call batching in JavaScript using Promises. It simulates multiple API requests with random success/failure and allows processing them in batches, ensuring efficient and controlled execution.

What is API Batching?

API batching is the practice of grouping multiple API requests together and sending or processing them in batches rather than all at once or one by one.

Example Analogy:

Imagine you have 20 packages to deliver:

- Without batching: You send all 20 at once. The delivery van may get overloaded.

- With batching: You send 5 packages at a time, wait for them to be delivered, then send the next 5.

- Batching ensures smoother, safer, and more reliable processing.

It’s mainly used to:

1. Reduce server load – Instead of firing 100 requests at the same time, you process them in smaller groups.

2. Control concurrency – Only a limited number of requests run simultaneously.

3. Improve efficiency – Once one batch completes, the next batch is sent automatically.

4. Handle errors more gracefully – Failures in one batch don’t stop other batches.

Features:

- Simulates multiple asynchronous API calls with random success or failure.

- Logs API results individually to the console.

- Supports batch processing: limit the number of concurrent API calls at a time.

- Uses Promise.allSettled to handle all API results, regardless of success or failure.

- Reduces resource overloading by controlling concurrency.

Code Overview:
Case 1: Classic Sequential API Chaining
function api1(){
  return new Promise((resolve,reject)=>{
    let random=Math.floor(Math.random()*10);
    setTimeout(()=>{
      if(random>=3){
        resolve("Api1 Processed")
      }else{
        reject("Api1 not found")
      }
    },500)
  }).then(n=>{console.log(n); return api3()})
    .catch(n=>{console.log(n); return api3()})
}


- Each API function returns a Promise.

- Success or failure is determined randomly.

- APIs are chained sequentially (api1 → api3 → api5 …).

- Handles success with .then() and failure with .catch().

- Multiple chains can be executed in parallel using Promise.allSettled.

Case 2: Improved API Batching
function batchProcess(arr,batch){
  let index = 0;

  function nextBatch(){
    if(index >= arr.length){
      return Promise.resolve();
    }

    let bat = arr.slice(index, index + batch).map(n => n());
    index += batch;

    Promise.allSettled(bat)
      .then(() => nextBatch())
      .catch(n => console.log(n))
  }

  return nextBatch()
}

let a1 = [api11, api12, api13, api14, api15, api16, api17];
batchProcess(a1, 4);


- batchProcess function allows processing multiple APIs in configurable batches.

- arr is an array of API functions.

- batch defines how many APIs run concurrently.

- Uses Promise.allSettled to ensure all APIs in a batch are handled, regardless of success or failure.

- Processes next batch only after the current batch finishes.

- Improves efficiency and prevents overloading the system with too many simultaneous API calls.

How to Run

1. Copy the code into a JavaScript file (e.g., apiBatching.js).

2. Run it using Node.js:

node apiBatching.js


3. Watch the console for API processing logs and batch execution order.

Example Output
Api11 Processed
Api12 Processed
Api13 not found
Api14 Processed
Api15 Processed
Api16 not found
Api17 Processed


- Logs show which APIs succeeded or failed.

- APIs are executed in batches (e.g., first 4, then remaining).

Advantages of API Batching

- Prevents network overload by limiting concurrent API calls.

- Easier to manage retries and error handling per batch.

- Efficient for large sets of API requests.