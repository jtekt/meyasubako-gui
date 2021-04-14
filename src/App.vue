<template>
  <div id="app">

    <AppTemplate
      applicationName="Feedback gathering system">
      <template v-slot:navigation>
        <router-link :to="{ name: 'Home' }">
          <HomeIcon />
          <span>Home</span>

        </router-link>
        <router-link :to="{ name: 'about' }">
          <InformationOutlineIcon />
          <span>About</span>

        </router-link>
      </template>
    </AppTemplate>

  </div>
</template>

<script>
import AppTemplate from '@moreillon/vue_application_template_flex'
import InformationOutlineIcon from 'vue-material-design-icons/InformationOutline.vue'
import HomeIcon from 'vue-material-design-icons/Home.vue'

export default {
  name: 'App',
  components: {
    AppTemplate,
    InformationOutlineIcon,
    HomeIcon
  },
  mounted(){
    this.identify_if_logged_in()
    this.get_votes_from_cookies()

  },
  methods: {
    identify_if_logged_in(){
      const jwt = this.$cookies.get("jwt")
      if(!jwt) return
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
      this.axios.get(`${process.env.VUE_APP_AUTHENTICATION_MANAGER_URL}/whoami`)
      .then(response => { this.$store.commit('set_user', response.data) })
      .catch( () => {})
    },
    get_votes_from_cookies(){
      const votes_stringified = this.$cookies.get("votes")
      if(!votes_stringified) return
      const votes = JSON.parse(votes_stringified)
      votes.forEach((vote) => {
        this.$store.commit('add_vote',vote)
      })

    }
  }


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
