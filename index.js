const express = require('express');
const { connect } = require('./config/database.js');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index.js');
const { PORT } = require('./config/serverConfig.js');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

// app.post('/createuserinuserTableAndProfile',signUp,createProfile);
app.listen(PORT, async () => {
  console.log(`Server Started on ${PORT}`);
  await connect();

  console.log('MongoDb is connected');
});
