const mongoose=require('mongoose');
const {PORT, DB, HOST}=process.env.MongoDB;
mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`,{ useNewUrlParser: true })
.then(() => console.log('Connected to database')).catch((e) => console.log('Connection to MongoDB failed!:( \n' + e))

module.exports=mongoose