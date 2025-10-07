function isEmpty(obj) {
  // ваш код...
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return false;
  }
  return true;
}

let schedule = {};

alert(isEmpty(schedule)); // true

schedule["8:30"] = "подъём";

alert(isEmpty(schedule)); // false
