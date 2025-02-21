const express = require('express');
const app = express();

app.use(express.json());

// Endpoint GET : retourne un message de bienvenue
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

// Endpoint POST : additionne deux nombres envoyés dans le corps de la requête
app.post('/add', (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res
      .status(400)
      .json({ error: 'Invalid input. a and b must be numbers.' });
  }
  const result = a + b;
  res.status(200).json({ result });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app; // Export de l'app pour les tests
