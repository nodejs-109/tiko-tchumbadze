const epxress = require('express');
const app = epxress();
const port = 3000;
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todoRoute');

app.use(bodyParser.json());

app.use('/v1', todoRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});