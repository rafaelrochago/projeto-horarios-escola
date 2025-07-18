app.get('/usuarios/novo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'usuario_cadastro.html'));
});
