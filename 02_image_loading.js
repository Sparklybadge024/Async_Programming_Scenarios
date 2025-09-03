// Image loading:-
// Type 1:-
function promiseRace(promise,ms){
    let tt=new Promise((_,reject)=>{
        setTimeout(()=>{
            reject("Error")
        },ms)
    })

    return Promise.race([promise,tt])
}

function img1(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve("img1")
        },1000)
    }).then(n=>n)
}

function img2(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve("img2")
        },2000)
    }).then(n=>n)
}

function img3(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve("img3")
        },3000)
    }).then(n=>n)
}

Promise.allSettled([promiseRace(img1(),1500),promiseRace(img2(),1500),promiseRace(img3(),1500)]).then(n=>console.log(n)).catch(n=>console.log(n))


// Type 2:-
function img01(){
    let random=Math.random()*10;
    return new Promise((resolve,reject)=>{
        console.log("Loading... image 01. Please Wait😊");
        
        setTimeout(()=>{
            if(random>6){
            resolve("Image is loaded click here to watch")
        }else{
            reject("An Error occured While loading the image")
        }
        },4000)
    })
}

function img02(){
    let random=Math.random()*10;
    return new Promise((resolve,reject)=>{
        console.log("Loading... image 02. Please Wait😊");
        
        setTimeout(()=>{
            if(random>6){
            resolve("Image is loaded click here to watch")
        }else{
            reject("An Error occured While loading the image")
        }
        },4500)
    })
}

function img03(){
    let random=Math.random()*10;
    return new Promise((resolve,reject)=>{
        console.log("Loading... image 03. Please Wait😊");
        
        setTimeout(()=>{
            if(random>6){
            resolve("Image is loaded click here to watch")
        }else{
            reject("An Error occured While loading the image")
        }
        },5000)
    })
}

Promise.allSettled([img01(),img02(),img03()]).then(n=>console.log(n)).catch(n=>console.log(n))