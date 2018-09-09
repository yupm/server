const express = require('express');
const mongoose= require('mongoose');
const keys = require('./config/keys');
require('./services/passport');
require('./models/User');
const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const app = express('mongodb://<dbuser>:<dbpassword>@ds149732.mlab.com:49732/emailydevmil');
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);