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
  [[0, 1], [0, 2], [0, 3], "stick1"],
  [[1, 0], [0, 1], [1, 1], "square2"],
  [[1, 0], [0, 1], [0, 2], "Lthing3"],
  [[1, 0], [1, 1], [1, 2], "lbackw4"],
  [[0, 1], [1, 1], [1, 2], "Zthing5"],
  [[1, 0], [1, 1], [2, 1], "Zbackw6"],
  [[1, 0], [2, 0], [1, 1], "Pyra7"],
];

// Создание фигуры
function creFig() {
  const randomX = (min, max) => {
    return Math.trunc(Math.random() * (max - min + 1) + min);
  };

  let curFig = mArr[randomX(0, 6)];
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

// Флаг опущения
let moflag = true;
// Функция опущения
function movDow() {
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

creTable();

/*
нормальный проверенный генератель
const randomX = (min, max) => Math.trunc(Math.random() * (max - min + 1) + min)
};



*/
