let userMap=new Map();

userMap.set('name','Rishabh');
userMap.set('age',27);
console.log(userMap.get('name'));
console.log(userMap.has('name'));
console.log(userMap.delete('age'));
console.log(userMap.size);

for(let [key, value] of userMap){
    console.log(key, value);    
}



userMap.set({},"value1")
userMap.set({},"value2")

userMap.set("name","Sam")
userMap.set("name","Samm")
userMap.set("age")

console.log(userMap.get({}));





// Answer 16:- What i think is that objects are saved as a non-primitive or reference type variables as a result even if there are 2 identical object keys their memory addresses would be different as a result we will see both the object keys in it.
// Answer 17:- If the key is not defined or set in the Map object then it will be undefined and same goes for value of the key.
// Answer 18:- Undefined.
// Answer 19:- I have not studied WeakMap so i cannot say anything about it.
// Answer 20:- When we want to make a sclable and encapsulated environmnt because it is secured and cannot be easily modifiable.


// Answer 1:-
let logUser=new Map();

logUser.set("name","Rishabh");
logUser.set("age",24);

console.log(logUser.get('name'));//Rishabh

// Answer 2:-
logUser.set('city','Chandigarh');
console.log(logUser.has('age'));//true

// Answer 3:-
logUser.delete('age')
for(let [a,b] of logUser){
    console.log(a,b);//name Rishabh //city Chandigarh
    
}

// Answer 4:-
let obj1={id:1};
let obj2={id:2};

logUser.set(obj1,"Object One")
logUser.set(obj2,"Object Two")

console.log(logUser.get(obj1));//Object One

// Answer 5:-
for(let [a,b] of logUser){
    console.log(typeof a==="object"? JSON.stringify(a):a,b); //name Rishabh
// city Chandigarh
// { id: 1 } Object One
// { id: 2 } Object Two

    
}

// Answer 6:-
let studentsScore=new Map();

studentsScore.set('Alice',85);
studentsScore.set('Bob',92);
studentsScore.set('Charlie',78);

console.log(studentsScore.keys());//[Map Iterator] { 'Alice', 'Bob', 'Charlie' }

// Answer 7:-
studentsScore.set('David',90);
console.log(studentsScore.has('Eve'));//false

// Answer 8:-
studentsScore.set('Charlie',88);
studentsScore.forEach((i,j)=>console.log(i,j)) 
//85 Alice
// 92 Bob
// 88 Charlie
// 90 David

// Answer 9:-
const users = [
  {id: 1, name: "Alice"},
  {id: 2, name: "Bob"},
];

studentsScore.set(users[0].id,users[0]);
studentsScore.set(users[1].id,users[1]);

console.log(studentsScore.get(users[1].id));//{id: 2, name: 'Bob'}

// Answer 10:-
studentsScore.forEach((i,j)=>console.log("ID:" +i,"Name: "+j))
// ID:85 Name: Alice
// ID:92 Name: Bob
// ID:88 Name: Charlie
// ID:90 Name: David
// ID:[object Object] Name: 1
// ID:[object Object] Name: 2


// Answer 11:-
let proPrice=new Map();

proPrice.set("Apple",50);
proPrice.set("Banana",20);
proPrice.set("Mango",30);

proPrice.forEach((key,value)=>{if(key>25)console.log(key,value)})
// 50 Apple
// 30 Mango 

// Answer 12:-
let obj10={name:'Rishabh'};
let obj20={name:'Alice'};

let nameObj=new Map();
nameObj.set(obj10,'Object1');
nameObj.set(obj20,'Object2');

nameObj.set(obj10,'Object10');

console.log(nameObj);
// Map(2) {
//   { name: 'Rishabh' } => 'Object10',
//   { name: 'Alice' } => 'Object2'
// }

console.log(nameObj.get(obj10));//Object10

// Answer 13:-
for(let [key,value] of nameObj){
    console.log([key,value]);
// [ { name: 'Rishabh' }, 'Object10' ]
// [ { name: 'Alice' }, 'Object2' ]
}

// Answer 14:-
const scores = new Map([
  ["Alice", 85],
  ["Bob", 92],
  ["Charlie", 78]
]);
console.log(scores);

scores.forEach((key,value)=>{key+=5; console.log(key,value)})
// 90 Alice
// 97 Bob
// 83 Charlie

// Answer 15:-
const users0 = [
  {id: 1, name: "Alice"},
  {id: 2, name: "Bob"},
  {id: 3, name: "Charlie"}
];

let user0Map=new Map();

user0Map.set(users0[0].id,users0[0].name);
user0Map.set(users0[1].id,users0[1].name);
user0Map.set(users0[2].id,users0[2].name);

console.log(user0Map.get(users0[2].id));//Charlie


// user0Map.set(users0[2].id,users0[2].name); in this statement users0[2].id is key and users0[2].name is value ??

// Answer 16:-
const countries = new Map([
  ["India", 140],
  ["USA", 33],
  ["Japan", 12],
  ["China", 142]
]);
countries.forEach((value,key)=>console.log(value,key))

