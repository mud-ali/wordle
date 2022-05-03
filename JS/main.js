const word = getWord(); //'shout';
const table = document.querySelector('table');
const trs = Array.from(document.querySelectorAll('tr'));
let attempt = 0;
let letter = 0;
let currentWord = "";

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

function checkWin(attempted, cells) {
    let cor = 0;

    for (let cell=0;cell<cells.length;cell++) {
        
        
        if (attempted.charAt(cell) == word.charAt(cell)) {
            setTimeout(()=>{
                cells[cell].style.backgroundColor = "green"
            }, 500);
            cor++;
        }
        else if (word.split("").includes(attempted.charAt(cell))) {
            setTimeout(()=>{
                cells[cell].style.backgroundColor = "#f5da2f"; //yellow
            }, 500);
        }
        else if (attempted.charAt(cell) != word.charAt(cell)) {
            setTimeout(()=>{
                cells[cell].style.backgroundColor = "#575757"; //grey
            }, 500);
        }  
        
        if (cor==5) setTimeout(alert(attempt), 1000);
    }
}

function getWord() {
    const start = new Date("03/26/2022");
    const today = new Date();
    let diff = Math.floor((today.getTime() - start.getTime()) / (1000*3600*24));
    return realwords[diff];
}