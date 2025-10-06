function sumSalary(salaries) {
  // ваш код...
  let sum = 0;
  for (let key in salaries) {
    let p = salaries[key];

    if (typeof p !== "number") {
      p = 0;
    }
    if (isNaN(p) || p == "Infinity" || p == "-Infinity") {
      p = 0;
    }
    sum += p;
  }
  return sum;
}
