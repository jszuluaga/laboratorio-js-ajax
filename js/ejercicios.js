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
   EVENTOS DEL EJERCICIO 1
================================= */

document.getElementById("btnPalindromo")
    .addEventListener("click", comprobarPalindromo);
