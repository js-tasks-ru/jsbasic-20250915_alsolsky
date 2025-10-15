function getMinMax(str) {
  // ваш код...
    let newStr = ''
  for (let char of str) {
    if (char === ',' || char === '+' ) {
      char = ' '
    }
newStr += char
  }

  let numbers = newStr
    .split(' ').map((item) => parseFloat(item)).filter((item) => !isNaN(item)) // преобразуем каждый элемент в число 
      return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  }
}
