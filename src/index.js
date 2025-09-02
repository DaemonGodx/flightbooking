const express=require('express');
const bodyParser=require('body-parser');
const {PORT,FLIGHT_SERVICE_PATH}=require('./config/envi');
const routes=require('./routes/index');
const db=require('./models/index');

async function startServer(){
    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',routes);

    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
    if(process.env.db_sync){
        await db.sequelize.sync({alter:true});
    }

}
startServer(); 