let profiles=[
    {profile:"Adam",posts:["image1","story1","reel1","Content1"]},
    {profile:"Eve",posts:["image2","story2","reel2","Content2"]},
    {profile:"Chuck",posts:["image3","story3","reel3","Content3"]},
    {profile:"Jimmy",posts:["image4","story4","reel4","Content4"]},
    {profile:"Kim",posts:["image5","story5","reel5","Content5"]},
    {profile:"Howard",posts:["image6","story6","reel6","Content6"]},
] 
let rand1=Math.round(Math.random()*2000);

function fetchFromServerA(str){
    return new Promise((resolve,reject)=>{
        
            for(let i of profiles){
                if(i.profile===str){
                    i.time=rand1+` mili seconds(timer 1)`
                    setTimeout(()=>{
                        resolve(i)
                    },rand1)
                }
                               
            }
                setTimeout(()=>{
                        reject(`No profile found with name ${str} took ${rand1} mili seconds time.`)
                    },rand1)
        
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

let rand2=Math.floor(Math.random()*2000)
function fetchFromServerB(str){
    return new Promise((resolve,reject)=>{
        
            for(let i of profiles){
                if(i.profile===str){
                    i.time=rand2+` mili seconds(timer 2)`
                    setTimeout(()=>{
                        resolve(i)
                    },rand2)
                }
                               
            }
                setTimeout(()=>{
                        reject(`No profile found with name ${str} took ${rand2} mili seconds time.`)
                    },rand2)
        
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

fetchFromServerA("Gob")
fetchFromServerA("Kim")

fetchFromServerB("Mike")
fetchFromServerB("Eve")

Promise.race([fetchFromServerA("Howard"),fetchFromServerB("Howard")])
