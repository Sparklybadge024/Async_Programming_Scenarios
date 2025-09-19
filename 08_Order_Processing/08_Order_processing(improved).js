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
       this.products.brandName.categoryName=[]
    }else{
        this.products.set(brandName,{categoryName:[]})
    }
}
}

let products=new Map();

products.set("acer",{})
products.set("asus",{})
products.set("Lenovo",{})
console.log(products);
