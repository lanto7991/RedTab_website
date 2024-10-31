document.getElementById('save-password').addEventListener('click', function() {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Aquí debes implementar la lógica para enviar la nueva contraseña al backend
    // Por ejemplo:
    fetch('http://localhost:3000/update-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword })
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al guardar la contraseña');
        alert('Contraseña actualizada con éxito');
        window.location.href = 'profile.html'; // Regresar al perfil
    })
    .catch(error => {
        alert(error.message);
    });
});
