const mongose = require('mongoose');

const connectDatabase = async ()=>{
    const conn = await mongose.connect(process.env.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
}

module.exports = connectDatabase;