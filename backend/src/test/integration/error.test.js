const request = require('supertest');
const app = require('../../app');
const sequelize = require('../../config/database');
const { Category } = require('../../models');
const jwt = require('jsonwebtoken');

describe('Gestionnaire d Erreurs (Error Middleware)', () => {
    let token;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
   
        token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret');
    });

    afterAll(async () => {
        await sequelize.close();
    });

 
    test('devrait retourner 400 pour une erreur de validation (nom vide)', async () => {
        const res = await request(app)
            .post('/api/admin/categories')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: "" }); 
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/validation/i);
    });

    test('devrait retourner 400 pour une contrainte d unicité (doublon)', async () => {
     
        await Category.create({ name: 'Unique' });
        
       
        const res = await request(app)
            .post('/api/admin/categories')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Unique' });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/existante/i);
    });

   
    test('devrait retourner 500 en cas d erreur imprévue', async () => {
   
    const spy = jest.spyOn(Category, 'findAll').mockImplementationOnce(() => {
        throw new Error('Crash test');
    });

    const res = await request(app).get('/api/categories');
    
    expect(res.statusCode).toBe(500);
    
    expect(res.body).toHaveProperty('message', "Erreur interne du serveur");
    
    spy.mockRestore();
});
});