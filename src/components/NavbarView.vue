<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }">
        <img src="../assets/images/shop/logo.png" alt="Logo" width="100" height="40" />
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">Accueil</router-link>

          <li class="nav-item">
            <router-link :to="{ name: 'PublicRecipesList' }" class="nav-link">Recettes</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'posts' }" class="nav-link">Événements</router-link>
          </li>
        </ul> -->
        <ul class="navbar-nav ms-auto"> <!-- Added ms-auto to align right -->
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'login' }" class="nav-link">Se connecter</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'CustomerMessageForm' }" class="nav-link">Mes recettes</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'logout' }" class="nav-link">Logout</router-link>
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
  },
      mounted() {
          // Code to run when the component is mounted goes here
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
  color: #009E08;
  text-decoration: none;
  line-height: 1.5rem;
  font-size-adjust: inherit;
}

  </style>
  