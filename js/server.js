const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',     // Cambia esto a tu usuario de MySQL
    password: '', // Cambia esto a tu contraseña de MySQL
    database: 'Redtab_usuarios'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para registrarse
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Encriptar la contraseña
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send('Error al encriptar la contraseña');

        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(sql, [name, email, hash], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send('El correo ya está en uso');
                }
                return res.status(500).send('Error al registrar el usuario');
            }
            res.status(201).send('Usuario registrado con éxito');
        });
    });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al consultar el usuario' });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) return res.status(500).json({ error: 'Error al comparar contraseñas' });
            if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

            res.status(200).json({
                message: 'Inicio de sesión exitoso',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    address: user.address
                }
            });
        });
    });
});

app.post('/update-password', (req, res) => {
    const { newPassword } = req.body;
    const userId = user.id;

    bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: 'Error al encriptar la nueva contraseña' });

        const sql = 'UPDATE users SET password = ? WHERE id = ?';
        db.query(sql, [hash, userId], (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar la contraseña' });
            res.status(200).json({ message: 'Contraseña actualizada con éxito' });
        });
    });
});



app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

