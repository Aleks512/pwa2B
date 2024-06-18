<template>
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 class="display-4">{{ title }}</h1>
            <p class="lead">{{ content }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArticleView',
    data() {
        return {
            title: "A PROPOS DE NOUS",
            content: "Nous sommes Ventalis, votre partenaire de confiance pour la vente de produits marketing et la visibilité de votre entreprise. Avec un chiffre d'affaires de 3 millions d'euros, nous sommes fiers d'être une Licorne 100% française avec 50 salariés répartis dans toute la France. Chez Ventalis, nous mettons notre expertise et notre savoir-faire à votre disposition pour vous accompagner dans votre stratégie marketing et vous aider à atteindre vos objectifs."
        };
    }
}
</script>

<style scoped>
.jumbotron {
    background-color: #f8f9fa;

    padding: 2rem 1rem;
    margin-bottom: 2rem;
    border-radius: 0.3rem;
    color: green;
}

.display-4 {
    font-size: 2.5rem;
    font-weight: bold;
}

.lead {
    font-size: 1.25rem;
}
</style>
