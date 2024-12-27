const mongoose = require("mongoose")

// const connectDB = mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     console.log("Connected to MongoDB")
// })
// .catch((error) => {console.log(`Connection Error ${error}`)})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            })
        console.log("Connected DB")
        }catch(error){
            console.log(`Connection Error ${error}`)
        }
    }

module.exports = connectDB

