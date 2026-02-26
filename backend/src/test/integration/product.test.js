
const request = require('supertest');
const app = require('../../app');
const sequelize = require('../../config/database');
describe('Integration Test: Product Controller', () => {
    beforeAll(async () => {
       
        await sequelize.sync({ force: true }); 
    });
    test('POST /api/admin/products - Doit rejeter sans Token', async () => {
        const res = await request(app)
            .post('/api/admin/products')
            .send({ name: "Produit sans auth" }); 
        
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toBe("Non Autorise"); 
    });

    test('GET /api/products - Doit retourner la liste des produits', async () => {
        const res = await request(app).get('/api/products'); 
        expect(res.statusCode).toEqual(200);
    });

    test('GET /api/products/:slug - Doit retourner 404 si inexistant', async () => {
        const res = await request(app).get('/api/products/slug-imaginaire'); 
        expect(res.statusCode).toEqual(404); 
    });
    afterAll(async () => {
    await sequelize.close(); 
});
});