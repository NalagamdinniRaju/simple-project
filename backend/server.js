const express = require('express');
const cors = require("cors")
const app = express();
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")


app.use(cors());
app.use(express.json());

dotenv.config()

// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     console.log("Connected to MongoDB")
// })
// .catch((error) => {console.log(`Connection Error ${error}`)})
connectDB();


app.use("/api/auth", authRoutes);





// app.get('/', (req,res) => {
//     console.log("Helo")
//     res.json("hello world")
// })



const PORT = process.env.PROT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})