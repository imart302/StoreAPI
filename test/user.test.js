const knex = require('../src/common/db');
const app = require('../src/app');
const userObj = {name: "Juan", email: "juan@email.com", password: "pass", role: "admin"};

const request = require('supertest');
jest.useRealTimers();
let server;

beforeAll( async () => {
    
    try{
        await knex.migrate.latest();
        console.log(await knex.migrate.list());
        server = app.listen(8085);
    }
    catch(error){
        console.log("🚀 ~ file: user.test.js ~ line 17 ~ beforeAll ~ error", error)
    }
});

afterEach( async () => {
    await knex.delete().from('users');
});

afterAll( async () => {
    try{
        server.close();
    }
    catch(error){
        console.log("🚀 ~ file: user.test.js ~ line 25 ~ afterAll ~ error", error)
    }
});

describe("GET USERS", () => {
    it('get user', async () => {
        const [ id ] = await knex.insert(userObj).into('users');
        console.log("🚀 ~ file: user.test.js ~ line 52 ~ it ~ result", id)
        

        const response = await request('http://localhost:8085')
            .get(`/user/${id}`);
        expect(response.body.email).toEqual(userObj.email);
    });

});


describe('POST USERS', () => {
    it('create user', async () => {
        const response = await request('http://localhost:8085')
            .post('/user')
            .send(userObj);


        const [ user ] = await knex.select('name', 'email').from('users').where('email', 'juan@email.com');
        console.log("🚀 ~ file: user.test.js ~ line 30 ~ test ~ user", user);
        
        expect(user.email).toEqual('juan@email.com');
    });

    it('check fields', async () => {
        let {email, ... remain} = userObj;
        const response = await request('http://localhost:8085')
            .post('/user')
            .send(remain);
        
        expect(response.status).toEqual(400);
    });

    it('should not repeat email', async () => {
        const [ id ] = await knex.insert(userObj).into('users');
        
        const response = await request('http://localhost:8085')
            .post('/user')
            .send(userObj);
        
        expect(response.status).toEqual(400);
    });
});

describe('PUT USER', () => {
    it('change name', async () => {
        const [ id ] = await knex.insert(userObj).into('users');

        const response = await request('http://localhost:8085')
            .put(`/user/${id}`)
            .send({name: "Juan Peres"});

        const response2 = await request('http://localhost:8085')
            .get(`/user/${id}`);

        expect(response2.body.name).toEqual("Juan Peres");
    });
});


describe('DELETE USER', () => {
    it('should remove user', async () => {

        const [ id ] = await knex.insert(userObj).into('users');

        const response = await request('http://localhost:8085')
            .delete(`/user/${id}`);

        expect(response.status).toEqual(200);

        const response2 = await request('http://localhost:8085')
            .get(`/user/${id}`);

        expect(response2.status).toEqual(404);
    });
});