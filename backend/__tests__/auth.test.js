const request = require('supertest');
const app = require('../server');
const User = require("../src/models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// // Clear the User table before each test
// beforeAll(async () => {
//     await User.sync({ force: true }); // Reset the database for fresh tests
// });

// Register Tests
describe('POST /auth/register', () => {
    it('devrait enregistrer un nouvel utilisateur avec succés', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                email: 'newuser@example.com',
                password: 'password123',
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user.email).toBe('newuser@example.com');
    });

    it('should return an error if email is invalid', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                email: 'invalid-email',
                password: 'password123',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain('Email invalide');
    });

    it('should return an error if password is missing', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                email: 'test@example.com',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain('Email et mot de passe sont requis');
    });
});

// Login Tests
describe('POST /auth/login', () => {
    // Create a test user before tests
    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create({
            email: 'test@example.com',
            password: hashedPassword,
        });
    });

    it('should log in successfully with correct credentials', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Connexion réussie');
        expect(response.body.token).toBeDefined();
    });

    it('should return an error for wrong password', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Mot de passe incorrect');
    });

    it('should return an error for non-existing user', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'nonexistent@example.com',
                password: 'password123',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Utilisateur non trouvé');
    });
});