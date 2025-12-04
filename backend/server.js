require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./config/db');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const goalRoutes = require('./routes/goals');
const assignRoutes = require('./routes/assign');
const usersLookup = require('./routes/users_lookup');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/assign', assignRoutes);
app.use('/api/users_lookup', usersLookup);

// Public info
app.get('/api/public-info', (req, res) => {
  res.json({
    title: 'Public Health Info',
    items: [
      { title: 'COVID-19 Updates', body: 'Stay informed and vaccinated.' },
      { title: 'Seasonal Flu', body: 'Get annual influenza vaccine.' }
    ]
  });
});

// Swagger
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 4000;
connect(process.env.MONGO_URI || 'mongodb://localhost:27017/healthportal')
  .then(()=> app.listen(PORT, ()=> console.log(`Server running on ${PORT}`)))
  .catch(err => { console.error(err); process.exit(1); });
