//CONTENEDOR SOBRE

const openBtn = document.getElementById('open-btn');
const contenedorFormulario = document.querySelector('.formulario');

if (openBtn && contenedorFormulario) {
    openBtn.addEventListener("click", () => {
        contenedorFormulario.classList.toggle("open");

        if (contenedorFormulario.classList.contains("open")) {
            openBtn.textContent = "cerrar sobre";
        } else {
            openBtn.textContent = "abrir sobre";
        }
    });
} 

// HOJA DEL FORMULARIO
const formularioSobre = document.getElementById('formulario-sobre');

if (formularioSobre) {
    formularioSobre.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (nombre === "" || email === "" || password === "") {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        if (!email.includes("@") || !email.includes('.')) {
            alert("Por favor, ingrese un correo electrónico válido.");
            return;
        }

        if (password.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        alert('¡Formulario enviado con éxito!');
        formularioSobre.reset(); 
    });
}

//Correo seguro
const btnRevelarEmail = document.getElementById('btn-revelar-email');

if (btnRevelarEmail) {
    btnRevelarEmail.addEventListener('click', () => {
        const usuario = btnRevelarEmail.getAttribute('data-usuario');
        const dominio = btnRevelarEmail.getAttribute('data-dominio');
        const correoCompleto = `${usuario}@${dominio}`;
        
        const parentParagraph = btnRevelarEmail.parentElement;
        parentParagraph.innerHTML = `Email: <a href="mailto:${correoCompleto}">${correoCompleto}</a>`;
    });
}














    