
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
      <movie v-for="film in movielist" v-bind:movieitem="film"></movie>
  </main>`,
  props: ['movielist', 'ok']
});

var app = new Vue({
  el: '#app',
  data: {
      value: '',
      films : [],
      ok: true
    },
    methods: {
      valueSend: function () {
        fetch('http://www.omdbapi.com/?s='+this.value+'&apikey=d5677312')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            if(result.Response == 'True'){
                this.dataSearch = result.Search;
            } else {
                this.ok = false;
            }
        })
      }
    }
  }) 