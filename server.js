const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://outro-endereco.com'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const professorRoutes = require('./app/routes/profRoutes');
app.use('/professor', professorRoutes);

const disciplineRoutes = require('./app/routes/disciplineRoutes');
app.use('/disciplina', disciplineRoutes);

const phaseRoutes = require('./app/routes/phaseRoutes');
app.use('/fase', phaseRoutes);

const ensalarRoutes = require('./app/routes/ensalarRoutes');
app.use('/ensalar', ensalarRoutes);

app.listen(PORT, () => {
    console.log(`Server iniciado na porta: ${PORT}`);
});
