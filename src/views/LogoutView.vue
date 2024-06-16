<template>
    <button @click="logout">Logout</button>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Directly call dispatch on the Vuex store
        this.$store.dispatch('auth/logout')
          .then(() => {
            alert('Dommage, vous partez déjà.');
          })
          .catch(error => {
            console.error('Logout failed:', error);
            alert('Logout failed, please try again.');
          });
      }
    }
  }
  </script>
  