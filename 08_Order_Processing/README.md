🛒 Online Store Simulation – From Functions to OOP

📌 Intro:- A JavaScript simulation of an online store where users can add brands, categories, and products — with features for updating stock, removing products, and simulating checkout.

This project demonstrates the evolution of an online store simulation in JavaScript:

1. A functional version using arrays and objects.

2. An improved OOP version using classes and Maps for better scalability and reusability.

📌 Features
✅ Common to Both Versions

- Categories → Brands → Products hierarchy.

- Add new brands, categories, and products.

- Product management (add, update, remove).

- Stock updates when duplicate products are added.

- Product visualization (images, videos).

- Features list for each product.

- Show current products by brand.

🧪 Procedural Version (Pre-OOP)

- Built using nested objects and arrays.

- Functions like productAddition, search, addToCart, showCart, checkOutPrice.

- Async Promises simulate real API delays (search, checkout).

- Limitation: Harder to scale as features grew (more duplicate code, less modular).

Example:

```showCart([{category:"TV", str:"Philips 65in...", qty:1}]);```
```checkOutPrice([{category:"TV", str:"Philips 65in...", qty:1}])```
```.then(total => console.log("Total Cost:", total));```

🧑‍💻 OOP Version (Current)

Refactored into classes for cleaner design:

Store Class

- addBrand(brandName) → Adds a new brand.

- addCategory(brand, category) → Adds a category under a brand.

- addProduct(brand, category, productObj) → Adds/updates product with validation.

- removeProduct(brand, category, productTitle, variant, qty) → Removes or updates stock.

- showProduct(brand) → Displays all products for a brand.

Example Usage:

let s1 = new Store();
s1.addBrand("Motorolla");
s1.addCategory("Motorolla", "Mobile Phones");
s1.addProduct("Motorolla", "Mobile Phones", {
  productTitle:"Motorola Moto G85 5G",
  variant:"128GB, Cobalt Blue",
  price:15949,
  stock:10,
  productVisualization:["Image1","Image2","Video1"],
  features:[]
});
console.log(s1.showProduct("Motorolla"));

📚 Learnings

- Procedural Approach: Good for small demos but quickly messy with more logic.

- OOP Approach: Cleaner, scalable, easier to maintain.

- Using Map + nested objects provides fast lookups and structured data.

- Validations prevent incorrect product entries.

🔜 Next Steps

- Add a Cart class for checkout/total cost.

- Add Order class to simulate order placement.

- Include seller types (first-party, third-party).

- Persist data with a database (MongoDB/Postgres).

👉 This README shows both stages of the project: how the store was first built procedurally and then refactored into an OOP design.