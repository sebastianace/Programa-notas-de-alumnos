const MAX_ALUMNOS = 10;

// ── Estructuras de datos ───────────────────────────────────
let nombres = [];           
let notas   = [];           

// ── Referencias al DOM ────────────────────────────────────
const inputNombre = document.getElementById("nombre");
const inputC1     = document.getElementById("c1");
const inputC2     = document.getElementById("c2");
const inputC3     = document.getElementById("c3");
const mensajeError    = document.getElementById("mensajeError");
const contadorAlumnos = document.getElementById("contadorAlumnos");
const btnAgregar      = document.getElementById("btnAgregar");
const btnMostrar      = document.getElementById("btnMostrar");
const btnReset        = document.getElementById("btnReset");
const cardResultados  = document.getElementById("cardResultados");
const resultado       = document.getElementById("resultado");

//   VALIDACIÓN DE DATOS

function validarEntrada(nombre, c1, c2, c3) {
  if (!nombre.trim()) {
    return "Por favor ingresa el nombre del alumno.";
  }
  const notas = [c1, c2, c3];
  for (let i = 0; i < notas.length; i++) {
    const n = Number(notas[i]);
    if (notas[i] === "" || isNaN(n)) {
      return `La nota del Certamen ${i + 1} no es válida.`;
    }
    if (n < 0 || n > 100) {
      return `La nota del Certamen ${i + 1} debe estar entre 0 y 100.`;
    }
  }
  return null; // sin errores
}

function mostrarError(msg) {
  mensajeError.textContent = msg;
  mensajeError.style.display = "block";
}

function limpiarError() {
  mensajeError.style.display = "none";
  mensajeError.textContent = "";
}

//   AGREGAR ALUMNO AL ARREGLO Y MATRIZ

function agregarAlumno() {
  limpiarError();

  const nombre = inputNombre.value;
  const c1     = inputC1.value;
  const c2     = inputC2.value;
  const c3     = inputC3.value;

  // Validar datos
  const error = validarEntrada(nombre, c1, c2, c3);
  if (error) {
    mostrarError(error);
    return;
  }

  // Guardar en estructuras
  nombres.push(nombre.trim());
  notas.push([Number(c1), Number(c2), Number(c3)]);

  // Actualizar contador
  actualizarContador();

  // Limpiar inputs
  inputNombre.value = "";
  inputC1.value = "";
  inputC2.value = "";
  inputC3.value = "";
  inputNombre.focus();

  if (nombres.length >= MAX_ALUMNOS) {
    btnAgregar.disabled = true;
    btnMostrar.style.display = "block";
    btnReset.style.display = "block";
  }

  if (nombres.length >= 1) {
    btnMostrar.style.display = "block";
    btnReset.style.display = "block";
  }
}

//   ACTUALIZAR CONTADOR EN PANTALLA

function actualizarContador() {
  contadorAlumnos.textContent =
    `Alumnos ingresados: ${nombres.length} / ${MAX_ALUMNOS}`;
}

//   CÁLCULO DE PROMEDIO DE UN ALUMNO (función de orden superior)

function calcularPromedioAlumno(notasAlumno) {
  const suma = notasAlumno.reduce((acc, n) => acc + n, 0);
  return suma / notasAlumno.length;
}

//   CÁLCULO DE PROMEDIO DEL CURSO POR CERTAMEN

function calcularPromedioCertamen(certamenIndex) {
  const suma = notas.reduce((acc, fila) => acc + fila[certamenIndex], 0);
  return suma / notas.length;
}

//   CONTAR APROBADOS Y REPROBADOS

function contarAprobados(promedios) {
  return promedios.filter(p => p >= 55).length;
}

function contarReprobados(promedios) {
  return promedios.filter(p => p < 55).length;
}

//   ORDENAR ALUMNOS POR PROMEDIO (mayor a menor)

function ordenarPorPromedio(promedios) {
  const alumnos = nombres.map((nombre, i) => ({
    nombre,
    promedio: promedios[i]
  }));

  alumnos.sort((a, b) => b.promedio - a.promedio);
  return alumnos;
}

//   MOSTRAR RESULTADOS

function mostrarResultados() {
  if (nombres.length === 0) {
    mostrarError("Debes ingresar al menos un alumno.");
    return;
  }

  // Calcular promedios individuales
  const promedios = notas.map(notasAlumno =>
    calcularPromedioAlumno(notasAlumno)
  );

  // Calcular promedios por certamen
  const promC1 = calcularPromedioCertamen(0);
  const promC2 = calcularPromedioCertamen(1);
  const promC3 = calcularPromedioCertamen(2);

  // Promedio general del curso
  const promGeneral = (promC1 + promC2 + promC3) / 3;

  // Aprobados y reprobados
  const aprobados  = contarAprobados(promedios);
  const reprobados = contarReprobados(promedios);

  // Ordenar por promedio
  const ranking = ordenarPorPromedio(promedios);


  let html = "";

  // Datos por alumno
  nombres.forEach((nombre, i) => {
    html += `
      <p><strong>Nombre ${i + 1}:</strong> ${nombre}</p>
      <p>C1: ${notas[i][0]}</p>
      <p>C2: ${notas[i][1]}</p>
      <p>C3: ${notas[i][2]}</p>
      <p class="promedio-alumno">Promedio: ${promedios[i].toFixed(2)}</p>
      <hr class="separador" />
    `;
  });

  // Promedios del curso
  html += `
    <p><strong>Promedio del curso C1:</strong> ${promC1.toFixed(2)}</p>
    <p><strong>Promedio del curso C2:</strong> ${promC2.toFixed(2)}</p>
    <p><strong>Promedio del curso C3:</strong> ${promC3.toFixed(2)}</p>
    <p><strong>Promedio Final Curso:</strong> ${promGeneral.toFixed(2)}</p>
    <p class="aprobado">Aprobados: ${aprobados}</p>
    <p class="reprobado">Reprobados: ${reprobados}</p>
    <hr class="separador" />
    <p class="titulo-seccion">📊 Ranking por promedio</p>
    <table class="tabla-ranking">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Promedio</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
  `;

  ranking.forEach((alumno, i) => {
    const aprobado = alumno.promedio >= 55;
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${alumno.nombre}</td>
        <td>${alumno.promedio.toFixed(2)}</td>
        <td>
          <span class="${aprobado ? 'badge-aprobado' : 'badge-reprobado'}">
            ${aprobado ? "Aprobado" : "Reprobado"}
          </span>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;

  resultado.innerHTML = html;
  cardResultados.style.display = "block";
  cardResultados.scrollIntoView({ behavior: "smooth" });
}

//   REINICIAR PROGRAMA

function resetear() {
  nombres = [];
  notas   = [];

  inputNombre.value = "";
  inputC1.value = "";
  inputC2.value = "";
  inputC3.value = "";

  limpiarError();
  actualizarContador();

  btnAgregar.disabled = false;
  btnMostrar.style.display = "none";
  btnReset.style.display = "none";

  cardResultados.style.display = "none";
  resultado.innerHTML = "";

  inputNombre.focus();
}

actualizarContador();