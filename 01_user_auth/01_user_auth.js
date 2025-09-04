let ids=[
    {name:"Dwight Schrute",pwd:1234},
    {name:"Kim Wexler",pwd:234},
    {name:"Stacy Ehrmantraut",pwd:34},
    {name:"Rich Schweikart",pwd:4}
]
// Type 1:-
function checkUsernamePwd(n,p){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            for(let m of ids){
            if(n===m.name&&p===m.pwd){
                return resolve("Access granted")
            }
        }
        reject("User not found");
        },1000)
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

checkUsernamePwd("Dwight Schrute",1234)
checkUsernamePwd("Kim Wexler",234)
checkUsernamePwd("Stacy Ehrmantraut",34)
checkUsernamePwd("Rich Schweikart",4)
checkUsernamePwd("Saul Goodman",0)

// Above code i have made from my own creativity
// Type 2:-
let arr=[]
function checkUser(name){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        for(let m of ids){
           if(name===m.name){
            arr.push(m);
            resolve(name)
           }
        }
        reject("Username not found")
        },1000)
    })
}

function checkPassword(pwd){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(pwd===arr[0].pwd){
                resolve(pwd)
            }else{
                reject("Password not found")
            }
        })
    })
}

// Type 3:-
function addUserName(str){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            for(let i of ids){
               if(i.name===str){
                reject("Username is already taken");
               }
            }
            resolve(ids.push({name:str}))
        },2000)
    }).then(()=>console.log(ids)).catch(n=>console.log(n))
}

function setPassword(str,pwd){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            for(let i of ids){
                if(i.name===str){
                    resolve(i.pwd=pwd)
                }
            }
            reject("No Username found in dataBase.")
        },2000)
    }).then(()=>console.log(ids)).catch(n=>console.log(n))
}
// I hope this code answers what it is being asked
addUserName("Saul Goodman")

// When i am logging ids synchronously the it is not including the newly pushed username?? However when i am logging the ids arrays asynchronously then it is including it why??
setPassword("Saul Goodman","Aucky")
// And i guess it is happening because i am calling it synchronously which means the code will first empty the stack by calling all the synchronous calls before calling the asynchronous calls and as a result i am not getting the new username and password.
setTimeout(()=>{
    console.log(`got: `,ids);
},2500)

