// Fetch Weather:-
let wether=[
    {Type:"Clouds",details:"Clouds are one of nature's most consistently visible wonders and can also tell us a lot about what is going on up in the atmosphere."},
    {Type:"Snow",details:"Snow is one of the most striking and beautiful weather phenomena causing a transformation of the world around us."},
    {Type:"Thunder and lightning",details:"A thunderstorm is a series of sudden electrical discharges resulting from atmospheric conditions. These discharges result in sudden flashes of light and trembling sound waves, commonly known as thunder and lightning."},
    {Type:"Frost and ice",details:"While we might usually see ice and frost as nothing more than frozen water, they can take a variety of mesmerising forms."},
    {Type:"Rain",details:"At it simplest, rain is described as drops of liquid water falling from the sky."},
    {Type:"Fog",details:"Fog is essentially a cloud at ground level that causes a reduction in visibility to less than 1000 metres.Fog is essentially a cloud at ground level that causes a reduction in visibility to less than 1000 metres."},
    {Type:"Humidity",details:"Humidity is a measurement of the amount of water vapour in the air."},
    {Type:"Hail",details:"Hail is solid precipitation in the form of balls or pieces of ice known as hailstones."},
    {Type:"Hurricanes",details:"Hurricane is another name for a tropical cyclone that forms specifically in the Atlantic or eastern Pacific Oceans. They refer to a revolving storm formed over tropical or sub-tropical oceans."},
    {Type:"Wind",details:"Wind is air in motion, travelling between areas of different pressure."},
    {Type:"Tornado",details:"Tornadoes are one of the most violent and dramatic weather types on the planet and demonstrate the awesome destructive power of our turbulent atmosphere."},
    {Type:"Storms",details:"The term storm is usually applied to any violent atmospheric disturbance, whether it’s a thunderstorm, squall or snowstorm."},
    {Type:"Temperature",details:"Whether on a thermometer or simply through something feeling hot or cold, temperature is one of the most fundamental parts of weather."}
]

// Type 1:-
function fetchWeather(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        if(Math.random()*10>3){
            setTimeout(()=>{
                resolve(wether[Math.floor(Math.random()*13)])
            },Math.random()*4000)
            reject("Timeout Error")
        }
        reject("Main Error");
        },2000)
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}

fetchWeather()

// Type 2:-
let rand3=Math.floor(Math.random()*3000)
function fetchWeather0(){
    return new Promise((resolve,reject)=>{
        if(true){
            setTimeout(()=>{
            resolve(wether[Math.floor(Math.random()*13)])
        },rand3)

        }
        setTimeout(()=>{
            reject("Timeout Error")
        },2000)
    }).then(n=>console.log(n)).catch(n=>console.log(n))
}
fetchWeather0()
// In Scenario 5 i guess type 2 is exactly solving what the question have actually asked.
// Note: This version is intentionally raw to reflect my coding journey.
// In a real project, I would use Promise.race for cleaner timeout handling.

