const mysql = require('mysql2');

class DBConnection {
    static connection;

    constructor(){

    }

    static getConnection(){
        if(!this.connection){
            this.connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'room302',
                multipleStatements: true,
                database: 'StoreAPI',
            
            });
        }
        return this.connection;
    }
}

module.exports = DBConnection;





