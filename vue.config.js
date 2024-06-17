const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // Transpile les dépendances pour assurer la compatibilité avec tous les navigateurs
  transpileDependencies: true,

  // Désactive le linting automatique à chaque sauvegarde (développement)
  lintOnSave: false,

  // Spécifie le chemin de base pour toutes les ressources du projet. Ici, '/' signifie la racine du domaine.
  publicPath: '/',

  // Définit le répertoire où les fichiers de build seront générés. Par défaut, c'est 'dist'.
  outputDir: 'dist',

  // Spécifie le répertoire où les ressources statiques seront placées dans le répertoire de build.
  assetsDir: 'static',

  // Désactive la génération des cartes de source (source maps) pour le build de production afin de réduire la taille du build.
  productionSourceMap: false,

  // Configuration du serveur de développement pour le proxy des API
  // Cette configuration n'affecte que l'environnement de développement.
  devServer: {
    proxy: {
      // Configure un proxy pour rediriger les appels API vers un backend local.
      // Cela permet de contourner les problèmes de CORS en développement.
      '/api': {
        // L'URL de la cible du proxy. Dans ce cas, c'est le backend local à l'adresse http://localhost:8080.
        target: 'http://localhost:8080',
        
        // Modifie l'origine de la requête pour correspondre à celle de la cible du proxy.
        changeOrigin: true,
        
        // Désactive la vérification SSL si la cible utilise HTTPS avec un certificat auto-signé.
        secure: false,
      }
    }
  }
});
