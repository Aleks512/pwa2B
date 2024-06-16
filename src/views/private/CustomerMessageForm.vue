<template>
  <div class="container mt-4">
    <h2>Envoyer un message à </h2>
    
    <CustomerConsultant />
    
    <form @submit.prevent="sendMessage">
      <div class="mb-3">
        <label for="receiver_email" class="form-label">Email du destinataire</label>
        <input type="email" v-model="message.receiver_email" id="receiver_email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Message</label>
        <textarea v-model="message.content" id="content" class="form-control" required></textarea>
      </div>
      <button type="submit" class="btn custom-button">Envoyer</button>
    </form>
    <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
    
    <!-- Messages reçus -->
    <hr class="my-4">
    <ReceivedMessages />
  </div>
</template>

<script>
import getAPI from '@/axios-api';
import ReceivedMessages from '@/components/ReceivedMessages.vue';
import CustomerConsultant from '@/components/CustomerConsultant.vue';

export default {
  components: {
    ReceivedMessages,
    CustomerConsultant, 
  },
  data() {
    return {
      message: {
        receiver_email: '',
        content: ''
      },
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async sendMessage() {
      try {
        await getAPI.post('/customer-create-message/', this.message);
        this.successMessage = 'Message envoyé avec succès!';
        this.errorMessage = '';
        this.message.receiver_email = '';
        this.message.content = '';
      } catch (error) {
        console.error('Error sending message:', error);
        this.errorMessage = 'Erreur lors de l\'envoi du message';
      }
    }
  }
};
</script>

<style scoped>
.custom-button {
  background-color: var(--custom-button-bg) !important;
  color: var(--custom-button-text) !important;
  border-color: var(--custom-button-bg) !important;
  margin: 1em;
}

.custom-button:hover {
  background-color: var(--custom-button-hover-bg) !important;
  color: var(--custom-button-hover-text) !important;
}
</style>
