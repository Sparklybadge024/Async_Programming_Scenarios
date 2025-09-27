File Downloading Progress Simulation

This project simulates file downloading with progress updates and intermittent connection interruptions. It demonstrates asynchronous JavaScript using Promises and setTimeout to mimic real-world file downloads.

Features:

- Simulates multiple file downloads concurrently.

- Shows progress updates at 10%, 50%, and 100%.

- Randomly simulates connection interruptions and automatic retries.

- Uses Promise.all to handle multiple downloads and detect overall completion or failure.

- Provides clear success ✅ or failure ❌ messages.

Code Overview

1. F1: Formula 1 Teams Data

let f1 = [
    `Formula 1 Teams for 2025 Season`,
    {Team:"McLaren",Drivers:[{name:"Oscar Piastri",Car_number:81,from:"Australia"},{name:"Lando Norris",Car_number:4,from:"United Kingdom"}]},
    {Team:"Ferrari",Drivers:[{name:"Charles Leclerc",Car_number:16,from:"Monaco"},{name:"Lewis Hamilton",Car_number:44,from:"United Kingdom"}]},
    ...
];


- This part stores data about Formula 1 teams and drivers.

- Each team object contains the team name and an array of drivers.

2. File Download Simulation

function fileDownload(file){
    console.log(`Preparing file to download...`);
    let random = Math.floor(Math.random()*10);

    return new Promise((resolve, reject) => {
        setTimeout(()=>{ console.log(`file is 10% downloaded...`); }, 100)
        setTimeout(()=>{ console.log(`file is 50% downloaded...`); }, 300)

        if(random < 6 && random > 3){
            setTimeout(()=>{ console.log("Connection is interrupted, retrying..."); }, 350)
            setTimeout(()=>{ console.log("Connected Download is resuming..."); }, 365)
        }

        setTimeout(()=>{
            if(random > 3){
                console.log(file + " has been 100% downloaded");
                resolve(`file is successfully downloaded: ` + file)
            } else {
                reject(new Error(`${file} Connection is lost, downloading is terminated. Try again later 😔😔`))
            }
        }, 600)
    })
}


- fileDownload(file) simulates downloading a single file.

- It randomly determines if the download will fail or succeed.

- Logs progress at different stages (10%, 50%, 100%).

- Simulates connection interruptions with retry messages.

3. Downloading Multiple Files

let f2 = fileDownload("file1")
let f3 = fileDownload("file2")
let f4 = fileDownload("file3")
let f5 = fileDownload("file4")

Promise.all([f2, f3, f4, f5])
    .then(() => console.log("✅ All downloads 100% completed."))
    .catch(n => console.log("❌ At least one download failed " + n))


- Downloads multiple files concurrently.

- Promise.all waits for all downloads to finish.

- Logs overall success or failure depending on individual downloads.

How to Run:-

1. Copy the code into a JavaScript file (e.g., downloadSimulation.js).

2. Open the file in Node.js terminal:

node downloadSimulation.js

3. Watch the console for progress messages, connection interruptions, and final results.

Output Example
Preparing file to download...
file is 10% downloaded...
file is 50% downloaded...
Connection is interrupted, retrying...
Connected Download is resuming...
file1 has been 100% downloaded
❌ At least one download failed file2 Connection is lost, downloading is terminated. Try again later 😔😔
✅ All downloads 100% completed.

Notes

- This is a simulation; no actual files are downloaded.

- The randomness simulates real-world unreliable network behavior.

- Can be extended to handle retry logic automatically or add more progress steps