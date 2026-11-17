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

// Cargar automáticamente la URL de esta página.
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

    // Validar el formato y el protocolo de la URL.
    let direccion;

    try {
        direccion = new URL(url);
    } catch {
        estadoSolicitud.textContent = "Estado: ingresa una dirección URL válida.";
        return;
    }

    if (!["http:", "https:"].includes(direccion.protocol)) {
        estadoSolicitud.textContent = "Estado: utiliza una dirección HTTP o HTTPS.";
        return;
    }

    // Restablecer la información antes de iniciar una nueva solicitud.
    estadoSolicitud.textContent = "Estado: solicitud en preparación.";
    codigoEstado.textContent = "Pendiente";
    textoEstado.textContent = "Pendiente";
    cabecerasRespuesta.textContent = "Esperando respuesta del servidor...";
    contenidoRespuesta.textContent = "Esperando contenido...";

    // Crear el objeto XMLHttpRequest.
    const solicitud = new XMLHttpRequest();

    // Configurar una solicitud GET asíncrona.
    solicitud.open("GET", direccion.href, true);

    // Establecer un tiempo máximo de espera de 20 segundos.
    solicitud.timeout = 20000;

    // Actualizar la información según el estado de la solicitud.
    solicitud.onreadystatechange = function () {

        switch (solicitud.readyState) {

            case 1:
                estadoSolicitud.textContent = "Estado: conexión establecida.";
                break;

            case 2:
                estadoSolicitud.textContent = "Estado: se recibieron las cabeceras.";
                break;

            case 3:
                estadoSolicitud.textContent = "Estado: recibiendo contenido...";
                break;

            case 4:
                // Obtener el código y el texto de estado HTTP.
                codigoEstado.textContent = solicitud.status;

                textoEstado.textContent =
                    solicitud.statusText ||
                    (solicitud.status === 200 ? "OK" : "Respuesta recibida");

                // Obtener las cabeceras de la respuesta.
                cabecerasRespuesta.textContent =
                    solicitud.getAllResponseHeaders() ||
                    "No hay cabeceras disponibles.";

                // Mostrar el contenido recibido.
                contenidoRespuesta.textContent =
                    solicitud.responseText ||
                    "La respuesta no contiene información.";

                // Identificar si la respuesta fue satisfactoria.
                if (solicitud.status >= 200 && solicitud.status < 300) {
                    estadoSolicitud.textContent = "Estado: solicitud completada correctamente.";
                } else {
                    estadoSolicitud.textContent = "Estado: el servidor respondió con un error HTTP.";
                }

                break;
        }
    };

    // Gestionar errores de conexión o restricciones de acceso.
    solicitud.onerror = function () {

        estadoSolicitud.textContent = "Estado: error al realizar la solicitud.";
        codigoEstado.textContent = "No disponible";
        textoEstado.textContent = "Error de conexión o acceso.";
        cabecerasRespuesta.textContent = "No fue posible obtener las cabeceras.";
        contenidoRespuesta.textContent =
            "No se pudo acceder al contenido solicitado. Comprueba la dirección o los permisos de acceso.";
    };

    // Gestionar el tiempo de espera agotado.
    solicitud.ontimeout = function () {

        estadoSolicitud.textContent = "Estado: tiempo de espera agotado.";
        codigoEstado.textContent = "No disponible";
        textoEstado.textContent = "Tiempo de espera agotado.";
        cabecerasRespuesta.textContent = "No se recibieron cabeceras.";
        contenidoRespuesta.textContent =
            "El servidor tardó demasiado en responder.";
    };

    // Enviar la solicitud al servidor.
    estadoSolicitud.textContent = "Estado: enviando solicitud...";
    solicitud.send();
}


/* =================================
   EVENTOS
================================= */

// Ejecutar la solicitud al pulsar el botón.
botonMostrar.addEventListener("click", mostrarContenidos);
