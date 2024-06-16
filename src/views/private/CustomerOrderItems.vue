<template>
    <div class="container mt-4">
      <h2>Mes Commandes</h2>
      <div v-if="loading" class="text-center">Chargement...</div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <div v-if="orderItems.length > 0" class="list-group">
        <a 
          v-for="orderItem in orderItems" 
          :key="orderItem.id" 
          :href="`#/orderitem/${orderItem.id}`" 
          class="list-group-item list-group-item-action"
        >
          <div>
            <h5 class="mb-1">{{ orderItem.product.name }}</h5>
            <p class="mb-1">Quantité: {{ orderItem.quantity }}</p>
            <small>Date ajoutée: {{ formatDate(orderItem.date_added) }}</small>
          </div>
        </a>
      </div>
      <div v-if="orderItems.length === 0 && !loading" class="text-center">Aucune commande trouvée.</div>
    </div>
  </template>
  
  <script>
  import getAPI from '@/axios-api';
  
  export default {
    data() {
      return {
        orderItems: [],
        loading: true,
        errorMessage: ''
      };
    },
    async created() {
      await this.fetchOrderItems();
    },
    methods: {
      async fetchOrderItems() {
        try {
          const response = await getAPI.get('/customer-orderitems/');
          this.orderItems = response.data;
        } catch (error) {
          console.error('Error fetching order items:', error);
          this.errorMessage = 'Erreur lors de la récupération des commandes';
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
  