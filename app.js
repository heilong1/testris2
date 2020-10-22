let main = document.querySelector(".main");

// __________________Создание доски
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

// Рандомизатор
const randomX = (min, max) => {
  return Math.trunc(Math.random() * (max - min + 1) + min);
};

// Пачка узлов, являющая фигуру
let figMage = [];

// Массив фигур объектный тип
const figArr = [
  {
    id: "stick",
    fnew: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  },
  {
    id: "square",
    fnew: [
      [1, 0],
      [0, 1],
      [1, 1],
    ],
  },
  {
    id: "Lthing",
    fnew: [
      [1, 0],
      [0, 1],
      [0, 2],
    ],
  },
  {
    id: "lbackw",
    fnew: [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
  },

  {
    id: "Zthing",
    fnew: [
      [1, 0],
      [0, 1],
      [-1, 1],
    ],
  },
  {
    id: "Zbackw",
    fnew: [
      [1, 0],
      [1, 1],
      [2, 1],
    ],
  },
  {
    id: "Pyra",
    fnew: [
      [1, 0],
      [2, 0],
      [1, 1],
    ],
  },
];

// Создание фигуры
function creFig(num, x, y) {
  let curFig = figArr[num];
  figMage = [
    document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
    document.querySelector(
      `[posX = "${x + curFig.fnew[0][0]}"][posY = "${y + curFig.fnew[0][1]}"]`
    ),
    document.querySelector(
      `[posX = "${x + curFig.fnew[1][0]}"][posY = "${y + curFig.fnew[1][1]}"]`
    ),
    document.querySelector(
      `[posX = "${x + curFig.fnew[2][0]}"][posY = "${y + curFig.fnew[2][1]}"]`
    ),
  ];

  figMage.map((nod) => {
    nod.classList.add("figure");
  });
}

// ___________________Финал
// Удалить и создать доску, очистить интервал и мовер.
// Нарисовать рожу.
function pressF() {
  delTable();
  creTable();
  clearInterval(interv);
  window.removeEventListener("keydown", mover);
  creFig(6, 2, 10);
  creFig(6, 7, 10);
  creFig(2, 5, 6);
  creFig(1, 5, 3);
  creFig(4, 3, 4);
  creFig(5, 7, 4);
}

// _________________Удалить доску
function delTable() {
  const X = document.querySelector(".tetris");
  X.remove();
}

// _________________Рестарт игры
// Удалить и создать доску
// Если не юзать финал, рестарт сохранит мовер и интервал
// После финала мовер и интервал не создаются!!!!!!!!!!!!!
// Мовер то бишь работать будет, а инт множится. решить!!!!!!!!!
function recreator() {
  pressF();
  delTable();
  creTable();
  creFig(randomX(0, 6), 5, 15);
}

// __________________Пауза____Доделать!!!!!!!!!!!!!!!!!!!!
// Или лучше в работе слушателя, думать.
function gamPause() {
  clearInterval(interv);
  window.removeEventListener("keydown", mover);
}

// _______________________Функция опущения_______________
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

    // Если фигура встала за рамкой, финал
    const upSet = [];
    for (let i = 1; i < 11; i++) {
      upSet.push(document.querySelector(`[posX = "${i}"][posY = "16"]`));
    }
    for (const i of upSet) {
      if (i.classList.contains("set")) pressF();
      else {
        creFig(randomX(0, 6), 5, 15);
        moflag = true;
      }
    }
  }
}

// __________________________________________________________
// ________________Слушатель нажатия стрелки
const mover = (e) => {

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

  let rot = 1;
  // Поворот недоработан!!!!
  function getRot(a) {
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
    getRot(1);
  } else if (e.code == "ArrowDown") {
    getRot(-1);
  }else if (e.code == "Space") {
    movDow();
  } else if (e.code == "Escape") {
    pressF();
  } else if (e.code == "KeyP") {
    gamPause();
  }
  // Временно поиск кодов кнопок!
  console.log(e.code);
};


// ____________________Программа_____________________________
// Создать доску, создать фигуру, запустить интервал
// Сделать так, чтобы начиналось с рожи, и старт по ентеру!!!!!!!!!!
creTable();
creFig(randomX(0, 6), 5, 15);

let interv = setInterval(() => {
  movDow();
}, 1000);

// __Слушатель движения_
window.addEventListener("keydown", mover);

// ___Слушатель рестарта_
window.addEventListener("keydown", function (e) {
  if (e.code == "Enter") {
    recreator();
  }
});


/*

*/
