const bcrypt = require ("bcrypt");
module.exports = {
    async up(queryInterface){
        const passwordHash = await bcrypt.hash("admin123", 10);
        await queryInterface.bulkInsert("Admins", [
            {
                email: "admin@site.com",
                password: passwordHash,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface){
        await queryInterface.bulkDelete("Admins", null, {});
    }
};