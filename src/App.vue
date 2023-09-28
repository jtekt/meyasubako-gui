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
    this.get_votes_from_cookies()
  },
  methods: {
    get_votes_from_cookies() {
      const votes_stringified = this.$cookies.get("complaints_votes")
      if (!votes_stringified) return
      console.log(votes_stringified)
      const votes = JSON.parse(votes_stringified)
      votes.forEach((vote) => {
        this.$store.commit("add_vote", vote)
      })
    },
  },
}
</script>

<style>
.header_logo {
  border-right: 1px solid white;
}
</style>
