const trs = document.getElementsByClassName('tr');
let keys = ["QWERTYUIOP","ASDFGHJKL","ZXCVBNM"];
for (i=0;i<trs.length;i++) {
    for (j=0;j<keys[i].length;j++) {
        let td = document.createElement("div");
        td.classList.add("td");
        //message parent frame
        td.innerText = keys[i].charAt(j);
        trs[i].appendChild(td);
    }
}