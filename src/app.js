const express = require('express');
const responseHandlers = require('./utils/handleResponses');
const db = require('./utils/database');
const initModels = require('./models/initModels');
const usersRouter = require('./users/users.router');

const app = express();
app.use( express.json() );

// DATABASE
db.authenticate()
  .then( () => console.log('Database Credentials are right'))
  .catch( console.log );

db.sync()
  .then( () => console.log('Database is correctly synchronized'))
  .catch( console.log );

initModels();

// ENDPOINTS
app.get('/', ( _req, res ) => {

  responseHandlers.success({
    res,
    status: 200,
    message: 'Server initialized correctly',
    data: {
      users: 'http://localhost:9000/api/users',
      conversations: 'http://localhost:9000/api/conversations'
    }
  })  

});

app.use('/api/users', usersRouter );

app.use('*', (_req, res) => {

  responseHandlers.error({
    res,
    status: 404,
    message: 'URL not found. Try with http://localhost:9000 to see all available endpoints'
  })

});


app.listen(9000, () => console.log('Server running at http://localhost:9000'));