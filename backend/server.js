const express = require('express');
const bodyParser = require('body-parser')
const user=require('./routes/users');
const cors = require('cors');
const db = require('./models');
const env = require('dotenv');

env.config();
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Test database connection
db.sequelize.sync().then(() => {
  console.log('Database connected!');
});


// Routes
app.use("/api/users", user);

 


const PORT = 3000||3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});