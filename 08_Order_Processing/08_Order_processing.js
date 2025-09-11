let Electronics=[
    {brandName:"Acer",
     Products:{
        TV:[{productTitle:"acer 109 cms (43 inch) Elevate (2024 Series) QLED TV Smart Google TV with Google OS | Dolby Atmos |AP43UG51QEVTD",
        variant:43+" inches",
        price:25999,
        productVisualization:["Image1","Image2","Image3","Video1"],
        Stock:10,
        features:["Dolby Digital Plus","Clarity-Next Level of Picture Perfection","178 -Maximize Your Viewpoint","2GB RAM","Ports-Effortless Connections","Smart Remote"]},
        {productTitle:"acer 127 cms (50 inch) Elevate (2024 Series) QLED TV Smart Google TV with Google OS | Dolby Atmos |AP43UG51QEVTD",
        variant:50+" inches",
        price:30999,
        productVisualization:["Image1","Image2","Image3","Video1"],
        Stock:10,
        features:["Dolby Digital Plus","Clarity-Next Level of Picture Perfection","178 -Maximize Your Viewpoint","2GB RAM","Ports-Effortless Connections","Smart Remote"]},
        {productTitle:"acer 139 cms (55 inch) Elevate (2024 Series) QLED TV Smart Google TV with Google OS | Dolby Atmos |AP43UG51QEVTD",
        variant:55+" inches",
        price:35799,
        productVisualization:["Image1","Image2","Image3","Video1"],
        Stock:10,
        features:["Dolby Digital Plus","Clarity-Next Level of Picture Perfection","178 -Maximize Your Viewpoint","2GB RAM","Ports-Effortless Connections","Smart Remote"]},
        {productTitle:"acer 164 cms (65 inch) Elevate (2024 Series) QLED TV Smart Google TV with Google OS | Dolby Atmos |AP43UG51QEVTD",
        variant:65+" inches",
        price:45999,
        productVisualization:["Image1","Image2","Image3","Video1"],
        Stock:10,
        features:["Dolby Digital Plus","Clarity-Next Level of Picture Perfection","178 -Maximize Your Viewpoint","2GB RAM","Ports-Effortless Connections","Smart Remote"]},
        ],
        Laptop:{
        Office_Laptop:[],
        Student_Laptop:[],
        Gaming_Laptop:[]
        }}

},

{brandName:"Xiaomi MI",
 Products:{
    TV:[
    {productTitle:"Xiaomi 108 cm (43 inches) X Series 4K LED Smart Google TV L43MA-AUIN (Black)",
     variant:"43 Inches",
     price:25000,
     productVisualization:["Image1","Image2","Image3","Video1"],
     Stock:10,
     features:["4k Ultra HD Dolby Vision Display","Bezel-less design","30W Cinamatic Speakers","Dolby audio","dtsX","PitchWall+"]   
    },
    {productTitle:"Xiaomi MI 125 cm (50 inches) X Series 4K LED Smart Google TV L50MA-AUIN (Black)",
     variant:"50 Inches",
     price:28999,
     productVisualization:["Image1","Image2","Image3","Video1"],
     Stock:10,
     features:["4k Ultra HD Dolby Vision Display","Bezel-less design","30W Cinamatic Speakers","Dolby audio","dtsX","PitchWall+"]   
    },
    {productTitle:"Xiaomi MI 138 cm (55 inches) X Series 4K LED Smart Google TV L55MA-AIN (Black)",
     variant:"55 Inches",
     price:36999,
     productVisualization:["Image1","Image2","Image3","Video1"],
     Stock:10,
     features:["4k Ultra HD Dolby Vision Display","Bezel-less design","30W Cinamatic Speakers","Dolby audio","dtsX","PitchWall+"]   
    },
    {productTitle:"Xiaomi MI 165 cm (65 inches) X Series 4K Ultra HD Smart Google LED TV L65M8-A2IN (Black)",
     variant:"65 Inches",
     price:45000,
     productVisualization:["Image1","Image2","Image3","Video12"],
     Stock:10,
     features:["4k Ultra HD Dolby Vision Display","Bezel-less design","30W Cinamatic Speakers","Dolby audio","dtsX","PitchWall+"]   
    }],

 }  
    
},
{brandName:"Philips",
   Products:{
    TV:[
    {productTitle:"Philips 109 cm (43 inches) 8100 Series 4K Ultra HD Smart QLED Google TV 43PQT8100/94",
     variant:"43 Inches",
     price:24999,
     productVisualization:["Image1","Image2","Image3","Video1"],
     Stock:10,
     features:["4k Ultra HD Dolby Vision Display","Bezel-less design","30W Cinamatic Speakers","Dolby audio","dtsX","PitchWall+"]   
    },
    {productTitle:"Philips 125 cm (50 inches) X Series 4K LED Smart Google TV L50MA-AUIN (Black)",
     variant:"50 Inches",
     price:28999,
     productVisualization:["Image1","Image2","Image3","Video1"],
     Stock:10,
     features:["4k Ultra HD Dolby Vision Display","Bezel-less design","30W Cinamatic Speakers","Dolby audio","dtsX","PitchWall+"]   
    },
    {productTitle:"Philips 138 cm (55 inches) X Series 4K LED Smart Google TV L55MA-AIN (Black)",
     variant:"55 Inches",
     price:36999,
     productVisualization:["Image1","Image2","Image3","Video1"],
     Stock:10,
     features:["4k Ultra HD Dolby Vision Display","Bezel-less design","30W Cinamatic Speakers","Dolby audio","dtsX","PitchWall+"]   
    },
    {productTitle:"Philips 165 cm (65 inches) X Series 4K Ultra HD Smart Google LED TV L65M8-A2IN (Black)",
     variant:"65 Inches",
     price:45000,
     productVisualization:["Image1","Image2","Image3","Video1"],
     Stock:10,
     features:["4k Ultra HD Dolby Vision Display","Bezel-less design","30W Cinamatic Speakers","Dolby audio","dtsX","PitchWall+"]   
    }],

   }
    
},


]   

let fashion=[]
let sports=[]
let home=[]
let accessories=[]



let onlineStore=[Electronics,fashion,sports,home,accessories]//Let's assume as if this is an online store.

function productAddition(catagory,bName,title,variante,pricee,productVis,quantity,featur,subCat){
   
   for(let a of onlineStore){
    let brandFound=false;
    if(a===catagory){
         for(let i of a){
        if(i.brandName===bName){
           i.Products[subCat].push({
            productTitle:title,
            variant:variante,
            price:pricee,
            productVisualization:productVis,
            Stock:quantity,
            features:featur
           });
           
           brandFound=true;
           break;
        }
    }
    if(!brandFound){
            catagory.push({
                brandName:bName,
                Products:{
                 [subCat]:[{
                 productTitle:title,
                 variant:variante,
                 price:pricee,
                 productVisualization:productVis,
                 Stock:quantity,
                 features:featur}    ]        
                },
                
            })
           
        }
    
    }
   }
   return catagory;
}

productAddition(fashion,"Levi's","501® Original Fit Men's Jeans","Black - Non Stretch",79.50,["Image1","Image2","Image3","Video1"],10,["Regular Through The Thigh","Sits At Your Waist","Straight Leg","Front rise: 11 1/4,Knee: 17 1/2,Leg opening: 16,Measurements based on size 32"],"Jeans");
console.log(fashion);

productAddition(sports,"Nike","Nike SB Chron 2 Canvas","Black/Black/Black",4495.00,["Image1","Image2","Image3","Video1"],10,["Canvas is flexible and breathable","Recycled materials are used to create the laces, linings and the Swoosh","Foam cushions every step"],"Shoes");
console.log(sports);

productAddition(home,"Milton","Pearl Casserole (Milton)","Ivory",440,["Image1","Image2","Image3","Video1"],10,["Insulated Casserole","Double walled inner stainless-steel & BPA free",],"Casserole");
console.log(home);

productAddition(accessories,"IKEA","Picture, The Starry Night, June 1889","118x78 cm (46 ½x30 ¾)",1990,["Image1","Image2","Image3","Video1"],10,["Motif created by Vincent Van Gogh."],"Picture(Art)");
console.log(accessories);

console.log(Electronics);



function search(str){
return new Promise((resolve,reject)=>{
setTimeout(()=>{
   let result=[];   
   for(let product of onlineStore){
      
      for(let pro of product){
         if(pro.Products[str]!==undefined){
         for(let proo of pro.Products[str]){
            
               result.push(proo);
            
         }
         }
      }
      
   }
   resolve(result)
   if(result.length===0){
      reject("Product not found")
   }
},500)
})

}


let searchedItem;

let productSearch=search("TV").then(n=>console.log(n)).catch(n=>console.log(n))



function addToCart(str){
   return search("TV").then(n=>{
      let cart=[];

      for(let i of n){
         if(i.productTitle===str){
            cart.push(i)
         }
      }
      return cart;
   })
}

addToCart("Xiaomi MI 165 cm (65 inches) X Series 4K Ultra HD Smart Google LED TV L65M8-A2IN (Black)").then(n=>console.log("Your Cart:",n)).catch(n=>console.log(n))





