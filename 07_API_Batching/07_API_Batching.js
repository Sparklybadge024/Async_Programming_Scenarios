// Case 1 Classic code:-
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
    }).then(n=>{console.log(n); return api3()}).catch(n=>{console.log(n); return api3()})
}

function api2(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api2 Processed")
            }else{
                reject("Api2 not found")
            }
        },500)
    }).then(n=>{console.log(n); return api4()}).catch(n=>{console.log(n); return api4()})
}

function api3(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api3 Processed")
            }else{
                reject("Api3 not found")
            }
        },1500)
    }).then(n=>{console.log(n); return api5()}).catch(n=>{console.log(n); return api5()})
}

function api4(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api4 Processed")
            }else{
                reject("Api4 not found")
            }
        },1500)
    }).then(n=>{console.log(n); return api6()}).catch(n=>{console.log(n); return api6()})
}

function api5(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api5 Processed")
            }else{
                reject("Api5 not found")
            }
        },2500)
    }).then(n=>{console.log(n); return api7()}).catch(n=>{console.log(n); return api7()})
}

function api6(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api6 Processed")
            }else{
                reject("Api6 not found")
            }
        },2500)
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

function api7(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api7 Processed")
            }else{
                reject("Api7 not found")
            }
        },3500)
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

Promise.allSettled([api1(),api2()])

// Case 2 Improved code:-

function api11(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api11 Processed")
            }else{
                reject("Api11 not found")
            }
        },500)
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

function api12(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api12 Processed")
            }else{
                reject("Api12 not found")
            }
        },500)
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

function api13(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api13 Processed")
            }else{
                reject("Api13 not found")
            }
        },1500)
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

function api14(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api14 Processed")
            }else{
                reject("Api14 not found")
            }
        },1500)
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

function api15(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api15 Processed")
            }else{
                reject("Api15 not found")
            }
        },2500)
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

function api16(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api16 Processed")
            }else{
                reject("Api16 not found")
            }
        },2500)
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

function api17(){
    return new Promise((resolve,reject)=>{
        let random=Math.floor(Math.random()*10);
        setTimeout(()=>{
            if(random>=3){
               resolve("Api17 Processed")
            }else{
                reject("Api17 not found")
            }
        },2600)
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}


function batchProcess(arr,batch){
    let index=0;

    function nextBatch(){
       if(index>=arr.length){
        return Promise.resolve();
       }

       let bat=arr.slice(index,index+batch).map(n=>n())
       index+=batch;
       Promise.allSettled(bat).then(()=>nextBatch()).catch(n=>console.log(n))
    }
    return nextBatch()
}
let a1=[api11,api12,api13,api14,api15,api16,api17]
batchProcess(a1,4)



