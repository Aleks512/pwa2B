<template>
    <div class="container mt-4">
      <h2>Messages Envoyés</h2>
      <div v-if="messages.length">
        <div v-for="message in messages" :key="message.id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ message.receiver_email }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Envoyé le: {{ formatDate(message.timestamp) }}</h6>
            <p class="card-text">{{ message.content }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Vous n'avez envoyé aucun message.</p>
      </div>
    </div>
  </template>
  
  <script>
  import getAPI from '@/axios-api';
  import { format } from 'date-fns';
  
  export default {
    data() {
      return {
        messages: [],
      };
    },
    async created() {
      try {
        const response = await getAPI.get('/customer-sent-messages/');
        this.messages = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des messages envoyés :', error);
      }
    },
    methods: {
      formatDate(date) {
        return format(new Date(date), 'dd/MM/yyyy HH:mm');
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    background-color: #f8f9fa;
  }
  .card-title {
    color: #333;
  }
  </style>
  