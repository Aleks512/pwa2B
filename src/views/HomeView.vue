<template>
  <div class="container mt-2">
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/cartes.webp" class="d-block w-100 custom-img-height" alt="First slide">
          <div class="carousel-caption d-none d-md-block">
            <h5>Meilleures ventes</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="@/assets/cartes-de-visite..png" class="d-block w-100 custom-img-height" alt="Second slide">
          <div class="carousel-caption d-none d-md-block">
            <h5>Cartes de visite personnalisées</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="@/assets/Porte-clss-personnalises.png" class="d-block w-100 custom-img-height" alt="Third slide">
          <div class="carousel-caption d-none d-md-block">
            <h5>Portes de clés personnalisés</h5>
            
          </div>
        </div>
        
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <br>
  <br>

  <ArticleView />
  
  <br>

  <TeamView />
  <br>
</template>
  
  

<script>
import TeamView from '@/components/TeamView.vue';
import ArticleView from '@/components/ArticleView.vue';

// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
    ArticleView,
    TeamView,
  }
}
</script>

<style>
.custom-img-height {
  height: 400px; /* Ajustez cette valeur selon vos besoins */
  object-fit: cover; /* Maintient le ratio de l'image tout en couvrant l'espace défini */
}
</style>
