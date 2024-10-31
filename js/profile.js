// Cargar información del usuario desde localStorage
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    // Si no hay usuario en localStorage, redirige a login
    window.location.href = 'login.html';
}

document.getElementById('upload-picture').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        // Cambia la fuente de la imagen a la nueva foto
        document.getElementById('profile-picture').src = e.target.result;
        // Guarda la URL en localStorage
        localStorage.setItem('profilePicture', e.target.result);
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

//Reset the image
document.getElementById('reset-picture').addEventListener('click', function() {
    localStorage.removeItem('profilePicture');
    document.getElementById('profile-picture').src = 'default-profile.png'; // Reemplaza con la ruta de tu imagen predeterminada
});

// Al cargar la página, verifica si hay una foto guardada
window.onload = function() {
    const savedPicture = localStorage.getItem('profilePicture');
    if (savedPicture) {
        document.getElementById('profile-picture').src = savedPicture;
    }
};
// Resto del código...


// Cargar información del usuario
document.getElementById('user-name').querySelector('span').textContent = user.name;
document.getElementById('user-email').querySelector('span').textContent = user.email;
document.getElementById('user-address').querySelector('span').textContent = user.address;

// Función para abrir el modal de edición de contraseña
document.getElementById('edit-password-button').addEventListener('click', function() {
    document.getElementById('password-modal').style.display = "block";
});

// Función para cerrar el modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('password-modal').style.display = "none";
});

// Guardar nueva contraseña (simulación)
document.getElementById('save-password').addEventListener('click', function() {
    const newPassword = document.getElementById('new-password').value;
    // Aquí deberías hacer una llamada al backend para guardar la nueva contraseña
    console.log('Nueva contraseña guardada:', newPassword);
    document.getElementById('password-modal').style.display = "none";
});

// Función para descargar la información en Excel
document.getElementById('download-button').addEventListener('click', function() {
    const data = [
        ['Nombre', user.name],
        ['Correo', user.email],
        ['Dirección', user.address],
    ];
    
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Perfil');
    
    XLSX.writeFile(workbook, 'perfil_usuario.xlsx');
});
