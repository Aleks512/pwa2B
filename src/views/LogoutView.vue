<template>
  <button @click="logout">Logout</button>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logout');
        alert('Vous avez été déconnecté.');
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Échec de la déconnexion, veuillez réessayer.');
      }
    }
  }
}
</script>
