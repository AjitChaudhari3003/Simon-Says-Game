let gameSeq =[];
let userSeq =[];
let btns = ["yellow","red","purple","green"];
let started =false;
let level = 0;
let h2= document.querySelector("h2");

document.addEventListener("keypress",function(){
   if(started ==false){
    console.log("game is started");
    started=true;
    levelup();
   }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function levelup(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`)
    // console.log(randIdx);    
    // console.log(randbtn);    
    // console.log(randcolor); 
    gameSeq.push(randcolor);
     console.log(gameSeq);
    btnflash(randbtn);
}

function chekans(idx){
//   console.log("curr level" , level);
//   let idx = level - 1;
  if(userSeq[idx]===gameSeq[idx]){
    if(userSeq.length == gameSeq.length){
        setTimeout(levelup,1000)
    }
  }else{
    h2.innerHTML=`game over! Your score was <b> ${level}<b> <br>press any key to start`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function()  {
        document.querySelector("body").style.backgroundColor="white";
    },150);
    reset();
  }
}

function btnpress(){
   let btn = this;
   btnflash(btn);

   usercolor = btn.getAttribute("id");
   userSeq.push(usercolor);
   chekans(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}