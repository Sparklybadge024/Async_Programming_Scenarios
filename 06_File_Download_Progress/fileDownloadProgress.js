let f1=[
    `Formula 1 Teams for 2025 Season`,
    {Team:"McLaren",Drivers:[{name:"Oscar Piastri",Car_number:81,from:"Australia"},{name:"Lando Norris",Car_number:4,from:"United Kingdom"}]},
    {Team:"Ferrari",Drivers:[{name:"Charles Leclerc",Car_number:16,from:"Monaco"},{name:"Lewis Hamilton",Car_number:44,from:"United Kingdom"}]},
    {Team:"Mercedes",Drivers:[{name:"George Russell",Car_number:63,from:"United Kingdom"},{name:"Kimi Antonelli",Car_number:12,from:"Italy"}]},
    {Team:"Red Bull Racing",Drivers:[{name:"Max Verstappen",Car_number:1,from:"Netherlands"},{name:"Yuki Tsunoda",Car_number:22,from:"Japan"}]},
    {Team:"Williams",Drivers:[{name:"Alexander Albon",Car_number:23,from:"Thailand"},{name:"Carlos Sainz",Car_number:55,from:"Spain"}]},
    {Team:"Aston Martin",Drivers:[{name:"Lance Stroll",Car_number:18,from:"Canada"},{name:"Fernando Alonso",Car_number:14,from:"Spain"}]},
    {Team:"Racing Bulls",Drivers:[{name:"Liam Lawson",Car_number:30,from:"New Zealand"},{name:"Isack Hadja",Car_number:6,from:"France"}]},
    {Team:"Kick Sauber",Drivers:[{name:"Nico Hulkenberg",Car_number:27,from:"Germany"},{name:"Gabriel Bortoleto",Car_number:5,from:"Brazil"}]},
    {Team:"Haas",Drivers:[{name:"Esteban Ocon",Car_number:31,from:"France"},{name:"Oliver Bearman",Car_number:87,from:"United Kingdom"}]},
    {Team:"Alpine",Drivers:[{name:"Pierre Gasly",Car_number:10,from:"France"},{name:"Franco Colapinto",Car_number:43,from:"Argentina"}]}
]

function fileDownload(file){
    console.log(`Preparing file to download...`);
    let random=Math.floor(Math.random()*10);
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(`file is 10% downloaded...`);
            
        },100)

        setTimeout(()=>{
            console.log(`file is 50% downloaded...`);
            
        },300)
        if(random<6&&random>3){
            setTimeout(()=>{
                console.log("Connection is interrupted, retrying...");                 
            },350)
            setTimeout(()=>{
                console.log("Connected Download is resuming...");
                
            },365)
            }
        setTimeout(()=>{
            if(random>3){
                console.log(file+" has been 100% downloaded");
                resolve(`file is successfully downloaded: `+file)
                
                
            }else{
                reject(new Error(`${file} Connection is lost downloading is terminated, Try again later...😔😔`))
            }
        },600)
    })
}

let f2=fileDownload("file1")
let f3=fileDownload("file2")
let f4=fileDownload("file3")
let f5=fileDownload("file4")

Promise.all([f2,f3,f4,f5]).then(()=>console.log("✅ All downloads 100% completed.")).catch(n=>console.log("❌ At least one download failed "+n))