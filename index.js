const express = require('express');
const cors = require('cors');

const clothesRoute = require('./route/route.js');

const db = require('./models')
const app = express();
const PORT = process.env.PORT || 5000;

// Options
app.use(cors());
app.use(express.json());

// Route for root
app.get('/', (req, res) => {
  res.send('Halo');
});

// Routes
app.use('/api', clothesRoute);

// Run App
db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
});
