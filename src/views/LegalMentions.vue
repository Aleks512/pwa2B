<template>
  <div class="container-fluid position-relative mt-5 p-0">
    <div class="row no-gutters">
      <div class="col-12">
        <img :src="logo" class="img-fluid w-100" alt="Logo Kitchen" style="height: 100vh; object-fit: cover;">
        <div class="position-absolute top-50 start-50 translate-middle w-100">
          <div class="col-md-6 offset-md-3 bg-white p-5 rounded shadow-lg">
            <p v-if="incorrectAuth" class="text-danger">Incorrect email or password entered - please try again</p>
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
export default {
  data() {
    return {
      email: '',
      password: '',
      logo: require('@/assets/pages/vegetarian_meal.webp') 
    };
  },
  computed: {
    incorrectAuth() {
      return this.$store.getters['auth/authError'];
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push({ name: 'private-recipes-list' });
      }).catch(error => {
        console.error("Login failed:", error);
        alert('Failed to login: ' + error.message);
      });
    }
  }
}
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques à ce composant */
.container-fluid {
  padding: 0;
  margin: 0;
}

.no-gutters {
  margin: 0;
}

.img-fluid {
  filter: brightness(50%);
}

.bg-white {
  background: rgba(255, 255, 255, 0.8) !important;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
</style>
