const request = require('supertest');
const app = require('../../app');
const sequelize = require('../../config/database');
require('../../models');
const { Product, Image } = require('../../models');
const cloudinary = require('../../config/cloudinary');
const jwt = require('jsonwebtoken');

// Mock stable pour Cloudinary
jest.mock('../../config/cloudinary', () => ({
    uploader: {
        destroy: jest.fn().mockResolvedValue({ result: 'ok' }),
        upload_stream: jest.fn().mockImplementation((options, callback) => {
            const { PassThrough } = require('stream');
            const mockStream = new PassThrough();
            mockStream.on('finish', () => {
                callback(null, { 
                    public_id: 'test_id', 
                    secure_url: 'http://test.com/img.jpg' 
                });
            });
            return mockStream;
        })
    }
}));

describe('Admin Product Controller (Create & Remove)', () => {
    let token;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    
        token = jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_SECRET || 'secret');
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('POST /api/admin/products', () => {
        test('devrait créer un produit sans images', async () => {
            const res = await request(app)
                .post('/api/admin/products')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: "Table Basse",
                    price: 150,
                    description: "Une belle table",
                    color: "Noir"
                });

            expect(res.statusCode).toBe(201);
          
            expect(res.body.product).toHaveProperty('name', 'Table Basse');
        });

        test('devrait créer un produit AVEC des images (simulées)', async () => {
            const res = await request(app)
                .post('/api/admin/products')
                .set('Authorization', `Bearer ${token}`)
                .field('name', 'Produit Image')
                .field('price', 50)
                .field('color', 'Rouge')
                .attach('images', Buffer.from('fake-image-data'), 'test.jpg');

            expect(res.statusCode).toBe(201);
            
            const productId = res.body.product.id;
            const imgInDb = await Image.findOne({ where: { product_id: productId } });
            expect(imgInDb).not.toBeNull();
        });
    });

    describe('DELETE /api/admin/products/:id', () => {
        let productToDelete;

        beforeEach(async () => {
            productToDelete = await Product.create({ 
                name: "A supprimer", 
                price: 10, 
                color: "Gris" 
            });
            await Image.create({ 
                url: "test.com", 
                public_id: "id_test_cloudinary", 
                product_id: productToDelete.id 
            });
        });

        test('devrait supprimer le produit et appeler Cloudinary', async () => {
            const res = await request(app)
                .delete(`/api/admin/products/${productToDelete.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
           
            expect(res.body.message).toMatch(/supprimé/i);

            expect(cloudinary.uploader.destroy).toHaveBeenCalledWith("id_test_cloudinary");
            const checkProd = await Product.findByPk(productToDelete.id);
            expect(checkProd).toBeNull();
        });
    });
});