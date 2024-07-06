"use strict";

let reloj = document.getElementById('reloj');
let audio = document.getElementById('audio');
let pantalla = document.getElementById('pantalla');
let dtAlarma = document.getElementById('dt-alarma');
let notificacion = document.getElementById('notificacion');
let detener = document.querySelector('.detener');
let posponer = document.querySelector('.posponer');
let cardHeader = document.querySelector('.card-header');
let formulario = document.querySelector('.formulario');
let hor = document.getElementById("hor");
let min = document.getElementById("min");
let momento = document.getElementById("momento");
let temporizador;
let horarioSonar;
let horarioSonar2;
let segundos;
let sonarString
let minString
let minStrgInt
let horInt;
let ventana

function Alarma () {
  // asignar valores ingresados en la interfax a las variables que componen l alarma
  hor = hor.value;
  min = min.value;
  hor = (hor === "") ? (hor = "0") : hor;
  min = (min === "") ? (min = "0") : min;
  min = parseInt(min);
  hor = parseInt(hor);

    hor = (hor === "") ? (hor = "0") : hor;
    min = (min === "") ? (min = "0") : min;

  momento = momento.value
  // reasinacion en caso de ingresar valores erroneos
  min = (min > 0) && (min < 1) ? min = 0 : min;
  min = (min > 59) ? min = 59 : min;
  hor = (hor > 12) ? (hor = 12) : hor;
  hor = (hor < 1) ? (hor = 12) : hor;
  

  // concatenacion de strings para mejor efecto visual
  hor = (hor < 10) ? (hor = "0" + hor) : hor;
  min = (min < 10) ? (min = "0" + min) : min;
  // inserta las variables en una sola variable
  horarioSonar = `${hor} : ${min} ${momento}`;
  localStorage.setItem('sonar', horarioSonar);
  localStorage.setItem('audio', audio);
  
  formulario.style = 'display: none'
  location.reload('alarma.html')

// insertar hora de sonar al html
pantalla.innerHTML = `Alarma:  ${localStorage.getItem('sonar')} `
}

function relog () {
  // accediendo al objeto date y sus metodos
  audio = document.getElementById('audio');
  let fecha2 = new Date();
  let hora = fecha2.getHours();
  let minutos = fecha2.getMinutes();
  segundos = fecha2.getSeconds();
  let tiempo;

  // validando horarios
  tiempo = (hora > 11) ? (tiempo = "pm") : tiempo = "am";
  // modificar formato de 24  a 12 horas
  hora = (hora > 12) ? (hora -= 12) : hora;
  // Ajustar la hora cero al formato de 12 horas
  hora = (hora == 0) ? (hora += 12) : hora;
  // concatenacion de strings para mejor efecto visual
  hora = (hora < 10) ? (hora = "0" + hora) : hora;
  minutos = (minutos < 10) ? (minutos = "0" + minutos) : minutos;
  // inserta las variables en una sola variable
  temporizador = `${hora} : ${minutos} ${tiempo}`;
  reloj.innerHTML = ""
  pantalla.innerHTML = `Alarma:  ${localStorage.getItem('sonar')} `
}

function validacionTiempo() {
  setInterval(() => {
    relog()
    // comparar hora con alarma programada
    if (temporizador == localStorage.getItem('sonar') && segundos < 3) {
      let alarmaActiva = "https://petercocho.github.io/alarma-web/";
      ventana = window.open(alarmaActiva);
      activarAlarma();
    }
  }, 1000);
}

function activarAlarma() {
  // reproducir sonido
  ventana.close();
  audio.play();
  cardHeader.style = 'display: none';
  // Alerta de alarma
  dtAlarma.innerHTML = `Alarma: ${temporizador} <form
    action="javascript:void(0);"
    method="post"
    onsubmit="detenerAlarma()">
    <button type="submit" class="btn btn-info detener">
    Detener
    </button>
    </form>
    <form
    action="javascript:void(0);"
    method="post"
    onsubmit="posponerAlarma()">
    <button type="submit" class="btn btn-info posponer">
    Posponer
    </button>
    </form> <i class='bi bi-alarm'></i>`
  dtAlarma.style = "display: flex; background: #13345e; padding: 20px; margin: 5px auto; width: 310px;  border-radius: 5px; flex-wrap: wrap;";
}

function detenerAlarma() {
  // pausar sonido
  audio.pause();
  localStorage.removeItem('sonar');
  localStorage.setItem('sonar', "00 : 00 --");
  // actualizar la pagina
  location.reload('alarma.html');
}

function posponerAlarma() {
  // pausar sonido
  audio.pause();
  sonarString = localStorage.getItem('sonar');
  hor = sonarString[0] + sonarString[1]
  momento = sonarString[8] + sonarString[9]
  minString = sonarString[5] + sonarString[6]
  minStrgInt = parseInt(minString)
  
  if (minStrgInt >= 50) {
    minStrgInt -= 50;
    minStrgInt
    horInt = parseInt(hor);
    horInt += 1;
    hor = horInt;
    hor = (hor > 12) ? (hor -= 12) : hor;
    hor = (hor < 10) ? (hor = "0" + hor) : hor;
    
  }
  else {
    minStrgInt += 10;
  }
  min = minStrgInt;
  min = (min < 10) ? (min = "0" + min) : min;
  horarioSonar2 = `${hor} : ${min} ${momento}`;
  localStorage.removeItem('sonar');  
  localStorage.setItem('sonar', horarioSonar2);
  dtAlarma.style = "display: none";
  notificacion.innerHTML = `<p>La alarma sonara dentro de 10 minutos</p>`
  notificacion.style = 'display: block; text-align: center; height: 100px;width: 200px; margin: 30px auto;';
  // actualizar la pagina
  setTimeout(() => {
    location.reload('alarma.html');
  }, 5000);
}

function editar() {
  localStorage.removeItem('sonar');
  localStorage.setItem('sonar', "00 : 00 --")
  formulario.style = 'display: inline-block;'

}

validacionTiempo()





