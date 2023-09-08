const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
app.use(bodyParser.json());

const professorRoutes = require('./app/routes/profRoutes');
app.use('/professor', professorRoutes);

const disciplineRoutes = require('./app/routes/disciplineRoutes');
app.use('/disciplina', disciplineRoutes);

const classroomsRoutes = require('./app/routes/classroomRoutes');
app.use('/sala', classroomsRoutes);

app.listen(PORT, () => {
    console.log(`Server iniciado na porta: ${PORT}`);
});