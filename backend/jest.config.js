module.exports = {
    testEnvironment: "node", // Utiliser l'environnement Node.js pour Jest
    roots: ["<rootDir>/__tests__"], // Répertoire contenant les tests
    collectCoverage: true, // Activer la collecte des statistiques de couverture
    coverageDirectory: "coverage", // Répertoire où sont stockées les données de couverture
    testMatch: ["**/*.test.js"], // Fichiers de test
};
