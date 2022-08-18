const word = getWord(); //'shout';
const table = document.querySelector('table');
const trs = Array.from(document.querySelectorAll('tr'));
let attempt = 0;
let letter = 0;
let currentWord = "";
let colorGridPattern = [];

document.addEventListener('keyup', (e)=>{
    const tds = Array.from(trs[attempt].getElementsByTagName('td'));
    if (e.key == "Backspace") {
        console.log(tds, letter, attempt);
        console.log(tds[letter]);
        tds[letter-1].innerText = "";
        letter--;
        currentWord = currentWord.substring(0, currentWord.length - 1);
        return;
    } else if (e.key == "Enter" && letter == 5) {
        if (!(allowedWords.includes(currentWord)) && !realwords.includes(currentWord)) {
            alert("Not a valid word");
            return;
        }

        attempt++;
        
        checkWin(currentWord, tds);
        //lose condition if attemp ==6
        currentWord = "";
        letter=0;
    }
    if ((e.key.toLowerCase().match(/[a-z]/g) != null) && (e.key.length <= 1) && (!e.ctrlKey) && (letter!=5)) {
        tds[letter].innerText = e.key.toUpperCase();
        currentWord += e.key;
        letter++;
    }
    if (letter >= 5) {
        letter = 5;
    }
});

async function checkWin(attempted, cells) {
    let cor = 0;
    let colGridRow = [];

    for (let cell=0;cell<cells.length;cell++) {
        
        
        await sleep(170);
        if (attempted.charAt(cell) == word.charAt(cell)) {
            cells[cell].style.backgroundColor = "green"
            colGridRow.push("g");
            cor++;
        }
        else if (word.split("").includes(attempted.charAt(cell))) {
            colGridRow.push("y");
            cells[cell].style.backgroundColor = "#f5da2f"; 
        }
        else if (attempted.charAt(cell) != word.charAt(cell)) {
            colGridRow.push("b");
            cells[cell].style.backgroundColor = "#575757";
        }  
        
        if (cor==5) {
            setTimeout(alert("You won in "+attempt+" attempts\nClick the screen to copy your results"), 400);
            genShare();
        }
    }

    colorGridPattern.push(colGridRow);
}

function getWord() {
    const start = new Date("03/23/2022");
    const today = new Date();
    let diff = Math.floor((today.getTime() - start.getTime()) / (1000*3600*24));
    return realwords[diff];
}

function genShare() {
    console.log(colorGridPattern);
    let share = "Wordel "+realwords.indexOf(word);
    share += " "+attempt+"/6\n\n"; ;
    for (let i=0;i<colorGridPattern.length;i++) {
        let row = colorGridPattern[i];
        for (let j=0;j<row.length;j++) {
            share += row[j]=="g"?"🟩":row[j]=="y"?"🟨":"⬛";
        }
        share += "\n";
    }
    share += "🟩🟩🟩🟩🟩\n";

    document.body.onclick = () => {
        navigator.clipboard.writeText(share).then(function() {
        }, function(err) {
            throw err;
        });
        document.body.onclick = null;
    }

}
function sleep(period) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, period);
    });
}