const env=require('dotenv');
env.config();
module.exports={
    PORT:process.env.port, 
    FLIGHT_SERVICE_PATH:process.env.flight_service_path
};