const knex = require('../src/common/db');
const app = require('../src/app');

const users = require('./user.example.json');
const stores = require('./stores.example.json');

const request = require('supertest');

let server;

beforeAll( async () => {
    try{
        await knex.migrate.latest();
        server = app.listen(8085);
        // const resTrx = await knex.transaction(async (trx) => {
        //     const [ resp ] = await trx('users').insert(users[0]);
        //     const [ resp2 ] = await trx('users').insert(users[1]);
        //     return [resp, resp2];
        // });

        await request('http://localhost:8085')
            .post('/user')
            .send(users[0]);
        
        await request('http://localhost:8085')
            .post('/user')
            .send(users[1]);
        
        
    }
    catch(error){
        console.log("🚀 ~ file: store.test.js ~ line 15 ~ beforeAll ~ error", error)
    }
});


afterAll( async () => {
    try{
        await knex.delete().from('users');
        await knex.delete().from('stores');
        server.close();
    }
    catch(error){
        console.log("🚀 ~ file: store.test.js ~ line 34 ~ afterAll ~ error", error)
    }
});

describe('POST', () => {
    it('should insert a product', async () => {
        
        const responseauth = await request('http://localhost:8085')
            .post('/auth')
            .send({email: users[0].email, password: users[0].password });

        const token = responseauth.body.token;
        console.log("🚀 ~ file: store.test.js ~ line 50 ~ it ~ token", token)

        const resstore = await request('http://localhost:8085')
            .post('/store')
            .set('Authorization', 'bearer ' + token)
            .send(stores[0])

        expect(resstore.status).toEqual(200);

    });
});
