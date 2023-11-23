//Variables GLOBALES
let filas = 0;
let columnas = 0;

//Demana numeros
function iniciarPartida() {
    let numFiles= prompt("Número de files");
    let numColumnes = prompt("Nuúmero de columnes");

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


//Per destapar les caselles en cascada que {són zero o están al costat d'un zero} s'han de fer de forma recursiva

//Al crear el onclick del img en format text, podeu passar-li els parametres i, j


//Crea de manera dinàmica
function crearTaulell(files, columnes) {
    let div = document.getElementById("taulell");

    let taulell = `<table>`;
    for (let i=0; i<files; i++) {        
        taulell += `<tr>`;

        for (let j=0; j<columnes; j++) {
            taulell += `<td id="${i}_${j}" data-mina="false" data-num-mines="0">`;
            
            taulell += `<img type="button" onclick="obreCasella(${i}, ${j})" src="img/fons20px.jpg" width="20px">`;
            taulell += `</td>`;
        }
        taulell += `<tr>`;
    }
    taulell += `</table>`;    
    div.innerHTML = taulell;
}

function obreCasella(x,y) {    
    let casella = document.getElementById(`${x}_${y}`);   
    //si hay mina muestra imagen, si no hay, calcula adjacents
    if (esMina(x,y)) {
        casella.innerHTML = `<img src="img/mina20px.jpg" width="20px">`;        
    } 
    if (!esMina(x,y)) {
        casella.innerHTML = `<p>${casella.dataset.numMines}</p>`;        
    }    
}
//estableix propietat de mina a true a un 17% de caselles totals
function setMines() {
    let totalTrue = Math.floor((filas*columnas)*0.17);
    alert(totalTrue);
    for (let i=0; i<totalTrue; i++) {
        let minaX = Math.floor(Math.random()*(filas));  //asegurar valor valido
        let minaY = Math.floor(Math.random()*(columnas));
        let casilla = document.getElementById(`${minaX}_${minaY}`);
        casilla.dataset.mina = 'true';
    }

}
//recorrerà taulell i apunta el número de mines adjacents de cada casella en una custom html: data-num-mines iniciada a 0
function calculaAdjacents() {
let counter = 0;
    
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
            counter++;     
        }       
    }
}

function esMina(x, y) {
    let casella = document.getElementById(`${x}_${y}`);
    if (casella.dataset.mina == 'true') {
        return true;
    }
    return false;
}
//estableix a la casella de posicio l'atribut del número de mines a nMinesAdjacents
function setMinesAdjacents(x, y, nMinesAdjacents) {   
    let casella = document.getElementById(`${x}_${y}`);   
    casella.dataset.numMines = `${nMinesAdjacents}`;
}