let pagina = 1; // Página inicial, comenzamos con la primera página

    // Obtiene los botones del DOM utilizando sus IDs
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');

    // Valida que los botones existan en el DOM
    if (btnAnterior && btnSiguiente) {
        // Evento para el botón "Siguiente"
        btnSiguiente.addEventListener('click', () => {
            // Solo permite ir a la siguiente página
            if (pagina < 1000) {
                pagina += 1; // Incrementa la página
                cargarPeliculas(); // Llama a la función para cargar las películas
            }
        });

        // Evento para el botón "Anterior"
        btnAnterior.addEventListener('click', () => {
            // Permite retroceder si no estamos en la página 1
            if (pagina > 1) {
                pagina -= 1; // Decrementa la página
                cargarPeliculas(); // Llama a la función para cargar las películas 
            }
        });
    }

    // Función para cargar las películas desde la API
    const cargarPeliculas = async () => {
        try {
            // Realiza la solicitud a la API para obtener las películas populares
            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
	
            // Verifica si la respuesta fue exitosa (código HTTP 200)
            if (respuesta.ok) {
                // Convierte la respuesta de la API a formato JSON
                const datos = await respuesta.json();
                let peliculas = ''; // Variable para almacenar el HTML

                // Recorre el array de películas
                datos.results.forEach(pelicula => {
                    // Genera el HTML para cada película
                    peliculas += `
                        <div class="pelicula">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
                            <h3 class="titulo">${pelicula.title}</h3>
                        </div>
                    `;
                });

                // Inserta el HTML generado en el contenedor de la página y muestra peliculas
                document.getElementById('contenedor').innerHTML = peliculas;
            } else {
                // Maneja diferentes códigos de error de la API
                if (respuesta.status === 401) {
                    console.error('Error: API Key incorrecta'); // Si el código es 401, la clave API es incorrecta
                } else if (respuesta.status === 404) {
                    console.error('Error: Página no encontrada'); // Si el código es 404, la página no se encuentra
                } else {
                    console.error('Error: Hubo un problema desconocido'); // Otros errores no esperados
                }
            }
        } catch (error) {
            // Si ocurre un error durante la solicitud o procesamiento, lo captura y muestra en consola
            console.error('Error de red o al procesar la solicitud:', error);
        }
    };

    // Llama a la función inicial para cargar las películas al cargar la página
    cargarPeliculas();


