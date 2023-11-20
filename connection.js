const mongoose = require('mongoose');

DB = async()=>{
try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Db connection established");
    
} catch (error) {
    console.log("DB connection error", error);
}
}
module.exports = DB;