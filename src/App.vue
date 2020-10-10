<template>
  <div id="app">

    <AppTemplate
      applicationName="「それは面倒くさいな！」">
      <template v-slot:navigation>
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'about' }">About</router-link>
      </template>
    </AppTemplate>

  </div>
</template>

<script>
import AppTemplate from '@moreillon/vue_application_template_flex'

export default {
  name: 'App',
  components: {
    AppTemplate
  },
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

.material-design-icon__svg {
  bottom: 0 !important;
}
body {
  margin: 0;
  color: #444444;

  font-family: Helvetica, Meiryo, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

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
  text-align: center;
}

form > * {
  margin: 0.5em;
  padding: 0.5em;
}

form input[type="text"] {
  width: 75%;
}

form input[type="submit"] {
  background-color: white;
  border: 1px solid #444444;
  cursor: pointer;
}


</style>
