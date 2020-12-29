const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const db = require('./queries');
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.get('/professors', db.getProfessors)
app.get('/professors/:id', db.getProfessorsById)
app.post('/professors', db.createProfessors)
app.put('/professors/:id', db.updateProfessors)
app.delete('/professors/:id', db.deleteProfessors)

app.get('/reviews', db.getReviews)
app.get('/reviews/:id', db.getReviewsById)
app.post('/reviews', db.createReviews)
app.put('/reviews/:id', db.updateReviews)
app.delete('/reviews/:id', db.deleteReviews)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})