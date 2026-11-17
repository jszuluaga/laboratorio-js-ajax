/* =================================
   EJERCICIO AJAX
================================= */

// Obtener los elementos de la página.
const campoURL = document.getElementById("urlSolicitud");
const botonMostrar = document.getElementById("btnMostrar");
const estadoSolicitud = document.getElementById("estadoSolicitud");
const codigoEstado = document.getElementById("codigoEstado");
const textoEstado = document.getElementById("textoEstado");
const cabecerasRespuesta = document.getElementById("cabecerasRespuesta");
const contenidoRespuesta = document.getElementById("contenidoRespuesta");

// Cargar la dirección de la página al iniciar.
campoURL.value = window.location.href;


/* =================================
   FUNCIÓN PARA REALIZAR LA SOLICITUD
================================= */

function mostrarContenidos() {

    const url = campoURL.value.trim();

    // Validar que el campo no esté vacío.
    if (url === "") {
        estadoSolicitud.textContent = "Estado: ingresa una dirección URL.";
        return;
    }

    // Validar el formato de la dirección.
    let direccion;

    try {
        direccion = new URL(url);
    } catch {
        estadoSolicitud.textContent = "Estado: ingresa una dirección URL válida.";
        return;
    }

    if (direccion.protocol !== "http:" && direccion.protocol !== "https:") {
        estadoSolicitud.textContent = "Estado: utiliza una dirección HTTP o HTTPS.";
        return;
    }

    // Preparar los espacios de respuesta.
    estadoSolicitud.textContent = "Estado: preparando solicitud...";
    codigoEstado.textContent = "Pendiente";
    textoEstado.textContent = "Pendiente";
    cabecerasRespuesta.textContent = "Esperando respuesta del servidor...";
    contenidoRespuesta.textContent = "Esperando contenido...";

    // Crear el objeto para la solicitud AJAX.
    const solicitud = new XMLHttpRequest();

    // Abrir una solicitud GET.
    solicitud.open("GET", direccion.href, true);

    // Establecer un tiempo máximo de espera.
    solicitud.timeout = 20000;

    // Detectar los cambios en el estado de la solicitud.
    solicitud.onreadystatechange = function () {

        switch (solicitud.readyState) {

            case 1:
                estadoSolicitud.textContent = "Estado: conexión establecida.";
                break;

            case 2:
                estadoSolicitud.textContent = "Estado: se recibieron las cabeceras.";
                codigoEstado.textContent = solicitud.status;
                textoEstado.textContent = solicitud.statusText;
                cabecerasRespuesta.textContent =
                    solicitud.getAllResponseHeaders() || "No hay cabeceras disponibles.";
                break;

            case 3:
                estadoSolicitud.textContent = "Estado: recibiendo contenido...";
                break;

            case 4:

                if (solicitud.status !== 0) {

                    estadoSolicitud.textContent = "Estado: solicitud completada.";

                    codigoEstado.textContent = solicitud.status;
                    textoEstado.textContent = solicitud.statusText;

                    cabecerasRespuesta.textContent =
                        solicitud.getAllResponseHeaders() || "No hay cabeceras disponibles.";

                    contenidoRespuesta.textContent =
                        solicitud.responseText || "La respuesta no contiene información.";

                }
                break;
        }
    };

    // Manejar errores de conexión.
    solicitud.onerror = function () {
        estadoSolicitud.textContent = "Estado: error al realizar la solicitud.";
        codigoEstado.textContent = "No disponible";
        textoEstado.textContent = "Error de conexión o acceso.";
        cabecerasRespuesta.textContent = "No fue posible obtener las cabeceras.";
        contenidoRespuesta.textContent =
            "No se pudo acceder al contenido solicitado. Comprueba la dirección o los permisos de acceso.";
    };

    // Manejar el tiempo de espera agotado.
    solicitud.ontimeout = function () {
        estadoSolicitud.textContent = "Estado: tiempo de espera agotado.";
        codigoEstado.textContent = "No disponible";
        textoEstado.textContent = "Tiempo de espera agotado.";
        cabecerasRespuesta.textContent = "No se recibieron cabeceras.";
        contenidoRespuesta.textContent =
            "El servidor tardó demasiado en responder.";
    };

    // Enviar la solicitud.
    estadoSolicitud.textContent = "Estado: enviando solicitud...";
    solicitud.send();
}


/* =================================
   EVENTOS
================================= */

botonMostrar.addEventListener("click", mostrarContenidos);
