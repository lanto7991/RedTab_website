document.getElementById('start-button').addEventListener('click', function() {
    window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
});

document.getElementById('edit-password-button').addEventListener('click', function() {
    window.location.href = 'edit-password.html'; // Redirige a la página de inicio de sesión
});

document.getElementById('logoutButton').addEventListener('click', function() {
    // Aquí puedes agregar la lógica para cerrar sesión
    // Por ejemplo, eliminar el token de sesión o redirigir al usuario
    alert('Has cerrado sesión.');
    // Redirigir a la página de inicio
    window.location.href = 'login.html';
}); 
