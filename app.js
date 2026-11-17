//Espera a que se cargue el HTML completo antes de ejeuctar el código JS
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
            e.preventDefault(); //evita que se recargue automaticamente
            
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            //para que no haya campos vacios
            if (nombre === "" || email === "" || mensaje === "") {
                alert("Por favor, complete todos los campos obligatorios.");
                return;
            }

            // Validación de email con Regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Por favor, ingrese un correo electrónico válido.");
                return;
            }

            const nuevaConsulta = {
                id: Date.now(),
                nombre: nombre,
                email: email,
                mensaje: mensaje,
                fecha: new Date().toLocaleDateString()
            };
            //Guarda en localStorage de forma segura con TRY/CATCH
            try {
                let consultas = JSON.parse(localStorage.getItem('consultasSeguridad')) || [];
                consultas.push(nuevaConsulta);
                localStorage.setItem('consultasSeguridad', JSON.stringify(consultas));

                alert('¡Consulta de seguridad enviada y guardada con éxito!');
                formularioSobre.reset(); //limpia el formulario

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

    // 3. CORREO SEGURO (Protección anti-spam con createElement y textContent)
    const botonesRevelar = document.querySelectorAll('.btn-revelar-email');
    botonesRevelar.forEach(btn => {
        btn.addEventListener('click', () => {
            const usuario = btn.getAttribute('data-usuario');
            const dominio = btn.getAttribute('data-dominio');
            const correoCompleto = `${usuario}@${dominio}`;
            
            const parentParagraph = btn.parentElement;
            
            // Textcontent lo interpreta como texto plano
            parentParagraph.textContent = 'Email: ';
            
            const enlace = document.createElement('a');
            enlace.href = `mailto:${correoCompleto}`;
            enlace.textContent = correoCompleto; // Previene ataques XSS
            
            parentParagraph.appendChild(enlace);
        });
    });

    // 4. CONSUMO DE API PÚBLICA (Enfoque híbrido seguro para la IP)
    const apiContainer = document.getElementById('api-container');
    
    if (apiContainer) {
        apiContainer.textContent = "Verificando conexión segura y red...";

        const urlAPI = 'https://api.ipify.org?format=json';

        fetch(urlAPI)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al conectar con el servidor de red.');
                }
                return response.json();
            })
            .then(data => {
                if (!data.ip) {
                    apiContainer.textContent = "No se encontró información de la IP.";
                    return;
                }

                // Estructura limpia con un span seguro para insertar la IP
                apiContainer.innerHTML = `
                    <div style="background: #e0f7fa; padding: 15px; border-radius: 8px; border-left: 4px solid #004d40;">
                        <p><strong>Dirección IP detectada:</strong> <span id="ip-text"></span></p>
                        <p style="font-size: 0.85rem; color: #00796b; margin-top: 5px;">⚠️ Mantenga su red protegida y evite compartir su IP con fuentes desconocidas.</p>
                    </div>
                `;
                
                // Asignación segura del texto de la IP
                document.getElementById('ip-text').textContent = data.ip;
            })
            .catch(error => {
                console.error("Hubo un problema con la API:", error);
                apiContainer.innerHTML = `
                    <p style="color: #c62828;">❌ No se pudo cargar la información de seguridad en este momento. Verifique su conexión a internet.</p>
                `;
            });
    }

});
// PROFE TUVE QUE HACER VARIAS VECES EL FORMULARIO 








    