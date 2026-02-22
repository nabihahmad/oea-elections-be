const express = require("express");
const cors = require('cors');
const app = express();
const { port } = require("./config/env");

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));

const connectDB = require('./config/db');
connectDB();

const authRoutes = require("./app/routes/auth");
const engineerRoutes = require("./app/routes/engineer");
const voteRoutes = require("./app/routes/vote");
const reportingRoutes = require("./app/routes/reporting");
const adminRoutes = require("./app/routes/admin");

const requiredRole = require("./app/middleware/auth");

app.use("/auth", authRoutes);
app.use("/engineer", requiredRole('registrator'), engineerRoutes);
app.use("/vote", requiredRole('voting_agent'), voteRoutes);
app.use("/reporting", requiredRole('reporter'), reportingRoutes);
app.use("/admin", requiredRole('admin'), adminRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
