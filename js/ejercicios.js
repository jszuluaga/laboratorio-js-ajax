/* =================================
   FUNCIONES AUXILIARES
================================= */

// Normalizar el texto para facilitar su comparación.
function normalizarTexto(texto) {
    return texto
        .toLocaleLowerCase("es")
        .replace(/ñ/g, "\uE000")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\uE000/g, "ñ")
        .replace(/[^a-z0-9ñ]/g, "");
}

// Normalizar las vocales conservando los demás caracteres.
function normalizarVocales(texto) {
    return texto
        .toLocaleLowerCase("es")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// Limpiar los campos y el resultado de un ejercicio.
function limpiarEjercicio(idsCampos, idResultado) {
    idsCampos.forEach(id => {
        document.getElementById(id).value = "";
    });

    document.getElementById(idResultado).textContent = "";

    // Dejar el cursor en el primer campo para una nueva operación.
    document.getElementById(idsCampos[0]).focus();
}


/* =================================
   EJERCICIO 1: IDENTIFICAR PALÍNDROMOS
================================= */

function comprobarPalindromo() {

    const texto = document.getElementById("textoPalindromo").value.trim();
    const resultado = document.getElementById("resultadoPalindromo");

    // Validar que el campo no esté vacío.
    if (texto === "") {
        resultado.textContent = "Por favor, ingresa una palabra o frase.";
        return;
    }

    // Normalizar el texto ingresado.
    const textoNormalizado = normalizarTexto(texto);

    // Validar que existan letras o números.
    if (textoNormalizado === "") {
        resultado.textContent = "Ingresa un texto que contenga letras o números.";
        return;
    }

    // Invertir el texto normalizado.
    const textoInvertido = Array.from(textoNormalizado)
        .reverse()
        .join("");

    // Comparar el texto original con el invertido.
    const esPalindromo = textoNormalizado === textoInvertido;

    resultado.textContent = esPalindromo
        ? "El texto ingresado es un palíndromo."
        : "El texto ingresado no es un palíndromo.";
}


/* =================================
   EJERCICIO 2: COMPARAR DOS NÚMEROS
================================= */

function compararNumeros() {

    const campoNumero1 = document.getElementById("numero1");
    const campoNumero2 = document.getElementById("numero2");
    const resultado = document.getElementById("resultadoComparacion");

    const valor1 = campoNumero1.value.trim();
    const valor2 = campoNumero2.value.trim();

    // Validar que ambos campos tengan información.
    if (valor1 === "" || valor2 === "") {
        resultado.textContent = "Por favor, ingresa los dos números.";
        return;
    }

    // Convertir los valores a números.
    const numero1 = Number(valor1);
    const numero2 = Number(valor2);

    // Validar que sean valores numéricos válidos.
    if (!Number.isFinite(numero1) || !Number.isFinite(numero2)) {
        resultado.textContent = "Ingresa valores numéricos válidos.";
        return;
    }

    // Comparar los números ingresados.
    if (numero1 > numero2) {
        resultado.textContent = `El número ${numero1} es mayor.`;
    } else if (numero2 > numero1) {
        resultado.textContent = `El número ${numero2} es mayor.`;
    } else {
        resultado.textContent = "Los dos números son iguales.";
    }
}


/* =================================
   EJERCICIO 3: IDENTIFICAR VOCALES
================================= */

function identificarVocales() {

    const texto = document.getElementById("textoVocales").value.trim();
    const resultado = document.getElementById("resultadoVocales");

    // Validar que el campo no esté vacío.
    if (texto === "") {
        resultado.textContent = "Por favor, ingresa una frase.";
        return;
    }

    // Normalizar el texto ingresado.
    const textoNormalizado = normalizarVocales(texto);

    // Identificar las vocales presentes sin repetirlas.
    const vocales = ["a", "e", "i", "o", "u"];

    const vocalesEncontradas = vocales.filter(vocal =>
        textoNormalizado.includes(vocal)
    );

    // Mostrar el resultado.
    if (vocalesEncontradas.length > 0) {
        resultado.textContent = `Las vocales encontradas son: ${vocalesEncontradas.join(", ")}.`;
    } else {
        resultado.textContent = "La frase ingresada no contiene vocales.";
    }
}


/* =================================
   EJERCICIO 4: CONTAR VOCALES
================================= */

function contarVocales() {

    const texto = document.getElementById("textoConteo").value.trim();
    const resultado = document.getElementById("resultadoConteo");

    // Validar que el campo no esté vacío.
    if (texto === "") {
        resultado.textContent = "Por favor, ingresa una frase.";
        return;
    }

    // Normalizar el texto ingresado.
    const textoNormalizado = normalizarVocales(texto);

    // Definir las vocales que se van a contar.
    const vocales = ["a", "e", "i", "o", "u"];

    // Contar las apariciones de cada vocal.
    const conteo = {};

    vocales.forEach(vocal => {
        conteo[vocal] = Array.from(textoNormalizado)
            .filter(letra => letra === vocal).length;
    });

    // Construir el resultado de los conteos.
    resultado.textContent = vocales
        .map(vocal => `${vocal.toUpperCase()}: ${conteo[vocal]}`)
        .join(" | ");
}


/* =================================
   EVENTOS DE LOS EJERCICIOS
================================= */

// Ejercicio 1.
document.getElementById("btnPalindromo")
    .addEventListener("click", comprobarPalindromo);

document.getElementById("btnLimpiarPalindromo")
    .addEventListener("click", () => {
        limpiarEjercicio(["textoPalindromo"], "resultadoPalindromo");
    });

// Ejercicio 2.
document.getElementById("btnComparar")
    .addEventListener("click", compararNumeros);

document.getElementById("btnLimpiarComparacion")
    .addEventListener("click", () => {
        limpiarEjercicio(["numero1", "numero2"], "resultadoComparacion");
    });

// Ejercicio 3.
document.getElementById("btnVocales")
    .addEventListener("click", identificarVocales);

document.getElementById("btnLimpiarVocales")
    .addEventListener("click", () => {
        limpiarEjercicio(["textoVocales"], "resultadoVocales");
    });

// Ejercicio 4.
document.getElementById("btnContar")
    .addEventListener("click", contarVocales);

document.getElementById("btnLimpiarConteo")
    .addEventListener("click", () => {
        limpiarEjercicio(["textoConteo"], "resultadoConteo");
    });
