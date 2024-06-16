<template>
  <div class="container mt-4">
    <h2>Votre consultant</h2>
    <div v-if="loading" class="text-center">Chargement...</div>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <div v-if="consultants.length > 0" class="row">
      <div v-for="consultant in consultants" :key="consultant.id" class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="custom-card-header card-title">{{ consultant.first_name }} {{ consultant.last_name }}</h5>
            <p class="card-text"><strong>Matricule:</strong> {{ consultant.matricule }}</p>
            <p class="card-text"><strong>Email:</strong> {{ consultant.email }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="consultants.length === 0 && !loading" class="text-center">Aucun consultant trouvé.</div>
  </div>
</template>

<script>
import getAPI from '@/axios-api';

export default {
  data() {
    return {
      consultants: [],
      loading: true,
      errorMessage: ''
    };
  },
  async created() {
    await this.fetchConsultants();
  },
  methods: {
    async fetchConsultants() {
      try {
        const response = await getAPI.get('/customer-consultant/');
        this.consultants = response.data;
      } catch (error) {
        console.error('Error fetching consultants:', error);
        this.errorMessage = 'Erreur lors de la récupération des consultants';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.custom-card-header {
  font-family: 'Montserrat', sans-serif;
  background-color: black;
  color: #27b547;
  font-size: 1rem;
}
</style>
