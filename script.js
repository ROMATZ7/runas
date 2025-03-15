const runasDisponibles = [ "🌍", "⚡", "🪨", "🌙", "☀️", "🧊"];
const RUNAS_OBJETIVO = 6;
let combinacionSecreta = [];
let intentoActual = [];
let intentosUsados = 0;
const maxIntentos = 25;

const combinacionDiv = document.getElementById("combinacion-actual");
const pistasDiv = document.getElementById("pistas");
const resultadoDiv = document.getElementById("resultado");
const intentosDiv = document.getElementById("intentos");
const historialDiv = document.getElementById("historial");

function iniciarJuego() {
  document.getElementById("instrucciones").style.display = "none";
  document.getElementById("empezar").style.display = "none";
  document.getElementById("juego").style.display = "block";

  combinacionSecreta = ["🌙", "⚡", "🌍", "☀️", "🪨", "🧊"];

  const opcionesDiv = document.getElementById("runas-opciones");
  opcionesDiv.innerHTML = "";
  runasDisponibles.forEach(runa => {
    const btn = document.createElement("button");
    btn.className = "runa-btn";
    btn.textContent = runa;
    btn.onclick = () => agregarRuna(runa);
    opcionesDiv.appendChild(btn);
  });

  intentoActual = [];
  intentosUsados = 0;
  pistasDiv.innerHTML = "";
  resultadoDiv.innerHTML = "";
  historialDiv.innerHTML = "";
  document.getElementById("enviar").disabled = false;
  document.querySelectorAll(".runa-btn").forEach(btn => btn.disabled = false);
  actualizarVista();
}

function agregarRuna(runa) {
  if (intentoActual.length < RUNAS_OBJETIVO) {
    intentoActual.push(runa);
    actualizarVista();
  }
}

function borrarSeleccion() {
  intentoActual = [];
  actualizarVista();
}

function actualizarVista() {
  combinacionDiv.textContent = intentoActual.join(" ");
  intentosDiv.textContent = `Intentos: ${intentosUsados} / ${maxIntentos}`;
}

function verificarIntento() {
  if (intentoActual.length !== RUNAS_OBJETIVO) {
    alert(`Debes seleccionar ${RUNAS_OBJETIVO} runas.`);
    return;
  }

  intentosUsados++;

  let exactos = 0;
  let incluidos = 0;

  const secretaCopy = [...combinacionSecreta];
  const intentoCopy = [...intentoActual];

  for (let i = 0; i < RUNAS_OBJETIVO; i++) {
    if (intentoCopy[i] === secretaCopy[i]) {
      exactos++;
      intentoCopy[i] = null;
      secretaCopy[i] = null;
    }
  }

  for (let i = 0; i < RUNAS_OBJETIVO; i++) {
    if (intentoCopy[i]) {
      const index = secretaCopy.indexOf(intentoCopy[i]);
      if (index !== -1) {
        incluidos++;
        secretaCopy[index] = null;
      }
    }
  }

  const pista = `Intento ${intentosUsados}: ✅ ${exactos} exactos, 🔁 ${incluidos} mal ubicados`;
  const pistaElem = document.createElement("div");
  pistaElem.textContent = pista;
  pistasDiv.appendChild(pistaElem);

  const intentoTexto = intentoActual.join(" ");
  const resumen = document.createElement("div");
  resumen.textContent = `#${intentosUsados} ➤ ${intentoTexto} → ✅ ${exactos} | 🔁 ${incluidos}`;
  historialDiv.appendChild(resumen);
  while (historialDiv.children.length > 4) {
    historialDiv.removeChild(historialDiv.firstChild);
  }

  if (exactos === RUNAS_OBJETIVO) {
    document.body.innerHTML = `<div id="estrellaVictoria">⭐</div>`;
    return;
  } else if (intentosUsados >= maxIntentos) {
    resultadoDiv.innerHTML = "💀 La prisión te atrapó para siempre...<br>La combinación era:<br>" + combinacionSecreta.join(" ");
    desactivarJuego();
  }

  intentoActual = [];
  actualizarVista();
}

function desactivarJuego() {
  document.querySelectorAll(".runa-btn").forEach(btn => btn.disabled = true);
  document.getElementById("enviar").disabled = true;
}