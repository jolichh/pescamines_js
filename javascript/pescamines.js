//Variables GLOBALES
let filas = 0;
let columnas = 0;
let totalTrueMinas = 0; //total minas

//Demana numeros
function iniciarPartida() {
    let numFiles= prompt("Número de files");
    let numColumnes = prompt("Número de columnes");

    //Comprovamos rango de filas
    if (numFiles > 30) {
        filas = 30;
    } else if (numFiles < 10) {
        filas = 10;
    } else {
        filas = numFiles;
    }

    //Comprovamos rango de columnas
    if (numColumnes > 30) {
        columnas = 30;
    } else if (numColumnes < 10) {
        columnas = 10;
    } else {
        columnas = numColumnes;
    }

    crearTaulell(filas, columnas);
    setMines();
    calculaAdjacents();
}

//Crea de manera dinàmica
function crearTaulell(files, columnes) {
    let div = document.getElementById("taulell");

    let taulell = `<table>`;
    for (let i=0; i<files; i++) {        
        taulell += `<tr>`;

        for (let j=0; j<columnes; j++) {
            taulell += `<td id="${i}_${j}" data-mina="false" data-num-mines="0" data-tancat="true">`;
            
            taulell += `<img oncontextmenu="marcaCasella(${i}, ${j})" onclick="obreCasella(${i}, ${j})" src="img/fons20px.jpg" width="20px">`;
            taulell += `</td>`;
        }
        taulell += `<tr>`;
    }
    taulell += `</table>`;    
    div.innerHTML = taulell;
}
// function marcaCasella(x, y) {
//     let casella = document.getElementById(`${x}_${y}`);
//     casella.innerHTML = `<img type="button" oncontextmenu="desmarcaCasella(${x}, ${y})" onclick="obreCasella(${x}, ${y})" src="img/badera20px.jpg" width="20px">`;
// }
// function desmarcaCasella(x, y) {
//     let casella = document.getElementById(`${x}_${y}`);
//     casella.innerHTML = `<img type="button" oncontextmenu="marcaCasella(${x}, ${y})" onclick="obreCasella(${x}, ${y})" src="img/fons20px.jpg" width="20px">`;
// }
function obreCasella(x,y) {    
    let casella = document.getElementById(`${x}_${y}`);   
    //si hay mina muestra imagen
    if (esMina(x,y)) {
        casella.innerHTML = `<img src="img/mina20px.jpg" width="20px">`; 
        alert("BOOM!! Has mort");     
        mostraTotesMines();
    } 
    else if (!esMina(x,y)) {
    //si no hay, muestra numero de minas adyacentes     
        //si no hay minas adyacentes sigue abriendo recursivo
        if (casella.dataset.numMines == 0) { 
            obreCostats(x,y);//abre adyacente hasta que sea numeros >0
        } else {
            casella.innerHTML = `<p>${casella.dataset.numMines}</p>`;    
            casella.dataset.tancat = 'false';  
        }   
        haGuanyat();
    } 
     
}

//retorna boolean segons si queden caselles no-mina sense obrir
function haGuanyat() {
    let count = 0;    
    for (let i=0; i<filas;i++) {
        for (let j=0; j<columnas; j++) { 
            let casella = document.getElementById(`${i}_${j}`);
            
            if (casella.dataset.tancat == 'true') {
                count++;
            }
        }
    }
   
    if (count == 0) {
        alert("Enhorabona! Has guanyat!!");
    }
}
function mostraTotesMines() {
    //recorre tota la taula i mostra mines restant
    for (let i=0; i<filas;i++) {
        for (let j=0; j<columnas; j++) {            
            let casella = document.getElementById(`${i}_${j}`);
            
            if (esMina(i,j)) {
                //muestra minas de la tabla
                //asigna data como abiertas
                casella.dataset.tancat = 'false';
                casella.innerHTML = `<img src="img/mina20px.jpg" width="20px">`; 
            } 
            // else if (casella.dataset.tancat == true){
            //     //deshabilita click
            //     casella.innerHTML = `<img src="img/fons20px.jpg" width="20px">`; 
            // }                
            
        }
    }
}
//recorre los adyacentes y los abre
function obreCostats(x, y) {

    for(let i=x-1; i<=x+1; i++) {
        if (i<0 || i>=filas) {
            continue;
        }
        for (let j=y-1;j<=y+1;j++) {
            if (j<0 || j>=columnas) {
                continue;
            }
            //alert(`abriendo casilla: ${i}_${j}`);            
            let casella = document.getElementById(`${i}_${j}`);
            
            casella.dataset.tancat = 'false';
            if (casella.dataset.numMines == 0) {
                casella.dataset.numMines = -1;
                obreCostats(i,j);
            } else {
                if (casella.dataset.numMines == -1) {
                    casella.innerHTML = `<p>0</p>`;
                } else {
                    casella.innerHTML = `<p>${casella.dataset.numMines}</p>`;
                }
            }
        }
    }
}
//estableix propietat de mina a true a un 17% de caselles totals
function setMines() {
    totalTrueMinas = Math.floor((filas*columnas)*0.17);
    for (let i=0; i<totalTrueMinas; i++) {        
        let minaX = Math.floor(Math.random()*(filas));  //asegurar valor valido
        let minaY = Math.floor(Math.random()*(columnas));
        let casilla = document.getElementById(`${minaX}_${minaY}`);
        casilla.dataset.mina = 'true';
        casilla.dataset.tancat = 'false';
    }
}
//recorrerà taulell i apunta el número de mines adjacents de cada casella en una custom html: data-num-mines iniciada a 0
function calculaAdjacents() {    
    //recorre todo el tablero
    for (let i=0; i<filas;i++) {
        for (let j=0; j<columnas; j++) {
            //para cada casilla recorre sus adyacentes
            //en caso de ser una mina salta a la siguiente
            if (!esMina(i,j)) {
                //recorre las 8+1 casillas adyacentes
                let nMines = 0;
                for (let k=i-1; k<=i+1;k++) {
                    //asegura dentro de rang de filas
                    if (k>=0 && k<filas) { 
                        for (let l=j-1;l<=j+1;l++) {
                            //asegura dentro de rango columnas
                            if (l>=0 && l<columnas) { 
                                if (esMina(k,l)) {
                                    nMines++;
                                }
                            }
                        }
                    }
                }
                //setting recuento de minas adyacentes
                setMinesAdjacents(i,j, nMines);   
            }        
        }       
    }
}

function esMina(x, y) {
    let casella = document.getElementById(`${x}_${y}`);  
      //elimina click dret per defecte
    casella.addEventListener("contextmenu", (e)=>{e.preventDefault()});
    if (casella.dataset.mina == 'true') {
        return true;
    }
    return false;
}
//estableix a la casella de posicio l'atribut del número de mines a nMinesAdjacents
function setMinesAdjacents(x, y, nMinesAdjacents) {   
    let casella = document.getElementById(`${x}_${y}`);   
    //elimina click dret per defecte, este no funciona mucho
    casella.addEventListener("contextmenu", (e)=>{e.preventDefault()});
    casella.dataset.numMines = `${nMinesAdjacents}`;
}