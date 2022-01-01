const mongose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDatabase = async()=>{
    
    await mongose.connect(process.env.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    console.log(`Database seeded`);
}

module.exports = connectDatabase;