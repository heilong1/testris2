let tetris = document.createElement('div')
tetris.classList.add('tetris')

for (let i = 0; i<181; i++) {
  let excel = document.createElement('div')
  excel.classList.add('excel')
  tetris.appendChild(excel)
}

let main = document.querySelector('.main')
main.appendChild(tetris)

let excel = document.querySelectorAll('.excel')

let i = 0

for (let y=18; y>0; y--) {
  for (let x=1; x<11; x++) {
    excel[i].setAttribute('posX', x)
    excel[i].setAttribute('posY', y)
    i++
  }
}

let x = 5, y = 10

let mArr = [
  [ // 
    [0,1],
    [0,2],
    [0,3],
    'stick1'
  ],
  [ // 
    [1,0],
    [0,1],
    [1,1],
    'square2'
  ],
  [ // 
    [1,0],
    [0,1],
    [0,2],
    'Lthing3'
  ],
  [ // 
    [1,0],
    [1,1],
    [1,2],
    'lbackw4'
  ],
  [ // 
    [0,1],
    [1,1],
    [1,2],
    'Zthing5'
  ],
  [ // 
    [1,0],
    [1,1],
    [2,1],
    'Zbackw6'
  ],
  [ // 
    [1,0],
    [2,0],
    [1,1],
    'Pyra7'
  ],
]

let curFig = 0
let figMage = []

function creFig() {
  const randomX = (min, max) => {
    return Math.trunc(Math.random() * (max - min + 1) + min);
  };

  curFig = mArr[randomX(0,6)] 
  figMage = [
    document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
    document.querySelector(`[posX = "${x+curFig[0][0]}"][posY = "${y+curFig[0][1]}"]`),
    document.querySelector(`[posX = "${x+curFig[1][0]}"][posY = "${y+curFig[1][1]}"]`),
    document.querySelector(`[posX = "${x+curFig[2][0]}"][posY = "${y+curFig[2][1]}"]`),
  ]

  figMage.map(nod => {
    nod.classList.add('figure')
  })

  console.log(curFig);
}

function recreator() {
  figMage.map(nod => {
    nod.classList.remove('figure')
  })

  creFig()
}

/*
нормальный проверенный генератель
const randomX = (min, max) => Math.trunc(Math.random() * (max - min + 1) + min)
};





*/