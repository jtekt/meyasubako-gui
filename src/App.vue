<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <main>
      <router-view/>
    </main>

  </div>
</template>

<script>

export default {
  name: 'App',

  mounted(){
    var jwt = this.$cookies.get("jwt")
    if(jwt) {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
      this.axios.get(`${process.env.VUE_APP_AUTHENTICATION_MANAGER_URL}/whoami`)
      .then(response => { this.$store.commit('set_user', response.data) })
      .catch( () => {})
    }

  },


}
</script>




<style>

body {
  margin: 0;
  color: #444444;

  font-family: Helvetica, Meiryo, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

nav {
  display: flex;
  color: white;
  background-color: #444444;
}

nav a {
  padding: 0.5em;
  text-decoration: none;
  color: currentColor;
}

main {
  padding: 0.5em;
}


.flip-list-move {
  transition: transform 1s;
}

.new_button_wrapper {
  display: flex;
  justify-content: center;
}
.new_button {
  text-decoration: none;
  color: currentColor;
  padding: 0.5em;
  border: 1px solid #444444;
  border-radius: 0.5em;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form > * {
  margin: 0.5em;
  padding: 0.25em;
}

form input[type="text"]{
  width: 75%;
}


</style>
