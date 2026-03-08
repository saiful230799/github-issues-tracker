<!-- answer to the questions 01 -->
১. var, let, এবং const এর মধ্যে পার্থক্য

JavaScript এ var, let, এবং const ব্যবহার করা হয় variable declare করার জন্য, কিন্তু এদের কাজের ধরন ভিন্ন।

var

এটি JavaScript এর পুরোনো variable declaration পদ্ধতি।

এটি function scoped।

একই variable আবার declare এবং update করা যায়।

let

এটি ES6 এ এসেছে।

এটি block scoped ({ } এর ভিতরে কাজ করে)।

একই variable আবার declare করা যায় না, কিন্তু value update করা যায়।

const

এটিও ES6 এ এসেছে।

এটি block scoped।

declare করার পর এর value পরিবর্তন করা যায় না।

উদাহরণ:

var a = 10;
let b = 20;
const c = 30;

b = 25; // করা যাবে
c = 40; // error হবে

<!-- answer to the questions 02 -->
২. Spread Operator (...) ব্যবহার করা হয় array বা object এর element গুলোকে আলাদা করে ছড়িয়ে দেওয়ার জন্য।

উদাহরণ (Array):

const arr1 = [1,2,3];
const arr2 = [...arr1,4,5];

console.log(arr2);
// Output: [1,2,3,4,5]

উদাহরণ (Object):

const user = {name: "Saiful", age: 26};
const newUser = {...user, city: "Dhaka"};

<!-- answer to the questions 03 -->
৩. map(), filter(), এবং forEach()
এগুলো JavaScript এর array method।

map()

array এর প্রতিটি element পরিবর্তন করে নতুন array তৈরি করে।

filter()

condition অনুযায়ী কিছু element নিয়ে নতুন array তৈরি করে।

forEach()

array এর প্রতিটি element এর উপর loop চালায় কিন্তু নতুন array return করে না।

উদাহরণ:

const numbers = [1,2,3,4];

numbers.map(n => n * 2);
// [2,4,6,8]

numbers.filter(n => n > 2);
// [3,4]

numbers.forEach(n => console.log(n));
// শুধু print করবে

<!-- answer to the questions 04 -->
৪. Arrow Function হলো JavaScript এ function লেখার একটি সংক্ষিপ্ত এবং আধুনিক পদ্ধতি, যা ES6 এ এসেছে।

উদাহরণ:

// সাধারণ function
function add(a,b){
  return a + b;
}

// arrow function
const add = (a,b) => a + b;

Arrow function ব্যবহার করলে code ছোট এবং সহজে পড়া যায়।

<!-- answer to the questions 05 -->
৫.Template Literals হলো string লেখার আধুনিক পদ্ধতি যেখানে backtick (``) ব্যবহার করা হয় এবং সহজে variable string এর মধ্যে বসানো যায়।

উদাহরণ:

const name = "Saiful";
const age = 26;

const text = `আমার নাম ${name} এবং আমার বয়স ${age} বছর।`;

console.log(text);

এখানে ${} ব্যবহার করে variable string এর ভিতরে বসানো হয়েছে।