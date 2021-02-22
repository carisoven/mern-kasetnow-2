const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({path:'./dev.env'})

// * install Express
const app = express();

// * Connect Database
connectDB();

// * Init Middleware
app.use(express.json({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// Define Routes
app.use("/api/users", require("./router/api/users"));
app.use('/api/shop', require("./router/api/shop"));
app.use("/api/product",require("./router/api/product"));
// app.use('/api/profile', require('./routes/api/profile'));
// app.use('/api/posts', require('./routes/api/posts'));

// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
