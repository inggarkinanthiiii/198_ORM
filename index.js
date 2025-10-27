const express = require('express');
const app = express();
const db = require('./models');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

db.sequelize.sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log('Server Started');
    });
  })
  .catch((err) => {
    console.log(err);
  });