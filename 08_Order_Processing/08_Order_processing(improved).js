class Store{
 constructor(){
    this.products=new Map();
}

addBrand(brandName){
    if(!this.products.has(brandName)){
        this.products.set(brandName,{});
    }
    return this.products.get(brandName)
}

addCategory(brandName,categoryName){
    if(!this.products.has(brandName)){
       this.addBrand(brandName);
       this.products.get(brandName)[categoryName]=[];
    }else{
        this.products.get(brandName)[categoryName]=[];
    }
    return this.products.get(brandName)
}

addProduct(brand,category,productObj){
    let obj=productObj;
    if(typeof obj.productTitle!=='string'||typeof obj.price!=='number'||obj.productTitle.length===0||obj.price<=0){
        return {success:false,reason:`Product can't be uploaded because vital details of the product are missing.`}
    }

    if(!this.products.has(brand)){
        this.addBrand(brand);
        this.addCategory(brand,category);
    }
    if(!this.products.get(brand)[category]){
        this.addCategory(brand,category);
    }

    for(let i of this.products.get(brand)[category]){
        if(i.productTitle===obj.productTitle&&i.variant===obj.variant){
           i.stock+=obj.stock;
           return i;
        }
        
    }
    
    this.products.get(brand)[category].push(productObj)
    
    return this.products.get(brand)[category]
}

removeProduct(brand,category,productTitle,variant,qty=null){
    if(this.products.has(brand)[category]){
        for(let i of this.products.get(brand)[category]){
        if(i.productTitle===productTitle&&i.variant===variant&&qty===null){
            this.products.get(brand)[category]=this.products.get(brand)[category].splice(i,1)
        }else if(i.productTitle===productTitle&&i.variant===variant){
            i.stock=qty;
        }
    }
    }else{
        throw new Error("Nothing Found")
    }
    return this.products;
}

showProduct(brand){
    if(this.products.has(brand)){
        return this.products.get(brand)
    }
}
}
// testing the actual code
let s1=new Store;
s1.addBrand("Motorolla")
console.log(s1);
s1.addCategory("Motorolla","Mobile Phones")
console.log(s1);
s1.addBrand("Motorolla")
console.log(s1);
s1.addCategory("acer","Laptops")
console.log(s1);
s1.addProduct("Motorolla","Mobile Phones",{productTitle:"Motorola Moto G85 5G (128, Cobalt Blue, New)",variant:"128GB, Cobalt Blue",price:15949,stock:10,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("Motorolla","Mobile Phones",{productTitle:"Motorola Moto G85 5G (128, Cobalt Blue, New)",variant:"128GB, Cobalt Blue",price:15949,stock:10,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
console.log(s1.showProduct("Motorolla"));
s1.addProduct("Samsung","Mobiles",{productTitle:"Galaxy S25",variant:"128GB",price:70000,stock:5,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
console.log(s1);
console.log(s1.showProduct("Samsung"));
s1.removeProduct("Samsung","Mobiles","Galaxy S25","128GB")
console.log(s1);

console.log(s1.showProduct("Samsung"))

s1.removeProduct("Motorolla","Mobile Phones","Motorola Moto G85 5G (128, Cobalt Blue, New)","128GB, Cobalt Blue",15);
console.log(s1.showProduct("Motorolla"));







// Test code for mapping
// let store=new Map();
// function addBrand(brandName){
//     if(!store.has(brandName)){
//         store.set(brandName,{})
//     }
//     return store;
// }

// console.log(store);
// console.log(addBrand("acer"));
// console.log(store);
// console.log(addBrand("acer"));

// function addCategory(brandName,categoryName){
//     if(store.has(brandName)){
//         store.get(brandName)[categoryName]={}
//     }else{
//         addBrand(brandName);
//         store.get(brandName)[categoryName]={}
//     }
// return store;
// }

// addCategory("acer","Laptop")
// console.log(store);


// function addProduct(brandName,categoryName,productObj){
//     if(!store.has(brandName)){
//         addBrand(brandName);
//     }else if(!store.get(brandName)[categoryName]){
//         addCategory(brandName,categoryName);
//     }else{
//         store.get(brandName)[categoryName][productObj];
//     }
// }
