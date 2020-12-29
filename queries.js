const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: ${results.insertId}`);
  });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}


const getProfessors = (request, response) => {
  pool.query('SELECT * FROM professors ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProfessorsById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM professors WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createProfessors = (request, response) => {
  const { name, email, title, school, department } = request.body

  pool.query('INSERT INTO professors (name, email, title, school, department) VALUES ($1, $2, $3, $4, $5)', [name, email, title, school, department], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Professor added with ID: ${results.insertId}`)
  })
}

const updateProfessors = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email, title, school, department } = request.body

  pool.query(
    'UPDATE professors SET name = $1, email = $2, title = $3, school = $4, department = $5 WHERE id = $6',
    [name, email, title, school, department, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Professor modified with ID: ${id}`)
    }
  )
}

const deleteProfessors = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM professors WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Professors deleted with ID: ${id}`)
  })
}





const getReviews = (request, response) => {
  pool.query('SELECT * FROM reviews ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getReviewsById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM reviews WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createReviews = (request, response) => {
  const { professor_id, rating, text } = request.body;

  pool.query('INSERT INTO reviews (professor_id, rating, text) VALUES ($1, $2, $3)', [professor_id, rating, text], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Review added with ID: ${results.insertId}`);
  });
};

const updateReviews = (request, response) => {
  const id = parseInt(request.params.id)
  const { professor_id, rating, text } = request.body

  pool.query(
    'UPDATE reviews SET professor_id = $1, rating = $2, text = $3 WHERE id = $4',
    [professor_id, rating, text, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Review modified with ID: ${id}`);
    }
  );
};

const deleteReviews = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM reviews WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Review deleted with ID: ${id}`)
  })
}





module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfessors,
  getProfessorsById,
  createProfessors,
  updateProfessors,
  deleteProfessors,
  getReviews,
  getReviewsById,
  createReviews,
  updateReviews,
  deleteReviews,
}

// CREATE TABLE professors (ID SERIAL PRIMARY KEY, name VARCHAR(30), email VARCHAR(30), title VARCHAR(30), school VARCHAR(30), department VARCHAR(30)
// );

// CREATE TABLE
// api=> INSERT INTO professors (name, email, title, school, department)
// api-> Values ('Brook', 'bhinton@cca.edu', 'Chair', 'cca', 'film');

// api=> CREATE TABLE reviews (ID SERIAL PRIMARY KEY, professor_id VARCHAR(30), rating FLOAT(10), text VARCHAR(2000));

// api=> INSERT INTO reviews (professor_id, rating, text)
// api-> VALUES (5, 9, 'Great professor!');