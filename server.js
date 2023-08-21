const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
app.use(bodyParser.json());

const professorRoutes = require('./routes/profRoutes');
app.use('/professor', professorRoutes);
app.use('/professor', professorRoutes);

app.listen(PORT, () => {
    console.log(`Server iniciado na porta: ${PORT}`);
});