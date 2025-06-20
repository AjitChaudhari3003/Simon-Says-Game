let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

function startGame() {
    if (!started) {
        started = true;
        levelup();
    }
}

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    btnflash(randbtn);
}

function chekans(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b><br>Press any key or click to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnpress() {
    if (!started) return;
    let btn = this;
    btnflash(btn);
    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    chekans(userSeq.length - 1);
}

document.addEventListener("keypress", startGame);

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", function () {
        startGame();
        btnpress.call(this);
    });
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
