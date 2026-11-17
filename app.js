document.addEventListener("DOMContentLoaded", () => {

    // 1. ANIMACIÓN DEL SOBRE (Abrir / Cerrar con el botón principal)
    const openBtn = document.getElementById('open-btn');
    const contenedorFormulario = document.querySelector('.formulario');

    if (openBtn && contenedorFormulario) {
        openBtn.addEventListener("click", () => {
            contenedorFormulario.classList.toggle("open");
            openBtn.textContent = contenedorFormulario.classList.contains("open") ? "Cerrar sobre" : "Abrir sobre";
        });
    }

    // 2. VALIDACIÓN DE FORMULARIO, LOCALSTORAGE Y CIERRE AUTOMÁTICO AL ENVIAR
    const formularioSobre = document.getElementById('formulario-sobre');
    if (formularioSobre) {
        formularioSobre.addEventListener('submit', (e) => {
            e.preventDefault();
        //obtiene los valores, lee lo que escribio el usuario. Trim elimina espacios en blancos
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
        //si un campo esta vacio muestra un alerta. Return detiene, ña ejecucuión
            if (nombre === "" || email === "" || mensaje === "") {
                alert("Por favor, complete todos los campos obligatorios.");
                return;
            }

            // Validación de email con Regex, comprueba que este bien escrito
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Por favor, ingrese un correo electrónico válido.");
                return;
            }

            // Objeto con la consulta de seguridad
            const nuevaConsulta = {
                id: Date.now(),
                nombre: nombre,
                email: email,
                mensaje: mensaje,
                fecha: new Date().toLocaleDateString()
            };

            // Guarda en localStorage con  (try/catch)
            //JSON.parse convierte el texto en un array de objeto,Si no hay nada lo devuelve nulo
            //Consultas.push, agrega una nueva consulta al final de arrays.
            //JSCON.stringify (consultas) convierte el array a texto (locals solo guarda texto)
            //LocalStorage.setitem, guarda texto en el navegador
            //TRY/CATCH, si algo falla, no rompe la pagina, control
            try {
                let consultas = JSON.parse(localStorage.getItem('consultasSeguridad')) || [];
                consultas.push(nuevaConsulta);
                localStorage.setItem('consultasSeguridad', JSON.stringify(consultas));

                alert('¡Consulta de seguridad enviada y guardada con éxito!');
                
                // Resetea los campos del formulario
                formularioSobre.reset();

                // Cierra el sobre automáticamente y cambia el texto del botón a "Abrir sobre"
                if (contenedorFormulario && contenedorFormulario.classList.contains("open")) {
                    contenedorFormulario.classList.remove("open");
                    if (openBtn) {
                        openBtn.textContent = "Abrir sobre";
                    }
                }
            } catch (error) {
                console.error("Error al guardar en localStorage:", error);
                alert("Hubo un problema al guardar la consulta en el navegador.");
            }
        });
    }

    // 3. CORREO SEGURO (Protección anti-spam)
    const botonesRevelar = document.querySelectorAll('.btn-revelar-email');
    botonesRevelar.forEach(btn => {
        btn.addEventListener('click', () => {
            const usuario = btn.getAttribute('data-usuario');
            const dominio = btn.getAttribute('data-dominio');
            const correoCompleto = `${usuario}@${dominio}`;
            
            const parentParagraph = btn.parentElement;
            parentParagraph.innerHTML = `Email: <a href="mailto:${correoCompleto}">${correoCompleto}</a>`;
        });
    });

    // 4. CONSUMO DE API PÚBLICA 
    const apiContainer = document.getElementById('api-container');
    
    if (apiContainer) {
        // Estado de carga inicial
        apiContainer.innerHTML = `<p class="loading">Verificando conexión segura y red...</p>`;

        const urlAPI = 'https://api.ipify.org?format=json';

        fetch(urlAPI)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al conectar con el servidor de red.');
                }
                return response.json(); // Conversión de la respuesta con json
            })
            .then(data => {
                // Validación de ausencia de resultados
                if (!data.ip) {
                    apiContainer.innerHTML = `<p>No se encontró información de la IP.</p>`;
                    return;
                }

                // Mostrar los datos externos dentro del DOM
                apiContainer.innerHTML = `
                    <div style="background: #e0f7fa; padding: 15px; border-radius: 8px; border-left: 4px solid #004d40;">
                        <p><strong>Dirección IP detectada:</strong> ${data.ip}</p>
                        <p style="font-size: 0.85rem; color: #00796b; margin-top: 5px;">⚠️ Mantenga su red protegida y evite compartir su IP con fuentes desconocidas.</p>
                    </div>
                `;
            })
            .catch(error => {
                // Manejo de errores obligatorio
                console.error("Hubo un problema con la API:", error);
                apiContainer.innerHTML = `
                    <p style="color: #c62828;">❌ No se pudo cargar la información de seguridad en este momento. Verifique su conexión a internet.</p>
                `;
            });
    }

});
// PROFE TUVE QUE HACER VARIAS VECES EL FORMULARIO 








    