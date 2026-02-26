const request = require("supertest");
const app = require("../../app");
const sequelize = require("../../config/database");
const Admin = require("../../models/Admin");
const bcrypt =  require("bcrypt");

describe("Test d' Integration : Authentification Administrateur", () =>{
    
    beforeAll(async  () =>{
        await sequelize.sync({force: true});
        const hashedPassword = await bcrypt.hash("password123", 10);
        await Admin.create({email:"admin@test.com", password:hashedPassword});
    });

    test("POST /api/auth/login - succes avec identifiants corrects", async ()=>{
        const res = await request(app)
        .post("/api/auth/login")
        .send({email: "admin@test.com", password: "password123"});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("token");
    });

    test("POST /api/auth/login - Echec avec mauvais mot de passe" , async() =>{
        const res = await request(app)
        .post("/api/auth/login")
        .send({email:"admin@test.com", password:"kiki"});
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toBe("Accès refusé : vérifiez vos identifiants");
    });
});