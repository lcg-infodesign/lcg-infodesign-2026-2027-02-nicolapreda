let table;

let colonne = 10;
let cella = 100;
let margine = 40;
let spazioTitolo = 90;

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  // righe necessarie per tutti i dati
  let n = table.getRowCount();
  let righe = (n - n % colonne) / colonne;
  if (n % colonne > 0) {
    righe = righe + 1;
  }
  createCanvas(margine * 2 + colonne * cella, spazioTitolo + margine + righe * cella + margine);
  angleMode(DEGREES);
  rectMode(CENTER);
  noLoop();
}

function draw() {
  background(12, 18, 40);

  noStroke();
  fill(255);
  textSize(22);
  text("Satelliti", margine, 50);
  fill(150, 160, 200);
  textSize(12);
  text("ogni satellite è una riga del dataset", margine, 72);

  for (let i = 0; i < table.getRowCount(); i++) {
    let colonna = i % colonne;
    let riga = (i - colonna) / colonne;
    let x = margine + colonna * cella + cella / 2;
    let y = spazioTitolo + margine + riga * cella + cella / 2;

    let v0 = table.getNum(i, "column0");
    let v1 = table.getNum(i, "column1");
    let v2 = table.getNum(i, "column2");
    let v3 = table.getNum(i, "column3");
    let v4 = table.getNum(i, "column4");

    disegnaSatellite(x, y, v0, v1, v2, v3, v4);
  }
}

// valori da -100 a 100
function disegnaSatellite(x, y, v0, v1, v2, v3, v4) {
  let grandezza = 0.6 + ((v0 + 100) / 200) * 0.6;
  let inclinazione = v1 * 0.45;
  let antenna = 4 + ((v4 + 100) / 200) * 18;

  let pannelli;
  if (v2 < -50) {
    pannelli = 1;
  } else if (v2 < 0) {
    pannelli = 2;
  } else if (v2 < 50) {
    pannelli = 3;
  } else {
    pannelli = 4;
  }

  let corpoR, corpoG, corpoB;
  if (v3 < -33) {
    corpoR = 242; corpoG = 194; corpoB = 0;
  } else if (v3 < 33) {
    corpoR = 240; corpoG = 240; corpoB = 235;
  } else {
    corpoR = 235; corpoG = 90; corpoB = 70;
  }

  push();
  translate(x, y);
  rotate(inclinazione);
  scale(grandezza);

  // orbita
  if (v4 > 0) {
    noStroke();
    fill(255, 255, 255, 25);
    ellipse(0, 0, 76, 26);
  }

  let lunghezzaBraccio = 14 + pannelli * 9;
  stroke(150, 160, 200);
  strokeWeight(2);
  line(-lunghezzaBraccio, 0, lunghezzaBraccio, 0);

  // pannelli
  fill(40, 90, 200);
  stroke(140, 180, 255);
  strokeWeight(1);
  for (let k = 0; k < pannelli; k++) {
    let distanza = 16 + k * 9;
    rect(distanza, 0, 7, 16);
    rect(-distanza, 0, 7, 16);
  }

  // antenna
  stroke(200);
  strokeWeight(1.5);
  line(0, -8, 0, -8 - antenna);
  noStroke();
  fill(242, 194, 0);
  circle(0, -8 - antenna, 4);

  // corpo
  fill(corpoR, corpoG, corpoB);
  rect(0, 0, 18, 18, 3);
  fill(12, 18, 40);
  circle(0, 0, 6);

  pop();
}
