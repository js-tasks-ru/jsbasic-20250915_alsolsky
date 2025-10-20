

function highlight(table) {
  // ваш код...
  for (let row of table.rows) {
    let sta = row.cells[3].dataset.available;
    if (sta === 'true') {
      row.classList.add('available');

    } else if (sta === 'false') {
      row.classList.add('unavailable');

    } else {
      row.hidden = true;
    }

      let gen = row.cells[2].innerText;
    if (gen === 'm') {
      row.classList.add('male');
    } else if (gen === 'f') {
      row.classList.add('female');
    }
   
    let age = row.cells[1].innerText;
    if (age < 18) {
      row.style.textDecoration = 'line-through';
    } 

  }


}

