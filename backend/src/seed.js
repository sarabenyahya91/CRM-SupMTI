const sequelize = require('./config/database');
const User = require('./models/user.model');
const Client = require('./models/client.model');
const bcrypt = require('bcrypt');

const seedData = async () => {
    try {
        console.log('Seeding data...');
        console.log('Tentative de connexion à la base de données...');
        await sequelize.authenticate();
        console.log(`\x1b[32mConnexion à la base de données réussie  ${process.env.DB_NAME}.\x1b[0m`);
        // Synchronisation des modèles
        await sequelize.sync({ force: true }); // Attention : cela efface les données existantes

        // Création de quelques utilisateurs
        const users = await User.bulkCreate([
            {
                email: 'ahmed.benali@example.com',
                password: await bcrypt.hash('password1', 10),
                name: 'Ahmed Benali',
                phone: '+212612345678'
            },
            {
                email: 'fatima.chaoui@example.com',
                password: await bcrypt.hash('password2', 10),
                name: 'Fatima Chaoui',
                phone: '+212698765432',
            },
            {
                email: 'mohamed.amine@example.com',
                password: await bcrypt.hash('password3', 10),
                name: 'Mohamed Amine',
                phone: '+212623456789',
            },
        ]);

        console.log('Utilisateurs créés :', users.map((u) => u.name));

        // Création de 20 clients associés aux utilisateurs
        const clients = await Client.bulkCreate([
            { name: 'Youssef El Mounir', email: 'youssef.mounir@example.com', phone: '+212661234567', address: '12 Rue Al Amal, Casablanca', userId: users[0].id },
            { name: 'Samira Belkacem', email: 'samira.belkacem@example.com', phone: '+212662345678', address: '45 Avenue Hassan II, Rabat', userId: users[1].id },
            { name: 'Ali El Idrissi', email: 'ali.idrissi@example.com', phone: '+212663456789', address: '78 Boulevard Mohamed V, Marrakech', userId: users[2].id },
            { name: 'Khadija Bakkali', email: 'khadija.bakkali@example.com', phone: '+212664567890', address: '32 Rue Al Massira, Fès', userId: users[0].id },
            { name: 'Hassan Tazi', email: 'hassan.tazi@example.com', phone: '+212665678901', address: '50 Rue Annakhil, Tanger', userId: users[1].id },
            { name: 'Leila Naciri', email: 'leila.naciri@example.com', phone: '+212666789012', address: '23 Avenue Al Qods, Rabat', userId: users[2].id },
            { name: 'Amal Rachidi', email: 'amal.rachidi@example.com', phone: '+212667890123', address: '10 Boulevard Zerktouni, Casablanca', userId: users[0].id },
            { name: 'Nabil Jabri', email: 'nabil.jabri@example.com', phone: '+212668901234', address: '15 Rue Al Falah, Fès', userId: users[1].id },
            { name: 'Rania El Mansouri', email: 'rania.elmansouri@example.com', phone: '+212669012345', address: '40 Rue Moulay Abdellah, Marrakech', userId: users[2].id },
            { name: 'Omar Lahmar', email: 'omar.lahmar@example.com', phone: '+212670123456', address: '65 Avenue Hassan II, Tanger', userId: users[0].id },
            { name: 'Sofia Berrada', email: 'sofia.berrada@example.com', phone: '+212671234567', address: '28 Rue Al Amal, Rabat', userId: users[1].id },
            { name: 'Karim Oukili', email: 'karim.oukili@example.com', phone: '+212672345678', address: '33 Avenue Mohamed V, Casablanca', userId: users[2].id },
            { name: 'Imane Lahlou', email: 'imane.lahlou@example.com', phone: '+212673456789', address: '75 Rue Abdelmoumen, Fès', userId: users[0].id },
            { name: 'Rachid Hamdani', email: 'rachid.hamdani@example.com', phone: '+212674567890', address: '10 Rue Annakhil, Marrakech', userId: users[1].id },
            { name: 'Amina Zahidi', email: 'amina.zahidi@example.com', phone: '+212675678901', address: '20 Boulevard Al Massira, Tanger', userId: users[2].id },
            { name: 'Zakaria Touil', email: 'zakaria.touil@example.com', phone: '+212676789012', address: '18 Rue Ibn Sina, Casablanca', userId: users[0].id },
            { name: 'Meryem Bennani', email: 'meryem.bennani@example.com', phone: '+212677890123', address: '9 Avenue Hassan II, Rabat', userId: users[1].id },
            { name: 'Abdelhak Moussadak', email: 'abdelhak.moussadak@example.com', phone: '+212678901234', address: '22 Rue Al Amal, Fès', userId: users[2].id },
            { name: 'Latifa Idrissi', email: 'latifa.idrissi@example.com', phone: '+212679012345', address: '34 Rue Annakhil, Marrakech', userId: users[0].id },
            { name: 'Said Benchekroun', email: 'said.benchekroun@example.com', phone: '+212680123456', address: '8 Rue Al Falah, Tanger', userId: users[1].id },
        ]);

        console.log('Clients créés :', clients.map((c) => c.name));

        console.log('Seeding terminé avec succès !');
        process.exit(0); // Quitter le processus une fois terminé
    } catch (error) {
        console.error('Erreur pendant le seeding :', error.message);
        process.exit(1); // Quitter le processus en cas d'erreur
    }
};

seedData();

