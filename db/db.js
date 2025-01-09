const mongoose = require('mongoose');


// Database Connection
module.exports.createDBConnection = function() {
    mongoose.connect(process.env.DB_URI).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('DB Connection Error:', err));
}