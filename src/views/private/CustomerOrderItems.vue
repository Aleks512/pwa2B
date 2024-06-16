<template>
    <div class="container mt-4">
      <h2>Mes Commandes</h2>
      <div v-if="orders.length">
        <ul class="list-group">
          <li
            v-for="order in orders"
            :key="order.id"
            class="list-group-item"
            @click="viewOrder(order.id)"
            style="cursor: pointer;"
          >
            {{ order.product.name }} - Quantité: {{ order.quantity }} - Date: {{ formatDate(order.date_added) }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Vous n'avez aucune commande.</p>
      </div>
    </div>
  </template>
  
  <script>
  import getAPI from '@/axios-api';
  import { format } from 'date-fns';
  
  export default {
    data() {
      return {
        orders: [],
      };
    },
    async created() {
      try {
        const response = await getAPI.get('/customer-orderitems/');
        this.orders = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    },
    methods: {
      viewOrder(orderId) {
        this.$router.push({ name: 'CustomerOrderItemDetail', params: { id: orderId } });
      },
      formatDate(date) {
        return format(new Date(date), 'dd/MM/yyyy HH:mm');
      },
    },
  };
  </script>
  
  <style scoped>
  .list-group-item:hover {
    background-color: #f0f0f0;
  }
  </style>
  