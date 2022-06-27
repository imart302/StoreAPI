const path = require('path');
const env = process.env.NODE_ENV;

//IN PROUCTION VARS ARE IN THE SYSTEM
if(env){
    require('dotenv').config({path: path.join(__dirname, '.' + env + '.env')})
}

const app = require('./src/app');

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
});