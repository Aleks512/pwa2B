<template>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item" v-for="message in messages" :key="message.id">
      <h2 class="accordion-header" :id="'heading' + message.id">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + message.id" aria-expanded="true" :aria-controls="'collapse' + message.id">
          {{ message.sender_email }}
        </button>
      </h2>
      <div :id="'collapse' + message.id" class="accordion-collapse collapse show" :aria-labelledby="'heading' + message.id" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>{{ message.content }}</strong>
          <p><small>{{ formatTimestamp(message.timestamp) }}</small></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getAPI from '@/axios-api';

export default {
  data() {
    return {
      messages: [],
      loading: true,
      errorMessage: ''
    };
  },
  async created() {
    await this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await getAPI.get('/customer-read-messages/');
        this.messages = response.data;
      } catch (error) {
        console.error('Error fetching messages:', error);
        this.errorMessage = 'Erreur lors de la récupération des messages';
      } finally {
        this.loading = false;
      }
    },
    formatTimestamp(timestamp) {
      return new Date(timestamp).toLocaleString();
    }
  }
};
</script>

<style scoped>
.accordion-button {
  background-color: var(--custom-button-bg) !important;
  color: var(--custom-button-text) !important;
  border-color: var(--custom-button-bg) !important;
  margin: 1em;
}

.accordion-button:hover {
  background-color: var(--custom-button-hover-bg) !important;
  color: var(--custom-button-hover-text) !important;
}
</style>
