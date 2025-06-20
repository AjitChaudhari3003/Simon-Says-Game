let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function startGameWithFirstColor(firstColor) {
    if (!started) {
        started = true;
        level = 1;
        userSeq = [];
        gameSeq = [firstColor];
        h2.innerText = `Level ${level}`;
        let firstBtn = document.querySelector(`.${firstColor}`);
        btnflash(firstBtn);

        setTimeout(() => {
            addNextColor();
        }, 600); 
    }
}

function addNextColor() {
    level++;
    h2.innerText = `Level ${level}`;
    userSeq = [];
    let randIdx = Math.floor(Math.random() * 4);
    let randcolor = btns[randIdx];
    gameSeq.push(randcolor);
    let randbtn = document.querySelector(`.${randcolor}`);
    btnflash(randbtn);
}

function chekans(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(() => {
                addNextColor();
            }, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level - 1}</b><br>Tap to restart`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => document.body.style.backgroundColor = "white", 150);
        reset();
    }
}

function btnpress() {
    let btn = this;
    let color = btn.getAttribute("id");

    if (!started) {
        startGameWithFirstColor(color);
        return;
    }

    btnflash(btn);
    userSeq.push(color);
    chekans(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
