let main = document.querySelector(".main");

// Создание доски
function creTable() {
  let tetris = document.createElement("div");
  tetris.classList.add("tetris");

  for (let i = 0; i < 181; i++) {
    let nexcel = document.createElement("div");
    nexcel.classList.add("excel");
    tetris.appendChild(nexcel);
  }

  main.appendChild(tetris);

  let excel = document.querySelectorAll(".excel");

  let i = 0;

  for (let y = 18; y > 0; y--) {
    for (let x = 1; x < 11; x++) {
      excel[i].setAttribute("posX", x);
      excel[i].setAttribute("posY", y);
      i++;
    }
  }
}

// Пачка узлов, являющая фигуру
let figMage = [];
// Точка респа фигур
let x = 5,
  y = 15;
// Для дорисовки фигур
let mArr = [
  [
    [0, 1],
    [0, 2],
    [0, 3],
    "stick1",
    [
      // 90гр
      [-1, 1],
      [0, 0],
      [1, -1],
      [2, -2],
    ],
    [
      // 180гр
      [1, -1],
      [0, 0],
      [-1, 1],
      [-2, 2],
    ],
    [
      // 270гр
      [-1, 1],
      [0, 0],
      [1, -1],
      [2, -2],
    ],
    [
      // 360гр
      [1, -1],
      [0, 0],
      [-1, 1],
      [-2, 2],
    ],
  ],
  [
    [1, 0],
    [0, 1],
    [1, 1],
    "square2",
    [
      // 90гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      // 180гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      // 270гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      // 360гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
  ],
  [
    [1, 0],
    [0, 1],
    [0, 2],
    "Lthing3",
    [
      // 90гр
      [1, 0],
      [0, 0],
      [-1, 1],
      [0, 1],
    ],
    [
      // 180гр
      [-2, 0],
      [0, 0],
      [1, 1],
      [-1, -1],
    ],
    [
      // 270гр
      [0, -1],
      [0, 0],
      [1, -1],
      [-1, -1],
    ],
    [
      // 360гр
      [1, 1],
      [0, 0],
      [-1, -1],
      [1, 0],
    ],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
    "lbackw4",
    [
      // 90гр
      [-1, -1],
      [0, 0],
      [1, 1],
      [2, 0],
    ],
    [
      // 180гр
      [1, -1],
      [0, 0],
      [-1, 1],
      [0, 2],
    ],
    [
      // 270гр
      [1, 1],
      [0, 0],
      [-1, -1],
      [-2, 0],
    ],
    [
      // 360гр
      [-1, 1],
      [0, 0],
      [1, -1],
      [0, -2],
    ],
  ],
  [
    [0, 1],
    [1, 1],
    [1, 2],
    "Zthing5",
    [
      // 90гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      // 180гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      // 270гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      // 360гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
  ],
  [
    [1, 0],
    [1, 1],
    [2, 1],
    "Zbackw6",
    [
      // 90гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      // 180гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      // 270гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      // 360гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
  ],
  [
    [1, 0],
    [2, 0],
    [1, 1],
    "Pyra7",
    [
      // 90гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      // 180гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      // 270гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      // 360гр
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
  ],
];

// Создание фигуры
function creFig() {
  const randomX = (min, max) => {
    return Math.trunc(Math.random() * (max - min + 1) + min);
  };

  let curFig = mArr[randomX(0, 3)];
  figMage = [
    document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
    document.querySelector(
      `[posX = "${x + curFig[0][0]}"][posY = "${y + curFig[0][1]}"]`
    ),
    document.querySelector(
      `[posX = "${x + curFig[1][0]}"][posY = "${y + curFig[1][1]}"]`
    ),
    document.querySelector(
      `[posX = "${x + curFig[2][0]}"][posY = "${y + curFig[2][1]}"]`
    ),
  ];

  figMage.map((nod) => {
    nod.classList.add("figure");
  });
}

// Временная для кнопки
function recreator() {
  const X = document.querySelector(".tetris");
  X.remove();
  creTable();
  creFig();
}

// Функция опущения
function movDow() {
  let moflag = true;
  const coord = [
    [figMage[0].getAttribute("posX"), figMage[0].getAttribute("posY")],
    [figMage[1].getAttribute("posX"), figMage[1].getAttribute("posY")],
    [figMage[2].getAttribute("posX"), figMage[2].getAttribute("posY")],
    [figMage[3].getAttribute("posX"), figMage[3].getAttribute("posY")],
  ];

  for (const i of coord) {
    if (
      i[1] === "1" ||
      document
        .querySelector(`[posX = "${i[0]}"][posY = "${i[1] - 1}"]`)
        .classList.contains("set")
    ) {
      moflag = false;
      break;
    }
  }

  if (moflag) {
    for (const i of figMage) {
      i.classList.remove("figure");
    }

    figMage = [
      document.querySelector(
        `[posX = "${coord[0][0]}"][posY = "${coord[0][1] - 1}"]`
      ),
      document.querySelector(
        `[posX = "${coord[1][0]}"][posY = "${coord[1][1] - 1}"]`
      ),
      document.querySelector(
        `[posX = "${coord[2][0]}"][posY = "${coord[2][1] - 1}"]`
      ),
      document.querySelector(
        `[posX = "${coord[3][0]}"][posY = "${coord[3][1] - 1}"]`
      ),
    ];

    for (const i of figMage) {
      i.classList.add("figure");
    }
  } else {
    for (const i of figMage) {
      i.classList.remove("figure");
      i.classList.add("set");
    }
    creFig();
    moflag = true;
  }
}

// ________Программа
creTable();
creFig();

let interv = setInterval(() => {
  movDow();
}, 1000);

// Слушатель нажатия стрелки
window.addEventListener("keydown", function (e) {
  
  let rot = 1;

  let cor1 = [figMage[0].getAttribute("posX"), figMage[0].getAttribute("posY")];
  let cor2 = [figMage[1].getAttribute("posX"), figMage[1].getAttribute("posY")];
  let cor3 = [figMage[2].getAttribute("posX"), figMage[2].getAttribute("posY")];
  let cor4 = [figMage[3].getAttribute("posX"), figMage[3].getAttribute("posY")];

  function getNewState(a) {
    let flag = true;
    // пробная фигура для порта влево и вправо анализ пустоты
    let figNew = [
      document.querySelector(`[posX = "${+cor1[0] + a}"][posY = "${cor1[1]}"]`),
      document.querySelector(`[posX = "${+cor2[0] + a}"][posY = "${cor2[1]}"]`),
      document.querySelector(`[posX = "${+cor3[0] + a}"][posY = "${cor3[1]}"]`),
      document.querySelector(`[posX = "${+cor4[0] + a}"][posY = "${cor4[1]}"]`),
    ];
    // проверка пустоты
    for (const i of figNew) {
      if (!i || i.classList.contains("set")) {
        flag = false;
        break;
      }
    }
    // проверка флага и запись
    if (flag) {
      for (const i of figMage) {
        i.classList.remove("figure");
      }
      figMage = figNew;
      for (const i of figMage) {
        i.classList.add("figure");
      }
    }
  }

  // Поворот недоработан!!!!
  function getRot() {
    let flag = true;
    // пробная фигура для порта влево и вправо анализ пустоты
    let figNew = [
      document.querySelector(`[posX = "${+cor1[0] + a}"][posY = "${cor1[1]}"]`),
      document.querySelector(`[posX = "${+cor2[0] + a}"][posY = "${cor2[1]}"]`),
      document.querySelector(`[posX = "${+cor3[0] + a}"][posY = "${cor3[1]}"]`),
      document.querySelector(`[posX = "${+cor4[0] + a}"][posY = "${cor4[1]}"]`),
    ];
    // проверка пустоты
    for (const i of figNew) {
      if (!i || i.classList.contains("set")) {
        flag = false;
        break;
      }
    }
    // проверка флага и запись
    if (flag) {
      for (const i of figMage) {
        i.classList.remove("figure");
      }
      figMage = figNew;
      for (const i of figMage) {
        i.classList.add("figure");
      }
    }
  }

  // проверка кнопки, запуск движения
  if (e.code == "ArrowLeft") {
    getNewState(-1);
  } else if (e.code == "ArrowRight") {
    getNewState(1);
  } else if (e.code == "ArrowUp") {
    getRot();
  } else if (e.code == "Space") {
    movDow();
  } else if (e.code == "Enter") {
    recreator();
  }
  // Временно поиск кодов кнопок!
  console.log(e.code);
});

/*
нормальный проверенный генератель
const randomX = (min, max) => Math.trunc(Math.random() * (max - min + 1) + min)
};



*/
