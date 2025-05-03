const express = require(`express`);
const app = express();
const port = 3500;
const bodyParser = require(`body-parser`);
const productRouter = require("./routes/productRoute");
const {sequelize} = require('./utils/db');
const AuthentRouter = require('./routes/authentRoute');

app.use(bodyParser.json());

app.use(`/v1`, productRouter);

app.use('/authent', AuthentRouter);

sequelize
  .sync()
  .then((result) => {
    console.log('Connection has been successful');
  })
  .catch((err) => {
    console.log(`Cant connect to database ${err}`);
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${(port)}`)
});