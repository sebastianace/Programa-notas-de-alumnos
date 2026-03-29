# 📚 Programa de Notas de Alumnos

Aplicación web interactiva desarrollada en **HTML, CSS y JavaScript** para gestionar y calcular las notas de los alumnos de un curso, con soporte para hasta 10 estudiantes y 3 certámenes.

---

## 📋 Descripción

El programa permite ingresar el nombre y las notas de cada alumno a través de un formulario, calcula automáticamente los promedios individuales y del curso, clasifica a los alumnos en aprobados o reprobados, y presenta los resultados de forma ordenada.

---

## 🗂️ Estructura del Proyecto

```
notas/
├── index.html    # Estructura de la página y formulario
├── styles.css    # Estilos visuales del programa
└── formulario.js        # Lógica del programa en JavaScript
```

---

## ⚙️ Funcionalidades

- Ingreso de nombre y notas de hasta **10 alumnos** mediante formulario
- Validación de datos: notas entre **0 y 100**, nombre obligatorio
- Cálculo del **promedio individual** de cada alumno
- Cálculo del **promedio del curso** por certamen (C1, C2, C3)
- Cálculo del **promedio general** del curso
- Clasificación de alumnos: **Aprobado** (promedio ≥ 55) / **Reprobado** (promedio < 55)
- **Ranking** de alumnos ordenado de mayor a menor promedio
- Botón para **reiniciar** el programa

---

## 🧠 Estructuras de Datos

```javascript
let nombres = [];   // Arreglo unidimensional — almacena los nombres (máx. 10)
let notas   = [];   // Matriz [10][3] — fila por alumno, columna por certamen
```

## 🚀 ¿Cómo ejecutarlo?

1. Descarga o clona el repositorio
2. Abre la carpeta del proyecto en **VS Code**
3. Inicia **Live Server** haciendo clic derecho en `index.html` → *Open with Live Server*
4. Ingresa los datos de cada alumno y haz clic en **Agregar Alumno**
5. Cuando termines, presiona **Ver Resultados**

---

## 📊 Resultado Esperado

Al ingresar los datos de los alumnos, el programa muestra:

```
Nombre 1: Carlos
C1: 78 | C2: 98 | C3: 74
Promedio: 83.33

Nombre 2: Juan
C1: 34 | C2: 50 | C3: 24
Promedio: 36.00

──────────────────────────
Promedio del curso C1: 56.00
Promedio del curso C2: 74.00
Promedio del curso C3: 49.00
Promedio Final Curso:  59.67
Aprobados:  1
Reprobados: 1

📊 Ranking por promedio
#1 Carlos — 83.33 ✅ Aprobado
#2 Juan   — 36.00 ❌ Reprobado
```

---

## 👨‍💻 Autor

**Vladimir Sebastian Acelas Rodriguez**  
