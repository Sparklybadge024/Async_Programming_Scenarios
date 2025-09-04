// User posts:-
let profiles=[
    {profile:"Adam",posts:["image1","story1","reel1","Content1"]},
    {profile:"Eve",posts:["image2","story2","reel2","Content2"]},
    {profile:"Chuck",posts:["image3","story3","reel3","Content3"]},
    {profile:"Jimmy",posts:["image4","story4","reel4","Content4"]},
    {profile:"Kim",posts:["image5","story5","reel5","Content5"]},
    {profile:"Howard",posts:["image6","story6","reel6","Content6"]},
]
// Type1

function getUserProfile(pro){
    return new Promise((resolve,reject)=>{
        for(let n of profiles){
            if(n.profile===pro){
               setTimeout(()=>{
                 resolve(pro)
               },5100)
            }
        }

        setTimeout(()=>{
            reject("Error occured while fetching profile")
        },5110)
    })
}

function getUserPosts(po){
    return new Promise((resolve,reject)=>{
        for(let n of profiles){
           for(let m of n.posts){
            if(po===m){
                setTimeout(()=>{
                    resolve(po)
                },5500)
            }
           }
        }

        setTimeout(()=>{
            reject("No posts found, Try again...")
        },5501)
    })
}
// Parallel:-
Promise.all([getUserProfile("Chuck"),getUserPosts("reel2")]).then(n=>console.log("required details: "+n)).catch(n=>console.log(n))

// Series:-
getUserProfile("Jimmy").then(n=>getUserPosts("reel4").then(m=>{return {name:n,post:m}}).then(l=>console.log(l)))


// Type 2:-
function getUserProfilePosts(us,po){
    return new Promise((resolve,reject)=>{
        for(let n of profiles){
            if(n.profile===us&&n.posts.includes(po)){
                resolve({name:us,post:n.posts})
            }
        }
        reject("No profile found")
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

getUserProfilePosts("Jimmy","reel6")
getUserProfilePosts("Jimmy","reel4")

// Type 3:-
console.log(profiles[0].posts.indexOf("reel1"));
let getUserProfile0=function (pro){
    return new Promise((resolve,reject)=>{
        for(let n of profiles){
            if(n.profile===pro){
               setTimeout(()=>{
                 resolve(pro)
               },7100)
            }
        }

        setTimeout(()=>{
            reject("Error occured while fetching profile")
        },7110)
    })
}

function getUserPosts0(us,po){
    return getUserProfile0(us).then(ti=>
     new Promise((resolve,reject)=>{
        for(let n of profiles){
           if(n.profile===ti&&n.posts.includes(po)){
            setTimeout(()=>{
                resolve({name:ti,post:po,index:n.posts.indexOf(po),AllPost:n.posts})
            },7500)
            return;
           }
        }

        setTimeout(()=>{
            reject("No posts found, Try again...")
        },7511)
    })
)}

getUserPosts0("Howard","story6").then(n=>console.log(n)).catch(n=>console.log(n))
