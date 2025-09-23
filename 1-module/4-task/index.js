function checkSpam(str) {
  // ваш код...
  let lowString = str.toLowerCase();
  return lowString.includes('1xbet') || lowString.includes('xxx');  
}
checkSpam('1XbeT now'); // true
checkSpam('free xxxxx'); // true
checkSpam('innocent rabbit'); // false


console.log(checkSpam('1XbeT now')); // true
console.log(checkSpam('free xxxxx')); // true
console.log(checkSpam('innocent rabbit')); // false 
