// Serve the login page
app.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                // On successful login, redirect to the payment confirmation page
                res.redirect('/payment_confirmation.html');
            } else {
                res.send('Incorrect password');
            }
        } else {
            res.send('User not found');
        }
    });
});
