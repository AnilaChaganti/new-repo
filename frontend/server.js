const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongoUrl', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
app.use(express.json());

// API routes
app.use(require('./backend/routes/auth'));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));


// Serve static assets (React frontend) if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
