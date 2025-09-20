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
       this.products.get(brandName)[categoryName]=[]
    }else{
        this.addBrand(brandName);
        this.products.get(brandName)[categoryName]=[]
    }
}

addProduct(brand,category,productObj){
    if(this.products.has(brand)){
        if(this.products.has(this.products.get(brand)[category])){
            this.products.get(brand)[category][productObj]
        }else{
            this.addCategory(brand,category);
            this.products.get(brand)[category][productObj]
        }
    }else{
        this.addBrand(brand);
        this.addCategory(brand,category);
        this.addProduct(brand,category,productObj)
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
s1.addProduct("Motorolla","Mobile Phones",{productTitle:"Motorola Moto G85 5G (128, Cobalt Blue, New)",variant:"128GB, Cobalt Blue",price:15949,stock:10,productVisualization:["Image1","Image2","Image3","Video1"],features:[]})
console.log(s1);

// Test code for mapping
let store=new Map();
function addBrand(brandName){
    if(!store.has(brandName)){
        store.set(brandName,{})
    }
    return store;
}

console.log(store);
console.log(addBrand("acer"));
console.log(store);
console.log(addBrand("acer"));

function addCategory(brandName,categoryName){
    if(store.has(brandName)){
        store.get(brandName)[categoryName]={}
    }else{
        addBrand(brandName);
        store.get(brandName)[categoryName]={}
    }
return store;
}

addCategory("acer","Laptop")
console.log(store);


function addProduct(brandName,categoryName,productObj){
    if(!store.has(brandName)){
        addBrand(brandName);
    }else if(!store.get(brandName)[categoryName]){
        addCategory(brandName,categoryName);
    }else{
        store.get(brandName)[categoryName][productObj];
    }
}
