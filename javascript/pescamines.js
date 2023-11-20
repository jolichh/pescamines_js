//Variables GLOBALES
let filas;
let columnas;

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
}


//Per destapar les caselles en cascada que {són zero o están al costat d'un zero} s'han de fer de forma recursiva

//Al crear el onclick del img en format text, podeu passar-li els parametres i, j


//Crea de manera dinàmica
function crearTaulell(files, columnes) {
    let taulell = "";    
    let div = document.getElementById("taulell");

    taulell += `<table>`;

    for (let i=0; i<files; i++) {
        
        taulell += `<tr>`;

        for (let j=0; j<columnes; j++) {

            taulell += `<td data-mina="false">`;
            
            taulell += `<img id="${i},${j}" type="button" onclick="obreCasella('${i}, ${j}')" src="img/fons20px.jpg" width="20px">`;
            taulell += `<td>`;
        }
        taulell += `<tr>`;
    }

    taulell += `</table>`;
    div.innerHTML = taulell;
}


//FUNCIONES EXTRAS
function entraAlRango() {
    
}