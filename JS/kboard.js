const trs = document.getElementsByClassName('tr');
let parent;

window.addEventListener("message", (e) => {
    if (e.data === "load") {
        parent = e.source;
    } else {
        // console.log(`main.js sent: ${e.data}.\nsearching class letter-${e.data.split(".")[0]}`);
        document.getElementsByClassName(`letter-${e.data.split(".")[0].toUpperCase()}`)[0].style.backgroundColor = e.data.split(".")[1];
    }
}, false);

document.addEventListener('keyup', (e)=>{
    parent.postMessage(e.key, "*");
});

(function setup(){
    let keys = ["QWERTYUIOP","ASDFGHJKL","ZXCVBNM"];
    for (i=0;i<trs.length;i++) {
        for (j=0;j<keys[i].length;j++) {
            let td = document.createElement("div");
            td.classList.add("td");
            td.classList.add(`letter-${keys[i].charAt(j)}`);
            td.innerText = keys[i].charAt(j);
            td.addEventListener("click", (e)=>{
                parent.postMessage(e.target.innerText, "*");
            });
            trs[i].appendChild(td);
        }
    }
    
    const otherButtons = document.getElementsByClassName("other-button");
    for (i=0;i<otherButtons.length;i++) {
        otherButtons[i].addEventListener("click", (e)=>{
            console.log(e.target.classList[0]);
            parent.postMessage(e.target.classList[0]=="Enter"?"Enter":"Backspace", "*");
        });
    }

})()