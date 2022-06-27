const path = require('path');
const env = process.env.NODE_ENV;

//IN PROUCTION VARS ARE IN THE SYSTEM
if(env){
    console.log(path.join(__dirname, '.' + env + '.env'));
    require('dotenv').config({path: path.join(__dirname, '.' + env + '.env')})
    console.log(env);
    console.log(process.env.DBNAME);
}

const app = require('./src/app');

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
});