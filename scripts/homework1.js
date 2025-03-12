// 1.	შექმენით ფუნქცია, რომელიც 1-დან 100-მდე რიცხვებში დაიანგარიშებს თუ რომელი რიცხვები 
// იყოფა 3-ზე უნაშთოდ, და იმ რიცხვების ადგილას რომლებიც იყოფა 3-ზე უნაშთოდ გამოიტანს, 
// Fizz, ასევე იგივე ფუნქციის მიხედვით გამოიანგარიშეთ თუ რიცხვი 5-ზე იყოფა უნაშთოდ და გამოიტანეთ Buzz, 
// ხოლო თუ რიცხვი იყოფა 3-ზეც და 5-ზეც უნაშთოდ გამოიტანეთ FizzBuzz.
// მაგ. 
// 1
//  2
// 3 Fizz
// 4
// 5 Buzz
// 6 Fizz
// 7
// 8
// 9 Fizz
// 10 Buzz
// 11
// 12 Fizz
// 13
// 14
// 15 FizzBuzz
// … 100-მდე.
function divisible3and5(x) {
    for (let i = 1; i <= x; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
          console.log("FizzBuzz");
        } else if (i % 5 == 0) {
          console.log("Buzz");
        } else if (i % 3 == 0 ) {
          console.log("Fizz");
        } else {
          console.log(i);
        }
    }
  }
  let x = 100;
  divisible3and5(x);

// 2.	შექმენით ფუნქცია,მაგ. სახელით: factorialCalculator(number), რომელიც დაიანგარიშებს და 
// ეკრანზე გამოიტანს მისთვის პარამეტრის სახით მიწოდებული რიცხვის ფაქტორიალს, მაგ. 5! => 2*3*4*5 = 120
 
function factorialCalculator(number) {
    let n = 1;
    for (let i = 2; i <= number; i++)
        n *= i;
    return n;
}

console.log(factorialCalculator(5));

 // 3.	შექმენით ფუნქცია, რომელიც სტრიქონის პირველ ასობგერის კაპიტალიზირებას მოახდენს მაგ. javascript => უნდა 
// გახდეს: Javascript, ანუ J დიდი ასობგერით უნდა ეწეროს.
function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  console.log(capitalize("javascript"))

// 4.	შექმენით ფუნქცია, რომელიც შეამოწმებს არის თუ არა მასზე მიწოდებული სტრიქონი ცარიელი. 
// მაგ. blankStringChecker(testString) => რომელიც 
// დააბრუნებს this string is blank-ს თუ ცარიელია/ this string is not blank-ს თუ ცარიელი არაა.

function blankStringChecker(testString) {
    if (testString === "") {
      return "this string is blank"
    } else {
      return "this string is not blank"
    }
  }
  
console.log(blankStringChecker("Hello"))

// 5.მოცემული მასივიდან
// let names = ['John', 'Nick', 'Bob', 'Mary', 'Bob', 'Sue', 'Ann', 'Bob', 'Bob']
// ამოიღეთ 'Bob' სახელი ყველგან სადაც ის შეგხვდებათ და დაბრუნეთ მასივი 
// 'Bob'-სახელის გარეშე. შედეგი ესეთი უნდა იყოს: ['John', 'Nick', 'Mary', 'Sue', 'Ann'] 
// შეასრულეთ ეს დავალება ციკლების მეშვეობით, ასევე კარგი იქნება თუ იგივე დავალებას ციკლური 
// ოპერაციების გამოყენების გარეშეც შეასრულებთ.

let names = ['John', 'Nick', 'Bob', 'Mary', 'Bob', 'Sue', 'Ann', 'Bob', 'Bob'];
let index = `Bob`;
for(let i = names.length - 1; i >= 0; i--) {
    if(names[i] === index) {
       names.splice(i, 1);
    }
}

console.log(names)
