class Store{
    // This class is basically for the sellers so that they can manage their products.
 constructor(){
    this.products=new Map();
}

addBrand(brandName){
    // This method will add a brand in the online store.
    if(!this.products.has(brandName)){
        this.products.set(brandName,{});
    }
    return this.products.get(brandName)
}

addCategory(brandName,categoryName){
    // This method will add a category in the brand.
    if(!this.products.has(brandName)){
       this.addBrand(brandName);
       this.products.get(brandName)[categoryName]=[];
    }else{
        this.products.get(brandName)[categoryName]=[];
    }
    return this.products.get(brandName)
}

addProduct(brand,category,productObj){
    // This method will add Product details.
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
    // This will remove products that are discontinued and also this will update the Stock.
    let remove={success: true, action: "removed", product:[]}
    let update={success: true, action: "updated", product:[]}
    if(this.products.has(brand)&&category in this.products.get(brand)){
        for(let i=this.products.get(brand)[category].length-1;i>=0;i--){
            let pro=this.products.get(brand)[category][i]
        if(pro.productTitle===productTitle&&pro.variant===variant&&qty===null){

            this.products.get(brand)[category].splice(i,1)
            remove.product.push({Title:productTitle,Variant:variant})
        }else if(pro.productTitle===productTitle&&pro.variant===variant){
            pro.stock=qty;
            update.product.push({Title:productTitle,Variant:variant,Updated_Quantity:qty})
            }
        }
    }
    if(remove.product.length!==0&&update.product.length!==0){
        return {remove,update}
    }
    if(remove.product.length!==0){
        return remove;
    }else if(update.product.length!==0){
        return update;
    }else{
     
        throw new Error("Nothing Found")
    }
    
}

showProduct(brand){
    // This method will show the products a brand contains.
    if(this.products.has(brand)){
        return this.products.get(brand)
    }
}
}

class User{
    constructor(){
        this.cart=[];    
    }
    
    addToCart(product,quantity){

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
console.log(s1.showProduct("Motorolla"));
s1.removeProduct("Motorolla","Mobile Phones","Motorola Moto G85 5G (128, Cobalt Blue, New)","128GB",200)
console.log(s1.showProduct("Motorolla"));
console.log(s1.showProduct("Samsung"));
s1.addProduct("Motorolla","Mobile Phones",{productTitle:"Motorola Moto G85 5G (128, Cobalt Blue, New)",variant:"128GB, Cobalt Blue",price:15949,stock:10,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});








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
