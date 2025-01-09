const http = require('http');
const app = require('./app')


// const populatedb = require('./populatedb/Populate');
// populatedb();
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
