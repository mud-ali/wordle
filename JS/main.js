const word = getWord(); //'shout';
const table = document.querySelector('table');
const trs = Array.from(document.querySelectorAll('tr'));
const keyboard = document.getElementsByTagName("iframe")[0];
let attempt = 0;
let letter = 0;
let currentWord = "";
let colorGridPattern = [];

window.addEventListener("load", () => {
    keyboard.contentWindow.postMessage("load", "*");
});
window.addEventListener("message", async (e) => {
    if (e.data.length == 1 || e.data == "Enter" || e.data == "Backspace") {
        console.log("main.js: "+e.data);
        await handleInput(e.data);
    }
}, false);

document.addEventListener('keyup', async (e)=>{
    await handleInput(e);
});

async function handleInput(e) {
    let key = (e.length == 1 || e=="Enter" || e=="Backspace") ? e.toLowerCase() : e.key;
    ctrl = e.ctrlKey ? e.ctrlKey : false;
    const tds = Array.from(trs[attempt].getElementsByTagName('td'));
    if (key == "backspace" && letter > 0) {
        // console.log(tds, letter, attempt);
        // if it exists, remove the last letter
        tds[letter-1].innerText = "";
        letter--;
        currentWord = currentWord.substring(0, currentWord.length - 1);
        return;
    } else if (key == "enter" && letter == 5) {
        if (!(allowedWords.includes(currentWord)) && !realwords.includes(currentWord)) {
            alert("Not a valid word");
            return;
        }
        attempt++;
        await checkWin(currentWord, tds);

        if (attempt == 6) {
            alert("You lost\nClick the screen ");
            genShare(false);
            document.body.replaceWith(document.body.cloneNode(true));
        }
    }


    if ((key.toLowerCase().match(/[a-z]/g) != null) && (key.length <= 1) && (!ctrl) && (letter!=5)) {
        tds[letter].innerText = key.toUpperCase();
        currentWord += key;
        letter++;
    }
    if (letter >= 5) {
        letter = 5;
    }
}

async function checkWin(attempted, cells) {
    currentWord = "";
    letter = 0;
    console.log(letter,currentWord);
    let cor = 0;
    let colGridRow = [];

    for (let cell=0;cell<cells.length;cell++) {
        await sleep(95).then(() => {
            if (attempted.charAt(cell) == word.charAt(cell)) {
                colGridRow.push("g");
                    cells[cell].style.backgroundColor = "green";
                    keyboard.contentWindow.postMessage(`${attempted.charAt(cell)}.green`, "*");
                cor++;
            } else if (word.split("").includes(attempted.charAt(cell))) {
                colGridRow.push("y");
                    cells[cell].style.backgroundColor = "#f5da2f";
                    keyboard.contentWindow.postMessage(`${attempted.charAt(cell)}.#f5da2f`, "*");
            } else if (attempted.charAt(cell) != word.charAt(cell)) {
                colGridRow.push("b");
                    cells[cell].style.backgroundColor = "#575757";
                    keyboard.contentWindow.postMessage(`${attempted.charAt(cell)}.#575757`, "*");
            }   
        }); 
    }
    if (cor===5) {
        setTimeout(()=>{alert("You won in "+attempt+" attempts\nClick the screen to copy your results")}, 630);
        genShare();
    }
    colorGridPattern.push(colGridRow);
}

function getWord() {
    const start = new Date("03/23/2022");
    const today = new Date();
    let diff = Math.floor((today.getTime() - start.getTime()) / (1000*3600*24));
    return realwords[diff];
}

function genShare(win=true) {
    console.log(colorGridPattern);
    let share = "Wordel "+realwords.indexOf(word);
    share += ` ${win?attempt:"X"}/6\n\n`;
    for (let i=0;i<=colorGridPattern.length;i++) {
        let row = colorGridPattern[i] ?? [];
        for (let j=0;j<row.length;j++) {
            share += row[j]=="g"?"🟩":row[j]=="y"?"🟨":"⬛";
        }
        share += i!=colorGridPattern.length ? "\n" : "";
    }
    share += win ? "🟩🟩🟩🟩🟩": "";

    document.body.onclick = () => {
        navigator.clipboard.writeText(share).then(function() {
        }, function(err) {
            throw err;
        });
        document.body.onclick = null;
    }

}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}