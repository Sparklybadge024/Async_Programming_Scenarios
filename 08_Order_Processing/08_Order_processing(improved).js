class Store{
    // This class is basically for the sellers so that they can manage their products.
 
    static products=new Map();


addBrand(brandName){
    // This method will add a brand in the online store.
    if(!Store.products.has(brandName)){
        Store.products.set(brandName,{});
    }
    return Store.products.get(brandName)
}

addCategory(brandName,categoryName){
    // This method will add a category in the brand.
    if(!Store.products.has(brandName)){
       this.addBrand(brandName);
       Store.products.get(brandName)[categoryName]=[];
    }
    if(!Store.products.get(brandName)[categoryName]){
        Store.products.get(brandName)[categoryName]=[];
    }
    return Store.products.get(brandName)
}

addProduct(brand,category,productObj){
    // This method will add Product details.
    let obj=productObj;
    if(typeof obj.productTitle!=='string'||typeof obj.price!=='number'||obj.productTitle.length===0||obj.price<=0){
        return {success:false,reason:`Product can't be uploaded because vital details of the product are missing.`}
    }

    if(!Store.products.has(brand)){
        this.addBrand(brand);
        this.addCategory(brand,category);
    }
    if(!Store.products.get(brand)[category]){
        this.addCategory(brand,category);
    }

    for(let i of Store.products.get(brand)[category]){
        if(i.productTitle===obj.productTitle&&i.variant===obj.variant){
           i.stock+=obj.stock;
           return i;
        }
        
    }
    
    Store.products.get(brand)[category].push(productObj)
    
    return Store.products.get(brand)[category]
}

removeProduct(brand,category,productTitle,variant,qty=null){
    // This will remove products that are discontinued and also this will update the Stock.
    
    let update={action:"", product:[]}
    if(Store.products.has(brand)&&category in Store.products.get(brand)){
        for(let i=Store.products.get(brand)[category].length-1;i>=0;i--){
            let pro=Store.products.get(brand)[category][i]
        if(pro.productTitle===productTitle&&pro.variant===variant&&qty===null){

            Store.products.get(brand)[category].splice(i,1)
            update.action="Discontinued";
            update.product.push({Title:productTitle,Variant:variant})
        }
        if(qty===0){
                update.action="Out of Stock";
                update.product.push(`Product is out of stock we will notify you once we update it...`);
            }
        if(pro.productTitle===productTitle&&pro.variant===variant&&qty!==0){
            pro.stock=qty;
            update.action="Updated";
            update.product.push({Title:productTitle,Variant:variant,Updated_Quantity:qty})
            }
        }
    }
    return update;
    
    
}

showProduct(brand){
    // This method will show the products a brand contains.
    if(Store.products.has(brand)){
        return Store.products.get(brand)
    }
}
}

class User{
    constructor(){
        this.cart=[];    
    }
    
    storeBrowse(category){
        // This method will enable user to get all the product options in a particular category.
        let result=[];
        for(let [_,categories] of Store.products){
            if(categories[category]){
               result.push(categories[category]);
            }
        }
        
        if(result.length===0){
            return `No result found`
        }else{
            return result;
        }
    }

    viewAllBrands(){
        // This method will enable user to see the available brands on the platform
        let keys=[];
        for(let [key,_] of Store.products){
           keys.push(key);   
        }
        return keys
    }

    browseBrand(brandName){
        // This method will help the user to explore different categories of a brand availble on the platform.
        let sku=Store.products.get(brandName);

        if(sku===undefined){
            return `Brand is not found`;
        }else{
            return {
                brand: brandName,
                availableCategories:Object.keys(sku),
                catalog:sku
            };
        }
    
    }

    addToCart(category,str,variant,quantity=1){
        // This is the add To Cart feature of e commerce websites.
        
        let coco=this.storeBrowse(category)//First the user will randomly search any product category for e.g:- Mobile Phones, then the website will show all the available options to the user.
        
        for(let i of coco){
           for(let j of i){
            if(j.productTitle===str&&j.variant===variant){
               
               this.cart.push({title:j.productTitle,model:variant,qty:quantity,Price:j.price})                                 
              }
           }
        }
    return this.cart;     
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

s1.addBrand("apple")

s1.addCategory("apple","Mobile Phones")
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro 256 GB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Cosmic Orange",variant:"256 GB",price:134900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro 256 GB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Silver",variant:"256 GB",price:134900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro 256 GB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Deep Blue",variant:"256 GB",price:134900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro 512 GB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Cosmic Orange",variant:"512 GB",price:154900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro 512 GB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Silver",variant:"512 GB",price:154900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro 512 GB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Deep Blue",variant:"512 GB",price:154900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro 1 TB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Cosmic Orange",variant:"1 TB",price:174900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro 1 TB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Silver",variant:"1 TB",price:174900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro 1 TB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Deep Blue",variant:"1 TB",price:174900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro Max 256 GB: 17.42 cm (6.9″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Cosmic Orange",variant:"256 GB",price:149900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro Max 256 GB: 17.42 cm (6.9″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Silver",variant:"256 GB",price:149900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro Max 256 GB: 17.42 cm (6.9″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Deep Blue",variant:"256 GB",price:149900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro Max 512 GB: 17.42 cm (6.9″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Cosmic Orange",variant:"512 GB",price:169900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro Max 512 GB: 17.42 cm (6.9″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Silver",variant:"512 GB",price:169900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro Max 512 GB: 17.42 cm (6.9″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Deep Blue",variant:"512 GB",price:169900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro Max 1 TB: 17.42 cm (6.9″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Cosmic Orange",variant:"1 TB",price:189900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro Max 1 TB: 17.42 cm (6.9″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Silver",variant:"1 TB",price:189900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro Max 1 TB: 17.42 cm (6.9″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Deep Blue",variant:"1 TB",price:189900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro Max 2 TB: 17.42 cm (6.9″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Cosmic Orange",variant:"2 TB",price:229900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro Max 2 TB: 17.42 cm (6.9″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Silver",variant:"2 TB",price:229900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 Pro Max 2 TB: 17.42 cm (6.9″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Deep Blue",variant:"2 TB",price:229900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone Air 256 GB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Sky Blue",variant:"256 GB",price:119900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone Air 256 GB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Light Gold",variant:"256 GB",price:119900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone Air 256 GB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Cloud White",variant:"256 GB",price:119900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone Air 256 GB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Space Black",variant:"256 GB",price:119900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone Air 512 GB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Sky Blue",variant:"512 GB",price:139900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone Air 512 GB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Light Gold",variant:"512 GB",price:139900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone Air 512 GB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Cloud White",variant:"512 GB",price:139900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone Air 512 GB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Space Black",variant:"512 GB",price:139900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone Air 1 TB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Sky Blue",variant:"1 TB",price:159900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone Air 1 TB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Light Gold",variant:"1 TB",price:159900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone Air 1 TB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Cloud White",variant:"1 TB",price:159900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone Air 1 TB: Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz, Powerful A19 Pro Chip, Center Stage Front Camera, All-Day Battery Life; Space Black",variant:"1 TB",price:159900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 256 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Sage",variant:"256 GB",price:82900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 256 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Lavender",variant:"256 GB",price:82900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 256 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Mist Blue",variant:"256 GB",price:82900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 256 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; White",variant:"256 GB",price:82900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 256 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Black",variant:"256 GB",price:82900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 512 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Sage",variant:"512 GB",price:102900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 512 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Lavender",variant:"512 GB",price:102900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 512 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Mist Blue",variant:"512 GB",price:102900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 512 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; White",variant:"512 GB",price:102900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Mobile Phones",{productTitle:"iPhone 17 512 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Black",variant:"512 GB",price:102900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});

s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 128GB, Wi-Fi 6E + 5G Cellular, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Space Grey",variant:"128 GB, Wi-Fi",price:48990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 128GB, Wi-Fi 6E + 5G Cellular, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Blue",variant:"128 GB, Wi-Fi",price:48990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 128GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Purple",variant:"128 GB, Wi-Fi",price:48990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 128GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Starlight",variant:"128 GB, Wi-Fi",price:48990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 128GB, Wi-Fi 6E + 5G Cellular, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Space Grey",variant:"128 GB, Wi-Fi + Cellular",price:64900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 128GB, Wi-Fi 6E + 5G Cellular, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Blue",variant:"128 GB, Wi-Fi + Cellular",price:64900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 128GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Purple",variant:"128 GB, Wi-Fi + Cellular",price:64900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 128GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Starlight",variant:"128 GB, Wi-Fi + Cellular",price:64900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 256GB, Wi-Fi 6E + 5G Cellular, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Space Grey",variant:"256GB, Wi-Fi",price:59900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 256GB, Wi-Fi 6E + 5G Cellular, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Blue",variant:"256GB, Wi-Fi",price:59900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 256GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Purple",variant:"256GB, Wi-Fi",price:59900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 256GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Starlight",variant:"256GB, Wi-Fi",price:59900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 256GB, Wi-Fi 6E + 5G Cellular, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Space Grey",variant:"256GB, Wi-Fi + Cellular",price:74900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 256GB, Wi-Fi 6E + 5G Cellular, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Blue",variant:"256GB, Wi-Fi + Cellular",price:74900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 256GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Purple",variant:"256GB, Wi-Fi + Cellular",price:74900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 256GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Starlight",variant:"256GB, Wi-Fi + Cellular",price:74900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 512GB, Wi-Fi 6E + 5G Cellular, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Space Grey",variant:"512GB, Wi-Fi",price:79900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 512GB, Wi-Fi 6E + 5G Cellular, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Blue",variant:"512GB, Wi-Fi",price:79900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 512GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Purple",variant:"512GB, Wi-Fi",price:79900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 512GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Starlight",variant:"512GB, Wi-Fi",price:79900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 512GB, Wi-Fi 6E + 5G Cellular, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Space Grey",variant:"512GB, Wi-Fi + Cellular",price:94900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 512GB, Wi-Fi 6E + 5G Cellular, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Blue",variant:"512GB, Wi-Fi + Cellular",price:94900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 512GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Purple",variant:"512GB, Wi-Fi + Cellular",price:94900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Mini (A17 Pro): Apple Intelligence, 21.08 cm (8.3″) Liquid Retina Display, 512GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Starlight",variant:"512GB, Wi-Fi + Cellular",price:94900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});

s1.addProduct("apple","Tablets",{productTitle:"Apple iPad (10th Generation): with A14 Bionic chip, 27.69 cm (10.9″) Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Blue",variant:"128 GB, Wi-Fi",price:64900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad (10th Generation): with A14 Bionic chip, 27.69 cm (10.9″) Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Pink",variant:"128 GB, Wi-Fi",price:64900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad (10th Generation): with A14 Bionic chip, 27.69 cm (10.9″) Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Silver",variant:"128 GB, Wi-Fi",price:64900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad (10th Generation): with A14 Bionic chip, 27.69 cm (10.9″) Liquid Retina Display, 256GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Yellow",variant:"128 GB, Wi-Fi",price:64900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad (10th Generation): with A14 Bionic chip, 27.69 cm (10.9″) Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Blue",variant:"128 GB, Wi-Fi + Cellular",price:74900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad (10th Generation): with A14 Bionic chip, 27.69 cm (10.9″) Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Pink",variant:"128 GB, Wi-Fi + Cellular",price:74900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad (10th Generation): with A14 Bionic chip, 27.69 cm (10.9″) Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Silver",variant:"128 GB, Wi-Fi + Cellular",price:74900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad (10th Generation): with A14 Bionic chip, 27.69 cm (10.9″) Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Yellow",variant:"128 GB, Wi-Fi + Cellular",price:74900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});

s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 128GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Starlight",variant:"128 GB, Wi-Fi",price:48900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 128GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Space Gray",variant:"128 GB, Wi-Fi",price:48900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 128GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Purple",variant:"128 GB, Wi-Fi",price:48900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 128GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Blue",variant:"128 GB, Wi-Fi",price:48900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 128GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Starlight",variant:"128 GB, Wi-Fi + Cellular",price:59900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 128GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Space Gray",variant:"128 GB, Wi-Fi + Cellular",price:59900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 128GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Purple",variant:"128 GB, Wi-Fi + Cellular",price:59900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 128GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Blue",variant:"128 GB, Wi-Fi + Cellular",price:59900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 256GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Starlight",variant:"256GB, Wi-Fi",price:64900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 256GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Space Gray",variant:"256GB, Wi-Fi",price:64900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 256GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Purple",variant:"256GB, Wi-Fi",price:64900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 256GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Blue",variant:"256GB, Wi-Fi",price:64900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 256GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Starlight",variant:"256GB, Wi-Fi + Cellular",price:66900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 256GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Space Gray",variant:"256GB, Wi-Fi + Cellular",price:66900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 256GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Purple",variant:"256GB, Wi-Fi + Cellular",price:66900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 256GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Blue",variant:"256GB, Wi-Fi + Cellular",price:66900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 512GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Starlight",variant:"512GB, Wi-Fi",price:79900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 512GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Space Gray",variant:"512GB, Wi-Fi",price:79900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 512GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Purple",variant:"512GB, Wi-Fi",price:79900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 512GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Blue",variant:"512GB, Wi-Fi",price:79900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 512GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Starlight",variant:"512GB, Wi-Fi + Cellular",price:82900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 512GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Space Gray",variant:"512GB, Wi-Fi + Cellular",price:82900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 512GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Purple",variant:"512GB, Wi-Fi + Cellular",price:82900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 512GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Blue",variant:"512GB, Wi-Fi + Cellular",price:82900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 1TB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Starlight",variant:"1TB, Wi-Fi",price:89900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 1TB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Space Gray",variant:"1TB, Wi-Fi",price:89900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 1TB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Purple",variant:"1TB, Wi-Fi",price:89900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 1TB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Blue",variant:"1TB, Wi-Fi",price:89900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 1TB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Starlight",variant:"1TB, Wi-Fi + Cellular",price:99000,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 1TB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Space Gray",variant:"1TB, Wi-Fi + Cellular",price:99000,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 1TB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Purple",variant:"1TB, Wi-Fi + Cellular",price:99000,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Air 11″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 1TB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Blue",variant:"1TB, Wi-Fi + Cellular",price:99000,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});

s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Pro 11″ (M4): Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera / 12MP Back Camera, LiDAR Scanner, Wi-Fi 6E, Face ID, All-Day Battery Life, Standard Glass — Silver",variant:"256GB, Wi-Fi",price:99900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Pro 11″ (M4): Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera / 12MP Back Camera, LiDAR Scanner, Wi-Fi 6E, Face ID, All-Day Battery Life, Standard Glass — Space Black",variant:"256GB, Wi-Fi",price:99900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Pro 13″ (M4): Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera / 12MP Back Camera, LiDAR Scanner, Wi-Fi 6E, Face ID, All-Day Battery Life, Standard Glass — Silver",variant:"256GB, Wi-Fi",price:99900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Pro 13″ (M4): Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera / 12MP Back Camera, LiDAR Scanner, Wi-Fi 6E, Face ID, All-Day Battery Life, Standard Glass — Space Black",variant:"256GB, Wi-Fi",price:99900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Pro 11″ (M4): Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera / 12MP Back Camera, LiDAR Scanner, Wi-Fi 6E, Face ID, All-Day Battery Life, Standard Glass — Silver",variant:"256GB, Wi-Fi",price:99900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Pro 11″ (M4): Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera / 12MP Back Camera, LiDAR Scanner, Wi-Fi 6E, Face ID, All-Day Battery Life, Standard Glass — Space Black",variant:"256GB, Wi-Fi",price:99900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Pro 13″ (M4): Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera / 12MP Back Camera, LiDAR Scanner, Wi-Fi 6E, Face ID, All-Day Battery Life, Standard Glass — Silver",variant:"256GB, Wi-Fi",price:99900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Tablets",{productTitle:"Apple iPad Pro 13″ (M4): Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera / 12MP Back Camera, LiDAR Scanner, Wi-Fi 6E, Face ID, All-Day Battery Life, Standard Glass — Space Black",variant:"256GB, Wi-Fi",price:99900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});

s1.addProduct("apple","Smart Watches",{productTitle:"Apple Watch Series 11 GPS 46mm Jet Black Aluminium Case with Black Sport Band - M/L",variant:"64GB",price:49399,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Smart Watches",{productTitle:"Apple Watch Series 11 GPS 46mm Rose Gold Aluminium Case with Light Blush Sport Band - M/L",variant:"64GB",price:49900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Smart Watches",{productTitle:"Apple Watch Series 11 GPS 46mm Silver Aluminium Case with Purple Fog Sport Band - M/L",variant:"64GB",price:49399,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Smart Watches",{productTitle:"Apple Watch Series 11 GPS 46mm Space Grey Aluminium Case with Black Sport Band - M/L",variant:"64GB",price:49399,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Smart Watches",{productTitle:"Apple Watch Series 11 GPS + Cellular 42mm Rose Gold Aluminium Case with Light Blush Sport Band - S/M",variant:"64GB",price:56900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});

s1.addProduct("apple","Laptops",{productTitle:"Apple 2024 MacBook Pro Laptop with M4 chip with 10‑core CPU and 10‑core GPU: Built for Apple Intelligence, (14.2″) Liquid Retina XDR Display, 16GB Unified Memory, 512GB SSD Storage; Space Black",variant:"M4",price:162990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Laptops",{productTitle:"Apple 2024 MacBook Pro Laptop with M4 chip with 10‑core CPU and 10‑core GPU: Built for Apple Intelligence, (14.2″) Liquid Retina XDR Display, 16GB Unified Memory, 512GB SSD Storage; Space Black",variant:"M4 Pro",price:162990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Laptops",{productTitle:"Apple 2024 MacBook Pro Laptop with M4 chip with 10‑core CPU and 10‑core GPU: Built for Apple Intelligence, (14.2″) Liquid Retina XDR Display, 16GB Unified Memory, 512GB SSD Storage; Space Black",variant:"M4 Max",price:162990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Laptops",{productTitle:"Apple 2024 MacBook Pro Laptop with M4 chip with 10‑core CPU and 10‑core GPU: Built for Apple Intelligence, (16″) Liquid Retina XDR Display, 16GB Unified Memory, 512GB SSD Storage; Space Black",variant:"M4 Pro",price:249000,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","Laptops",{productTitle:"Apple 2024 MacBook Pro Laptop with M4 chip with 10‑core CPU and 10‑core GPU: Built for Apple Intelligence, (16″) Liquid Retina XDR Display, 16GB Unified Memory, 512GB SSD Storage; Space Black",variant:"M4 Max",price:249000,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});

s1.addProduct("apple","EarBuds and headphones",{productTitle:"Apple AirPods Pro 3 Wireless Earbuds, Active Noise Cancellation, Live Translation, Heart Rate Sensing, Bluetooth Headphones, Spatial Audio, High-Fidelity Sound, USB-C Charging",variant:"Pro 3",price:25900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","EarBuds and headphones",{productTitle:"Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones, with Active Noise Cancellation, Adaptive Audio, Transparency Mode, Personalised Spatial Audio, USB-C Charging Case, Wireless Charging, H2 Chip",variant:"AirPods 4",price:12900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","EarBuds and headphones",{productTitle:"Apple AirPods Max Wireless Over-Ear Headphones, Pro-Level Active Noise Cancellation, Transparency Mode, Personalised Spatial Audio, USB-C Charging, Bluetooth Headphones for iPhone - Blue",variant:"AirPods Max",price:59900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","EarBuds and headphones",{productTitle:"Apple AirPods Max Wireless Over-Ear Headphones, Pro-Level Active Noise Cancellation, Transparency Mode, Personalised Spatial Audio, USB-C Charging, Bluetooth Headphones for iPhone - Midnight",variant:"AirPods Max",price:59900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("apple","EarBuds and headphones",{productTitle:"Apple AirPods Max Wireless Over-Ear Headphones, Pro-Level Active Noise Cancellation, Transparency Mode, Personalised Spatial Audio, USB-C Charging, Bluetooth Headphones for iPhone - Orange",variant:"AirPods Max",price:59900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});

s1.addProduct("SONY","TVs",{productTitle:"Sony Bravia 139 cm (55 inches) 4K Ultra HD Smart LED Google TV KD-55X75L (Black)",variant:"Google TV",price:59990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","TVs",{productTitle:"Sony 139 cm (55 inches) BRAVIA 7 4K Ultra HD AI Smart Mini LED Google TV K-55XR70 (Black)-3 Years Warranty for Limited Period",variant:"XR TV",price:149990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","TVs",{productTitle:"Sony BRAVIA 8 Series 164 cm (65 inches) 4K Ultra HD AI Smart OLED Google TV K-65XR80 (Black)-3 Years Warranty for Limited Period",variant:"XR TV",price:258490,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","TVs",{productTitle:"Sony BRAVIA 9 Series 189 cm (75 inches) 4K Ultra HD AI Smart Mini LED Google TV K-75XR90 (Black)-3 Years Warranty for Limited Period",variant:"XR TV",price:384990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","TVs",{productTitle:"Sony 215 cm (85 inches) BRAVIA 5 Series 4K Ultra HD Smart Mini LED Google TV K-85XR55A-3 Years Warranty for Limited Period",variant:"XR TV",price:366990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});

s1.addProduct("SONY","EarBuds and headphones",{productTitle:"Sony WF-1000XM5 Active Noise Cancelling Wireless Bluetooth in Ear Earbuds with Mic, Up to 36 Hours Battery Life - Black",variant:"TWS",price:19499,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","EarBuds and headphones",{productTitle:"Sony WF-1000XM5 Best Active Noise Cancelling Wireless Bluetooth Earbuds with Mic, TWS, Up to 36 Hours Battery Life - Silver",variant:"TWS",price:19499,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","EarBuds and headphones",{productTitle:"Sony WF-1000XM5 Best Active Noise Cancelling Wireless Bluetooth in Ear Earbuds with Mic, TWS, Up to 36 Hours Battery, 360 Reality Audio- Smoky Pink",variant:"TWS",price:19990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","EarBuds and headphones",{productTitle:"Sony WH-1000XM5 Best Active Noise Cancelling Wireless Bluetooth Over Ear Headphones with Mic for Clear Calling,Battery Life 30 Hours -Black",variant:"Headphone",price:24790,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","EarBuds and headphones",{productTitle:"Sony WH-1000XM5 Best Active Noise Cancelling Wireless Bluetooth Over Ear Headphones with Mic for Clear Calling,Battery Life 30 Hours-Mid Night Blue",variant:"Headphone",price:24854,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});

s1.addProduct("SONY","Gaming",{productTitle:"Sony PlayStation5 Gaming Console (Slim)",variant:"Disc",price:49990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","Gaming",{productTitle:"Sony PlayStation®5 Digital Edition (slim) Console Video Game",variant:"Digital",price:44990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","Gaming",{productTitle:"PS5® Console Slim – NBA 2K26 Bundle",variant:"Disc",price:54490,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","Gaming",{productTitle:"Sony PS5 Console - Marvel’s Spider-Man 2 Limited Edition Bundle",variant:"Disc",price:54490,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","Gaming",{productTitle:"Sony PS5 Console - Ghost of Yoeti Limited Edition Bundle",variant:"Disc",price:54490,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});

s1.addProduct("SONY","Cameras",{productTitle:"Sony Alpha ILCE-7M4K Full-Frame Hybrid Camera 33MP Interchangeable-Lens Mirrorless Camera|28-70mm Digital Zoom|4K 60P Video Recording|Real-Time Eye AF+Rechargeable Battery(NP-FZ100) - Black",variant:"Full Frame Camera",price:196989,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","Cameras",{productTitle:"Sony Alpha ILCE-6700M APS-C Interchangeable-Lens Mirrorless Camera (Body + 18-135 mm Power Zoom Lens) | Made for Creators | 26.0 MP | Artificial Intelligence based Autofocus | 4K 60p Recording - Black",variant:"APS-C",price:145988,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","Cameras",{productTitle:"Sony Alpha ZV-E10 24.2 Mega Pixel Interchangeable-Lens Mirrorless vlog Camera, Made for Creators | APS-C Sensor |Advanced Autofocus | Clear Audio & 4K Movie Recording (Body Only) – Black",variant:"Vlogging Camera",price:49488,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","Cameras",{productTitle:"Sony Digital Camera ZV 1 for Content Creators (Compact, Video Eye AF, Flip Screen, in-Built Microphone, Bluetooth Shooting Grip, 4K Vlogging Camera for Content Creation) - Black",variant:"Compact Camera",price:59988,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","Cameras",{productTitle:"Sony Cinema Line FX30 with XLR Handle | Super 35 | 4K 120P | S-Cinetone | Dual Base ISO | Compact Camera for Filmmaking (‎ILME-FX30)",variant:"Compact Camera",price:59988,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});

s1.addProduct("SONY","Home Theatre",{productTitle:"Sony HT-A7000 A Series Premium Soundbar 7.1.2Ch 8K/4K 360 Spatial Sound Mapping for surround sound Home Theatre System with Dolby Atmos(Hi Res & 360 RA,BT,WiFi,Alexa,Spotify,HDMI eArc & Optical),Black",variant:"Soundbar",price:149990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","Home Theatre",{productTitle:"Sony Bravia Theatre Quad (HT-A9M2) Premium Soundbar System with 360 SSM, Wireless Multi Dimensional Surround Sound (IMAX, Dolby Atmos/DTSx,360 RA, Voice Zoom3, 8K/4K HDR), Grey",variant:"Home Theatre Systems",price:239990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","Home Theatre",{productTitle:"Sony BRAVIA Theatre Sub 7 Wireless Subwoofer – 100W deep bass Sound | Easy Set-up & Control | Compact | 2-Way Style | Matching Design with soundbars & Rear Speakers",variant:"AV Recievers",price:29990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","Home Theatre",{productTitle:"Sony SA-D40M2 All in One 4.1ch Home Theatre System with 100W Power Output and Powerful Subwoofer – Black",variant:"Home Theatre Speakers",price:13990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});
s1.addProduct("SONY","Home Theatre",{productTitle:"Sony SA-RS5 Wireless Rear Speakers with Built-in Battery for HT-A8000,HT-A9000 (Black)",variant:"Optional speakers",price:47990,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]});






let u1=new User;
console.log(u1.storeBrowse("TVs"));
console.log(u1.viewAllBrands());
console.log(u1.browseBrand("SONY"));
u1.addToCart("Mobile Phones","iPhone 17 512 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Black","512 GB",2)
u1.addToCart("Tablets","Apple iPad Pro 13″ (M4): Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera / 12MP Back Camera, LiDAR Scanner, Wi-Fi 6E, Face ID, All-Day Battery Life, Standard Glass — Space Black","256GB, Wi-Fi",2)
console.log(u1.cart);












// // Test code for mapping
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
//     }
//     if(!store.has(brandName)[categoryName]){
//         addCategory(brandName,categoryName);
//     }else{
//         store.get(brandName)[categoryName][productObj];
//     }
// }

// function browse(){
//     Store.products.forEach(i=>console.log(i))
    
// }
// addProduct("apple","iPhone",{productTitle:"iPhone 17 512 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Black",variant:"512 GB",price:102900,stock:30,productVisualization:["Image1","Image2","Image3","Video1"],features:[]})
// console.log(store);
// store.forEach(i=>console.log(i));



