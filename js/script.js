Vue.component('movie-search', {
  template: `
  <header>
    <input type="text" v-model="value">
    <button v-on:click="valueSend">SEARCH</button>
  </header>`,
  data() {
    return{
      value: '',
    }
  },
  methods: {
    valueSend: function () {
      fetch('http://www.omdbapi.com/?s='+this.value+'&apikey=d5677312')
      .then((response) => {
          return response.json();
      })
      .then((result) => {
          if(result.Response == 'True'){
            this.$root.films = result.Search;
            this.$root.ok = true;
          } else {
            this.$root.ok = false;
          }
      })
    }
  }
})

Vue.component('movie', {
  template: `
  <figure>
    <img v-bind:src="movieitem.Poster" v-bind:alt="movieitem.Title">
    <figcaption>
      <h2>{{ movieitem.Title }}</h2>
      <p>{{ movieitem.Year }}</p>
    </figcaption>
  </figure>`,
  props: ['movieitem']
});

Vue.component('movie-show', {
  template: `
  <main>
    <div v-if='ok' class="films">
      <movie v-for="film in movielist" v-bind:movieitem="film"></movie>
    </div>
    <div v-else>
      <p class="error">Ooooops, films not found</p>
    </div>
  </main>`,
  props: ['movielist', 'ok']
});

var app = new Vue({
  el: '#app',
  data: {
    ok: true,
    films: []
    }
  }) 