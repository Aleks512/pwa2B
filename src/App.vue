<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <NavBar />
    <main class="flex-grow">
      <router-view/>
    </main>
    <FooterView />
  </div>
</template>

<script>
import NavBar from '@/components/NavbarView.vue'
import FooterView from './components/FooterView.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterView
  },
  methods: {
    redirect() {
      this.$router.push({ name: 'home' });
    },
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #041423;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merriweather&family=Montserrat&display=swap');

body {
   
    color: #041423;
    font-family: 'Merriweather', serif;
}

/* Add styles using the fonts */
h1, h3 {
  font-family: 'Montserrat', sans-serif;
    font-size: 3rem;
}
h2 {
  font-family: 'Merriweather', serif;
    font-size: 2rem;
}

custom-card-header{
    background-color: black;
    color: #1AA845;
}


.section-title {
    margin-bottom: 5rem;
}

p {
    font-size: 1rem !important;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  line-height: 1.5rem;
  font-size-adjust: inherit;
}

nav a.router-link-exact-active {
  color: #00FF7FFF !important;
  text-decoration: underline #00FF7FFF;
}


</style>
