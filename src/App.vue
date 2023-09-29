<template>
  <AppTemplate :options="options"> </AppTemplate>
</template>

<script>
import AppTemplate from "@moreillon/vue_application_template_vuetify"

const { VUE_APP_HOMEPAGE_URL } = process.env

export default {
  name: "App",
  components: {
    AppTemplate,
  },
  data() {
    return {
      options: {
        title: "目安箱",
        homepage_url: VUE_APP_HOMEPAGE_URL,
        header_logo: require("@/assets/jtekt_logo_negative.jpg"),
        authentication_logo: require("@/assets/jtekt_logo.jpg"),
        colors: { app_bar: "#000" },
        author: "Maxime Moreillon, JTEKT Corporation",
      },
    }
  },
  mounted() {
    this.getVotesFromLocalstorage()
  },
  methods: {
    getVotesFromLocalstorage() {
      const votesString = localStorage.getItem("votes")
      if (!votesString) return
      this.$store.commit("setVotes", JSON.parse(votesString))
    },
  },
}
</script>

<style>
.header_logo {
  border-right: 1px solid white;
}
</style>
