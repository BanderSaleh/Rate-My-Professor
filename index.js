const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const db = require('./queries');
const port = process.env.PORT || 3000;
var jwt = require('jsonwebtoken');

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static('public'));


function isUser(req, res, next) {
  const token = req.headers["authorization"];
  try {
    var decoded = jwt.verify(token, 'secret');
    req.currentUser = decoded;
    next();
  } catch (error) {
    res.status(401).json("Unauthorized");
  }
}



app.post('/sessions', db.createSession)
app.get('/sessions', db.getSession);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/users', isUser, db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.get('/professors', isUser, db.getProfessors)
app.get('/professors/:id', db.getProfessorsById)
app.post('/professors', isUser, db.createProfessors)
app.put('/professors/:id', db.updateProfessors)
app.delete('/professors/:id', db.deleteProfessors)

app.get('/reviews', db.getReviews)
app.get('/reviews/:id', db.getReviewsById)
app.post('/reviews', isUser, db.createReviews)
app.put('/reviews/:id', db.updateReviews)
app.delete('/reviews/:id', db.deleteReviews)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

