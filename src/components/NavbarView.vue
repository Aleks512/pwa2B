<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }">
        <img src="../assets/images/shop/logo.png" alt="Logo" width="100" height="40" />
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <i class="fas fa-bars" style="color: #009042"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto text-center"> <!-- Added text-center to align center on mobile -->
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'login' }" class="nav-link">Se connecter</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'CustomerSentMessages' }" class="nav-link">Messages Envoyés</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'CustomerMessageForm' }" class="nav-link">Messages reçues</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'CustomerOrderItems' }" class="nav-link">Commandes</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <!-- Remplacer le router-link par un bouton -->
            <button @click="logout" class="nav-link btn btn-link mx-auto" style="padding: 0; border: none; background: none;">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async logout() {
      try {
        await this.$store.dispatch('auth/logout');
        alert('Vous avez été déconnecté.');
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Échec de la déconnexion, veuillez réessayer.');
      }
    }
  },
};
</script>

<style>
nav {
  font-size: 1rem !important;
  background-color: #000000 !important;
}
a:hover {
  font-weight: bold;
  color: #009042;
  text-decoration: none;
  line-height: 1.5rem;
  font-size-adjust: inherit;
 
}
.navbar-toggler-icon, .navbar-toggler {
  color: #009042 !important;
  border: 1px;
}
.btn-link {
  color: inherit;
  text-decoration: none;
}
.btn-link:hover {
  color: #009042;
  text-decoration: none;
}
</style>
