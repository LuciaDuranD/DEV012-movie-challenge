import { buscarPelicula, obtenerDetallesPelicula } from "./api.js";

const formBusqueda = document.getElementById("busca");
const inputBusqueda = document.getElementById("buscador");
const detallesPeliculas = document.getElementById("detalles-peliculas");

function mostrarDetallesPelicula(resultados) {
  detallesPeliculas.innerHTML = "";

  resultados.forEach((pelicula) => {
    const peliculaDiv = document.createElement("div");
    peliculaDiv.classList.add("pelicula");
    peliculaDiv.innerHTML = `
          <div class="detalle-pelicula">
              <h2>${pelicula.Title}</h2>
              <p>Año: ${pelicula.Year}</p>
          </div>
          <img src="${pelicula.Poster}" alt="${pelicula.Title}">
        `;
    detallesPeliculas.appendChild(peliculaDiv);
    console.log("Detalles de la película:", pelicula);
  });
}

async function buscarPeliculaPorId(id) {
  //CON ASYNC DESIGNAMOS QUE SERA ASINCRONICA Y DEVOLVERA UNA PROMESA
  try {
    const detalles = await obtenerDetallesPelicula(id);
    //CON AWAIT INDICAMOS QUE EL PROGRAMA DEBE ESPERAR QUE LA SOLICITUD Y RESPUESTA
    //SE RESUELVA PRIMERO ANTES DE CONTINUAR
    mostrarDetallesPelicula([detalles]);
  } catch (error) {
    console.error("Error al buscar la película:", error);
  }
}

formBusqueda.addEventListener("submit", async (event) => {
  event.preventDefault();
  const termino = inputBusqueda.value.trim();
  if (termino) {
    if (termino.startsWith("tt")) {
      buscarPeliculaPorId(termino);
    } else {
      try {
        const resultados = await buscarPelicula(termino);
        console.log("Resultados de la búsqueda:", resultados);
        mostrarDetallesPelicula(resultados);
      } catch (error) {
        console.error("Error al buscar películas:", error);
      }
    }
  } else {
    console.log("Por favor, ingresa un título o ID de película");
  }
});
