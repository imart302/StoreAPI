const express = require('express');
const db = require('../utils/dbconnection');


function createStore(storeName, address){
    
    return new Promise( (resolve, reject) => {
        const conn = db.getConnection();
        let query = `INSERT INTO Stores (name, address) VALUES ( "${storeName}", "${address}")`;

        conn.query(query, (error, rows, fields) => {
            if(error){
                reject(error);
            }
            else{
                resolve({rows, fields});
            }
            
        });
    });
}

function removeStore(storeId){
    return new Promise ( (resolve, reject) => {
        console.log(storeId);
        const conn = db.getConnection();
        let query = `DELETE FROM Stores WHERE id = ${storeId};`;
        conn.query(query, (err, data) => {
            if(err){
                reject(err);
            }
            else{
                if(data.affectedRows === 0){
                    reject("No data");
                }
                else{
                    resolve(data);
                }
            }
        });
    });
}

function getStore(storeId){

    return new Promise ( (resolve, reject) => {
        const conn = db.getConnection();
        let query = `SELECT id, name, address FROM Stores WHERE id = ${storeId}`;
        conn.query(query, (err, rows, fields) => {
            if(err){
                reject(err);
            }
            else{
                if(rows.length === 0){
                    reject("empty set");
                }
                else{
                    const stores = rows.reduce( (prev, current) => {
                        prev.push({
                            id: current.id,
                            name: current.name,
                            address: current.address
                        });
                        return prev;
                    }, []);
                    resolve(stores[0]);
                }

            }
        });
    });
}

function getStoreWithProducts(storeID){
    return new Promise( (resolve, reject) => {
        const conn = db.getConnection();
        let query = 
        `SELECT \
            S.id, S.name, S.addess, J.pruductID, P.name, J.quantity \
        FROM \
            Stores AS S \
        LEFT JOIN \
            StoreProduct AS J ON J.storeID = Store.id \
        LEFT JOIN \
            Products AS P ON J.productID = P.id` ;
    });
}

function getAllStores(){
    return new Promise ( (resolve, reject) => {
        const conn = db.getConnection();
        let query = `SELECT id, name, address FROM Stores;`;
        conn.query(query, (err, rows, fields) => {
            if(err){
                reject(err);
            }
            else{
                if(rows.length === 0){
                    reject("empty set");
                }
                else{
                    const stores = rows.reduce( (prev, current) => {
                        prev.push({
                            id: current.id,
                            name: current.name,
                            address: current.address
                        });
                        return prev;
                    }, []);
                    resolve(stores);
                }

            }
        });
    });
}

function updateStore(storeID, name, address){
    return new Promise( (resolve, reject) => {
        const conn = db.getConnection();
        let query = `UPDATE Stores SET `;
        let unfinish = false;
        if(name){
            query += `name = "${name}", `;
        }
        if(address){
            query += `address = ${address}`
        }
        else{
            query = query.substring(0, query.length - 3);
        }

        query += ` WHERE id = ${storeID};`;
        
        conn.query(query, (error, data) => {
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        });
    });
}


module.exports = {
    createStore,
    removeStore,
    getStore,
    getAllStores,
    updateStore,
    getStoreWithProducts
}