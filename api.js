//FUNCION DE BUSQUEDA
function buscarPelicula(titulo) {
  const apiKey = "7cfeefaf";
  //CLAVE PROPORCIONADA DE LA API AMDb
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${titulo}&type=movie`;
  // PARAMETROS QUERY: apikey=${apiKey}  LA CLAVE,
  //s=${titulo}  PARAMETRO TITULO, type=movie  TIPO DE RESULTADO TYPE(PELICULA,
  //SERIE Y EPISODIO) DE LA API.  CON LA S HACEMOS LA BUSQUEDA DE TITULO

  return (
    fetch(url)
      // SOLICITUD AL HTTP, DEVOLUCION DE LA LLAMADA QUE RECIBE LA RESPUESTA DE ESA SOLICITUD
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Error al buscar películas: " + response.statusText);
        }
        //VERIFICAMOS SI LA RESPUESTA ES EXISTOSA SI NO LO ES ARROJA UN ERROR QUE INCLUYE EL ESTADO
        return response.json();
      })
      // SI ES EXITOSO CON EL METODO JSON
      //NOS DEVUELVE UNA PROMESA QUE RESUELVE EL CUERPO COMO OBJETO JS

      .then(function (data) {
        return data.Search || [];
      })
      // CON EL METODO THEN MANEJAMOS LOS DATA DEVUELTA POR LA API - Y CON SEARCH ALMACENAMOS
      //UN ARRAY DE OBJETOS PARA REPRESENTAR CADA PELICULA EL CUAL COINCIDE CON LO PROPORCIONADO
      //POR LA EL IMPUT DE BUSQUEDA

      .catch(function (error) {
        console.error("Error al buscar películas:", error);
        return [];
      })
  );
  // CON CHATCH MANEJAMOS CUALQUIER ERROR QUE SUCEDA EN LA BUSQUEDA Y
  //CON ESO SE PUEDE VER EN CONSOLA
}

//FUNCION POR DETALLE
async function obtenerDetallesPelicula(id) {
  //CON ASYNC DESIGNAMOS QUE SERA ASINCRONICA Y DEVOLVERA UNA PROMESA
  const apiKey = "7cfeefaf";
  //CLAVE PROPORCIONADA DE LA API AMDb
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`;
  // PARAMETROS QUERY: apikey=${apiKey}  LA CLAVE, i=${id} PARAMETRO ID ES UNICO PARA CADA PELICULA,
  //plot=full EL NIVEL DE DETALLE DE LA PELICULA EN CASO FULL ES TODA LA TRAMA PROPORCIONADO POR LA
  //API

  try {
    const response = await fetch(url);
    //CON AWAIT INDICAMOS QUE EL PROGRAMA DEBE ESPERAR QUE LA SOLICITUD Y RESPUESTA
    //SE RESUELVA PRIMERO ANTES DE CONTINUAR
    if (!response.ok) {
      throw new Error("La respuesta de la red no fue exitosa");
    }
    const data = await response.json();
    //CON AWAIT INDICAMOS QUE EL PROGRAMA DEBE ESPERAR QUE LA SOLICITUD Y RESPUESTA
    //SE RESUELVA PRIMERO ANTES DE CONTINUAR
    // SI ES EXITOSO CON EL METODO JSON
    //NOS DEVUELVE UNA PROMESA QUE RESUELVE EL CUERPO COMO OBJETO JS

    return data;
    //LOS DETALLES RETORNAN COMO OBJETOS
  } catch (error) {
    console.error("Error al obtener detalles de la película:", error);
    throw error;
    // CON CHATCH MANEJAMOS CUALQUIER ERROR QUE SUCEDA EN LA BUSQUEDA Y
    //CON ESO SE PUEDE VER EN CONSOLA EL CONSOLE NOS AYUDA A EVIDENCIAR EL PROBLEMA
  }
}

//RESTRUCTURAR LA URL DE BUSQUEDA - POR AÑO NO SE PUEDE

//FUNCION POR AÑO
function obtenerPeliculasPorAnio() {
  const apiKey = "7cfeefaf";
  //CLAVE PROPORCIONADA DE LA API AMDb
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=&type=movie&y=`;
  return (
    //PARAMETROS QUERY: apikey=${apiKey}  LA CLAVE, s=& PARAMETRO QUE INDICA EL TERMINO DE
    //BUSQUEDA, type=movie TYPE(PELICULA,SERIE Y EPISODIO) DE LA API, y= PEDIMOS EL AÑO
    //DE LANZAMIENTO
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La respuesta de la red no fue exitosa");
        }
        //VERIFICAMOS SI LA RESPUESTA ES EXISTOSA SI NO LO ES ARROJA UN ERROR QUE INCLUYE EL ESTADO
        return response.json();
      })
      // SI ES EXITOSO CON EL METODO JSON
      //NOS DEVUELVE UNA PROMESA QUE RESUELVE EL CUERPO COMO OBJETO JS
      .catch((error) => {
        console.error(
          "Error al obtener películas por año de lanzamiento:",
          error.message
        );
        return [];
      })
  );
  // CON CHATCH MANEJAMOS CUALQUIER ERROR QUE SUCEDA EN LA BUSQUEDA Y
  //CON ESO SE PUEDE VER EN CONSOLA
}

export { buscarPelicula, obtenerDetallesPelicula, obtenerPeliculasPorAnio };
