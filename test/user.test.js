const knex = require('../src/common/db');
const app = require('../src/app');
const userObj = {name: "Juan", email: "juan@email.com", password: "pass", role: "admin"};

const request = require('supertest');;
let server;

beforeAll( async () => {
    try{
        await knex.migrate.latest();
        server = app.listen(8085);
    }
    catch(error){
        console.log(error);
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
        const [ id ] = await knex.insert(userObj).into('users')
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
});