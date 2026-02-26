const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");
const sequelize = require('../../config/database');
const { Category, Product } = require('../../models');

describe("Test d Integration pour Categorie", () => {
    let token;
    let createdCategory;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        
        token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET || 'secret');
    });

    afterAll(async () => {
        await sequelize.close();
    });

    
    test('POST /api/admin/categories - Création réussie (Admin)', async () => {
        const res = await request(app)
            .post('/api/admin/categories')
            .set('Authorization', `Bearer ${token}`) 
            .send({ name: 'Bijoux' }); 
        
        createdCategory = res.body; 
        expect(res.statusCode).toEqual(201); 
        expect(res.body.name).toBe('Bijoux'); 
        expect(res.body).toHaveProperty('slug', 'bijoux'); 
    });

   
    test('GET /api/categories - Récupération de la liste', async () => {
        const res = await request(app).get('/api/categories'); 
        expect(res.statusCode).toEqual(200); 
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    
    test('GET /api/categories/:slug/products - Succès', async () => {
        const res = await request(app).get(`/api/categories/${createdCategory.slug}/products`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /api/categories/:slug/products - Catégorie inexistante (404)', async () => {
        const res = await request(app).get('/api/categories/slug-imaginaire/products');
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Categorie non trouvee");
    });

   
    test('DELETE /api/admin/categories/:id - Suppression réussie', async () => {
        const res = await request(app)
            .delete(`/api/admin/categories/${createdCategory.id}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Catégorie supprimée avec succès");
    });

    test('DELETE /api/admin/categories/:id - Catégorie inexistante (404)', async () => {
        const res = await request(app)
            .delete('/api/admin/categories/9999')
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Catégorie non trouvée");
    });
});