class Store{
 constructor(){
    this.products=new Map();
}

addBrand(brandName){
    if(!this.products.has(brandName)){
        this.products.set(brandName,{});
    }
}

addCategory(brandName,categoryName){
    if(this.products.has(brandName)){
       this.products.get(brandName)[categoryName]={}
    }else{
        this.addBrand(brandName);
        this.products.get(brandName)[categoryName]={}
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
