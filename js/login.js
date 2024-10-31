document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = this.elements[0].value;
    const password = this.elements[1].value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error); });
        }
        return response.json(); // Si todo está bien, parseamos el JSON
    })
    .then(data => {
        alert(data.message);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'profile.html'; // Redirige al perfil
    })
    .catch(error => {
        alert(error.message); // Muestra el mensaje de error
    });
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = this.elements[0].value;
    const email = this.elements[1].value;
    const password = this.elements[2].value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => {
        if (!response.ok) throw new Error('Error en registro');
        return response.text();
    })
    .then(message => {
        alert(message);
        // Opcional: redirigir o limpiar el formulario
    })
    .catch(error => {
        alert(error.message);
    });
});
