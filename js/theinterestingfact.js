FBInstant.initializeAsync().then(function () {
  console.log("loaded");

  var progress = 0;
  var interval = setInterval(function () {
    if (progress >= 95) {
      clearInterval(interval);
      FBInstant.startGameAsync().then(function () {
        console.log("Game started");

        var playerName = FBInstant.player.getName();
        var playerId = FBInstant.player.getID();

        console.log(playerName, playerId);
      });
    }
    FBInstant.setLoadingProgress(progress);

    progress += 5;
  }, 100);
});

console.log("working");

let questions = [
  "9 - 3 % 1 / 3 + 1 = ?",
  "8 % 2 (2 +2) = ?",
  "After two years, if John will be twice as old as he was five years ago. Then, how old is he now?",
  "Divide 30 by half and then add 10",
  "If I put in one bird per cage, I have one bird left. If I put in two birds per cage, I have one cage left. How many cages and birds do I have?",
  "49,  62,  70,  77,  91,  ?",
  "3 - 3 x 0 + 3 % 3 = ?",
  "2, 5, 9, 19, 37, ?",
  "2 + 2 ( 2 + 2 x 0 ) + 2 x 0 = ?",
  "1, 2, 2, 4, 3, 6, 4, 8, 5, 10, ?",
  "40 + 40 x 0 + 1 = ?",
  "7 + 7 % 7 + 7 x 7 - 7 = ?",
  " The day before yesterday Alice was 25.The next year Alice will be 28.This is true only one day in a year.What day is Alice Birthday ?",
  "There were some passenger on a bus. 19 passenger get off the bus at the first stop and 17 new passenger get on the bus. Now there are 63 passenger are left on the bus. How many passenger were on the bus to begin with",
  "12 ( 15 + 26 + 37 ) = ?",
  " AC, ZX, DF, ? ",
  " I have a 4-digit number. The first digit has no use, second and third digit is mirror images, and the fourth digit is half of the third digit.",
  "6 % 2 ( 1 + 2 ) = ?",
  "Can you tell how many holes in a polo ?",
  "Which is heavier, 0.02 pounds of rock or 0.1 pounds of feather ?",
];

let answers = [
  ["1", "9", "4", "7"],
  ["16", "1", "4", "8"],
  ["12", "7", "9", "10"],
  ["70", "25", "35", "45"],
  [
    "4 Birds and 3 Cages",
    "6 Birds and 4 Cages",
    "7 Birds and 5 Cages",
    "5 Birds and 3 Cages",
  ],
  ["101", "100", "104", "98"],
  ["4", "2", "1", "0"],
  ["75", "73", "76", "78"],
  ["6", "0", "8", "2"],
  ["6", "20", "15", "8"],
  ["41", "1", "82", "0"],
  ["50", "0", "49", "7"],
  ["Dec 31", "Jan 1", "Jan 31", "June 31"],
  ["65", "60", "36", "40"],
  ["936", "65", "90", "243"],
  ["WU", "GJ", "UW", "YZ"],
  ["0963", "0693", "6039", "5063"],
  ["9", "6", "0", "4"],
  ["4", "3", "0", "2"],
  ["Feather", "Rock", "Both", "None"],
];

let startbutton = document.querySelector(".startbutton");
let questionContainer = document.querySelector(".questionContainer");
let gameEnd = document.querySelector(".gameEnd");
let option = document.querySelectorAll(".option");
let restart = document.querySelector(".restart");
let next = document.querySelector(".next");
let question = document.querySelector(".question");
let test = document.querySelector(".test");
let score = document.querySelector(".score");
let q = 0;
let scoreNo = 0;
let highest = 0;
score.innerText = scoreNo;
let chances = 3;
let settime;
let pitime;

//for pi
let endangle;
let angle2 = 1.5;
let myclock = document.querySelector(".myclock");
let stopclick = 0;

//sound
//tick tok
let realvol = 0.2;
let clock = new Howl({
  src: ["audio/clock.mp3"],
  loop: true,
  volume: 0, // make function for volumne up and down
});

function volume() {
  realvol += 0.8 / 200;
  clock.volume(realvol);
}

//buzzer
let buzzer = new Howl({
  src: ["audio/buzzer.mp3"],
  volume: 0.5,
});

//old try

// console.log(questions[1]);
// let question=document.querySelector(".question");
// let i=Math.floor(Math.random()*3);
// question.innerText=questions[i];
// console.log(question);

let i = new Array();

for (let ii = 0; ii < questions.length; ii++) {
  i[ii] = ii;
}

function restartgame() {
  document.querySelector(".ht1").classList.remove("hide");
  document.querySelector(".ht2").classList.remove("hide");
  document.querySelector(".ht3").classList.remove("hide");
  chances = 3;
  score.innerText = 0;
  scoreNo = 0;
  test.classList.remove("hide");

  gameEnd.classList.add("hide");
  if (i.length < i.length + 1) {
    for (g = 0; g < 4; g++) {
      option[g].classList.remove("red", "green");
    }
  } else {
    console.log("gamestart");
  }

  for (let ii = 0; ii < questions.length; ii++) {
    i[ii] = ii;
  }

  startgame();
}

function startgame() {
  // buzzer.play();
  clock.stop();
  clearInterval(pitime);
  clearTimeout(settime);
  c.clearRect(0, 0, 200, 200); //check this v.I  //that's how i refreshed my pi
  angle2 = 1.5;
  console.log(angle2);

  //sound of clock
  clock.play();

  if (stopclick == 0 && i.length < questions.length) {
    document.querySelector(".ht" + chances).classList.add("hide");
    chances -= 1;
    console.log("chances :" + chances);
    if (chances == 0) {
      i.length = 0;
    }
  }

  if (i.length == 0) {
    clock.stop();
    myclock.classList.add("hide");
    next.classList.add("hide");
    questionContainer.classList.add("hide");
    restart.classList.remove("hide");
    gameEnd.classList.remove("hide");
    test.classList.add("hide");

    //for highest score

    //  if(scoreNo>highest){
    //      highest=scoreNo;
    //      console.log(highest);
    //  }else{
    //      console.log("not a highest no.")
    //  }
  } else {
    if (i.length < i.length + 1) {
      for (g = 0; g < 4; g++) {
        option[g].classList.remove("red", "green");
      }
    }
    stopclick = 0;
    myclock.classList.remove("hide");
    // test.classList.add("hide");
    restart.classList.remove("hide");
    startbutton.classList.add("hide");
    next.classList.remove("hide");
    questionContainer.classList.remove("hide");
    questionContainer.classList.remove("hide");
    let random1 = Math.floor(Math.random() * i.length);
    window.selected1 = i.splice(random1, 1);
    question.innerText = questions[window.selected1];

    let array = [0, 1, 2, 3];
    for (y = 0; y < 4; y++) {
      let random = Math.floor(Math.random() * array.length);
      let option = document.querySelectorAll(".answerButtons button")[y];
      let selected = array.splice(random, 1);
      option.innerText = answers[window.selected1][selected];
    }
    pitime = setInterval(pi, 40000 / 200);
    settime = setTimeout(timeout, 40000); //also check setInterval //setInterval is not reliable for complicated things
  }

  console.log("test");
}

function timeout() {
  buzzer.play();

  // clearInterval(endangle);
  console.log("hello www");
  resultcheck();
}

function result(event) {
  clearTimeout(settime);

  // clearInterval(endangle);
  angle2 = 1.5;
  // clicked=1;
  window.x = event.target.innerText; //V.I check how i did it
  window.y = event.target;
  resultcheck();
}

function resultcheck() {
  clock.stop();

  for (r = 0; r < 4; r++) {
    if (option[r].innerText == answers[window.selected1][0]) {
      option[r].classList.add("green");
      window.correct = r;
    } else {
      option[r].classList.add("red");
    }
  }
  if (option[window.correct].innerText == window.x && stopclick == 0) {
    scoreNo += 10;
    score.innerText = scoreNo;
    stopclick++;
  }
  if (stopclick == 0) {
    document.querySelector(".ht" + chances).classList.add("hide");
    chances -= 1;
  }
  if (chances == 0) {
    i.length = 0;
  }
  stopclick++;
  console.log(i.length);
}

let canvas = document.querySelector("#mycanvas");
let c = canvas.getContext("2d");

c.lineWidth = 100;

function pi() {
  if (stopclick == 0) {
    volume();
    angle2 += 0.01;
    // console.log(clock.volume());
    // console.log(realvol);

    c.beginPath();
    c.arc(75, 75, 51, 1.5 * Math.PI, angle2 * Math.PI, false);
    c.strokeStyle = "rgb(40 64 124)";
    if (angle2 >= 3) {
      c.strokeStyle = "rgba(237, 63, 54, 0.8)";
    }
    c.stroke();
  } else {
    clearInterval(pitime);
  }
}

//see this format V.I. It's about stopping repeation on random

// var classes = ["color-1", "color-2", "color-3", "color-4", "color-5"];
// for(i = 0;i < 5; i++){
//   var randomPosition = Math.floor(Math.random() * classes.length);
//   var selected = classes.splice(randomPosition,1);
//   console.log(selected);
//   alert(selected);
// }

// //demo watch

// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');
// ctx.strokeStyle = '#28d1fa';

// ctx.lineWidth = 17;               //drawing line width
// ctx.lineCap = 'round';            //edges of line
// ctx.shadowBlur = 15;               //shadow blur
// ctx.shadowColor = '#28d1fa';

// function degToRad(degree) {
//   var factor = Math.PI/180;
//   return degree*factor;
// }

// function renderTime() {

//   var now = new Date();
//   var today = now.toDateString();
//   var time = now.toLocaleTimeString();
//   var hours = now.getHours();
//   var minutes = now.getMinutes();
//   var seconds = now.getSeconds();
//   var milliseconds = now.getMilliseconds();
//   var newSeconds = seconds+ (milliseconds/1000);

//   // Background
//   gradient = ctx.createRadialGradient(200,200,5,200,200,300);
//   gradient.addColorStop(0,'#09303a');
//   gradient.addColorStop(1, '#000000');
//   ctx.fillStyle = gradient;
//   ctx.fillRect(0,0,400,400);

//   // Hours
//   ctx.beginPath();
//   ctx.arc(200, 200, 170, degToRad(270), degToRad((hours*30)-90));
//   ctx.stroke();

//   // Minutes
//    ctx.beginPath();
//   ctx.arc(200, 200, 140, degToRad(270), degToRad((minutes*6)-90));
//   ctx.stroke();
//   Seconds
//    ctx.beginPath();
//   ctx.arc(200, 200, 110, degToRad(270), degToRad((newSeconds*6)-90));
//   ctx.stroke();
//   // Date
//   ctx.font = "20px Helvetica";
//   ctx.fillStyle = '#28d1fa';
//   ctx.fillText(today, 140, 200);

//   // Time
//   ctx.font = "15px Helvetica";
//   ctx.fillStyle = '#28d1fa';
//   ctx.fillText(time, 140, 230);

// }
// setInterval(renderTime, 40);

//my clock

// let mycanvas=document.querySelector("#mycanvas");
// let ctx=mycanvas.getContext("2d");

// function testt(){
// let noww=new Date();
// let timeset= toLocaleTimeString();
// let sec=noww.getSeconds();
// let milisec=noww.getMilliseconds();
// let timing=document.querySelector("#mycanvas.innertext");

//     ctx.fillText(timeset,10,60)
// }
// setInterval(testt,40);

// //ne my clock
// let i=0;
// let x=setInteval(function(){
//     let now2=new Date().getTime();
//     let min=now2.getMinutes();
//     if(i==0){
//         time=
//     }
// })

//animation
