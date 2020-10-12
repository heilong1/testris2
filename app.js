let tetris = document.createElement('div')
tetris.classList.add('tetris')

for (let i = 0; i<181; i++) {
  let excel = document.createElement('div')
  excel.classList.add('excel')
  tetris.appendChild(excel)
}

let main = document.querySelector('.main')
main.appendChild(tetris)

console.log(main);