<template>
    <div class="container mt-4">
      <h2>Détail de la commande</h2>
      <div v-if="order">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ order.product.name }}</h5>
            <img :src="order.product.image" alt="product image" style="max-width: 100%;" />
            <p class="card-text">{{ order.product.description }}</p>
            <p class="card-text">Prix: {{ order.product.price }} €</p>
            <p class="card-text">Quantité: {{ order.quantity }}</p>
            <p class="card-text">Commentaire du consultant en chargé: {{ order.comment }}</p>
            <p class="card-text">Date ajoutée: {{ order.date_added }}</p>
            
          </div>
        </div>
      </div>
      <div v-else>
        <p>Chargement...</p>
      </div>
    </div>
  </template>
  
  <script>
  import getAPI from '@/axios-api';
  
  export default {
    data() {
      return {
        order: null,
      };
    },
    async created() {
      const orderId = this.$route.params.id;
      try {
        const response = await getAPI.get(`/customer-orderitem/${orderId}/`);
        this.order = response.data;
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la commande :', error);
      }
    },
  };
  </script>
  
  <style scoped>
  .card {
    margin-top: 20px;
  }
  </style>
  