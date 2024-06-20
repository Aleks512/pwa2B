<template>
  <div class="container-fluid">
    <div class="row no-gutters">
      <div class="col-12">
        <img :src="logo" class="img-fluid w-100" alt="vert" style="height:
  90vh; object-fit: cover; filter: brightness(80%);">
        <div class="position-absolute top-50 start-50 translate-middle w-100">
          <div class="col-md-6 offset-md-3 bg-white p-5 rounded shadow-lg" style="background: rgba(255, 255, 255, 0.8);">
            <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
            <form @submit.prevent="login" class="form">
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email" required>
              </div>
              <div class="form-group mb-3">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter password" required>
              </div>
              <button type="submit" class="btn btn-custom w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      logo: require('@/assets/images/shop/paproc.jpg'),
    };
  },
  computed: {
    // Accès aux getters
    ...mapGetters('auth', ['errorMessage']),
  },
  methods: {
    async login() {
      try {
        // Appel de l'action login avec les données du formulaire
        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        });
        this.$router.push({ name: 'CustomerMessageForm' }); 
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  }
}
</script>

<style scoped>

.container-fluid {
  padding: 0;
  margin: 0;
}

.no-gutters {
  margin: 0;
}

.bg-white {
  background: rgba(130, 177, 138, 0.5) !important;
}
</style>
