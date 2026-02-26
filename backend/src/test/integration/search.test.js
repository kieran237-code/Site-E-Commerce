const request = require('supertest');
const app = require('../../app');
const sequelize = require('../../config/database');
require('../../models');
const { Product } = require('../../models');

describe('Recherche de Produits (Search API)', () => {
    
    beforeAll(async () => {
   
        await sequelize.sync({ force: true });

        await Product.bulkCreate([
            { name: "Canapé Cuir", price: 1000, color: "Marron", stock: 5 },
            { name: "Canapé Tissu", price: 500, color: "Bleu", stock: 10 },
            { name: "Table Basse", price: 150, color: "Marron", stock: 2 },
            { name: "Chaise Design", price: 80, color: "Blanc", stock: 20 }
        ]);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('GET /api/products/search - devrait trouver les produits par nom (q)', async () => {
        const res = await request(app).get('/api/product/search?q=Canapé');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2); 
        expect(res.body[0].name).toMatch(/Canapé/);
    });

    test('GET /api/products/search - devrait filtrer par couleur', async () => {
        const res = await request(app).get('/api/product/search?color=Marron');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
        res.body.forEach(p => expect(p.color).toBe("Marron"));
    });

    test('GET /api/products/search - devrait filtrer par fourchette de prix', async () => {
        const res = await request(app).get('/api/product/search?minPrice=100&maxPrice=600');

        expect(res.statusCode).toBe(200);
       
        expect(res.body.length).toBe(2);
        res.body.forEach(p => {
            expect(p.price).toBeGreaterThanOrEqual(100);
            expect(p.price).toBeLessThanOrEqual(600);
        });
    });

    test('GET /api/products/search - devrait retourner vide si aucun résultat', async () => {
        const res = await request(app).get('/api/product/search?q=Inexistant');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });
});