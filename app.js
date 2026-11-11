document.addEventListener("DOMContentLoaded", () => {

    // ANIMACIÓN DEL SOBRE (Manipulación del DOM y Eventos)
    const openBtn = document.getElementById('open-btn');
    const contenedorFormulario = document.querySelector('.formulario');

    if (openBtn && contenedorFormulario) {
        openBtn.addEventListener("click", () => {
            contenedorFormulario.classList.toggle("open");
            openBtn.textContent = contenedorFormulario.classList.contains("open") ? "Cerrar sobre" : "Abrir sobre";
        });
    }

    // FOCUS INTERACTIVO EN INPUTS (Eventos DOM)
    const inputNombre = document.getElementById('nombre');
    if (inputNombre) {
        inputNombre.addEventListener("focus", () => {
            inputNombre.style.backgroundColor = "lightyellow";
        });
        inputNombre.addEventListener("blur", () => {
            inputNombre.style.backgroundColor = "";
        });
    }

    // VALIDACIÓN DE FORMULARIO Y LOCALSTORAGE
    const formularioSobre = document.getElementById('formulario-sobre');
    if (formularioSobre) {
        formularioSobre.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = inputNombre.value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (nombre === "" || email === "" || mensaje === "") {
                alert("Por favor, complete todos los campos obligatorios.");
                return;
            }

            if (!email.includes("@") || !email.includes('.')) {
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

            // Almacenamiento local (LocalStorage convertido con JSON)
            let consultas = JSON.parse(localStorage.getItem('consultasSeguridad')) || [];
            consultas.push(nuevaConsulta);
            localStorage.setItem('consultasSeguridad', JSON.stringify(consultas));

            alert('¡Consulta de seguridad enviada y guardada con éxito!');
            formularioSobre.reset();
        });
    }

    // CORREO SEGURO (Protección anti-spam en el DOM)
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

});
// PROFE TUVE QUE HACER VARIAS VECES EL FORMULARIO PORQUE NO CUMPLIA CON LAS CONSIGNA, SINO TENGO OTRA PÁG








    