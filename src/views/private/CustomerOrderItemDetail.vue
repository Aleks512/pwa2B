<template>
    <div class="container mt-4">
      <h2>Détails de la Commande</h2>
      <div v-if="loading" class="text-center">Chargement...</div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <div v-if="orderItem" class="card">
        <img :src="orderItem.product.image" class="card-img-top" alt="Image du produit">
        <div class="card-body">
          <h5 class="card-title">{{ orderItem.product.name }}</h5>
          <p class="card-text">{{ orderItem.product.description }}</p>
          <p class="card-text"><strong>Prix:</strong> {{ orderItem.product.price }} €</p>
          <p class="card-text"><strong>Quantité:</strong> {{ orderItem.quantity }}</p>
          <p class="card-text"><strong>Commentaire:</strong> {{ orderItem.comment }}</p>
          <p class="card-text"><small>Date ajoutée: {{ formatDate(orderItem.date_added) }}</small></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import getAPI from '@/axios-api';
  
  export default {
    data() {
      return {
        orderItem: null,
        loading: true,
        errorMessage: ''
      };
    },
    async created() {
      await this.fetchOrderItemDetail();
    },
    methods: {
      async fetchOrderItemDetail() {
        const orderItemId = this.$route.params.id;
        try {
          const response = await getAPI.get(`/customer-orderitem/${orderItemId}/`);
          this.orderItem = response.data;
        } catch (error) {
          console.error('Error fetching order item details:', error);
          this.errorMessage = 'Erreur lors de la récupération des détails de la commande';
        } finally {
          this.loading = false;
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleString();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ajouter des styles supplémentaires si nécessaire */
  </style>
  