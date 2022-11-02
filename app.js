const express = require("express");
const cors = require("cors");
const postRoutes = require('./routes/post');
const authRoutes= require('./routes/auth');
const app = express();

app.use(cors());

app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));   
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes)

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


