<template>
  <div>
    <h1>About</h1>
    <p>Version {{version}}</p>

    <h2>Technologies used</h2>
    <p>This application is built using the following open-source technologies:</p>
    <div class="tech_wrapper">
      <div
        class="tech"
        v-for="(tech, index) in technologies"
        v-bind:key="index">
        <img :src="tech.image_src" alt="">
        <label class="">
          {{tech.label}}
        </label>
      </div>
    </div>


  </div>
</template>

<script>

import pjson from '@/../package.json'

export default {
  name: 'About',
  data () {
    return {
      version: pjson.version,
      technologies: [
        {
          label: 'Docker',
          image_src: require('@/assets/docker.png')
        },
        {
          label: 'Kubernetes',
          image_src: require('@/assets/kubernetes.png')
        },
        {
          label: 'Neo4J',
          image_src: require('@/assets/neo4j.png')
        },
        {
          label: 'MongoDB',
          image_src: require('@/assets/mongodb.png')
        },
        {
          label: 'Node.js',
          image_src: require('@/assets/nodejs.png')
        },
        {
          label: 'GitLab',
          image_src: require('@/assets/gitlab.png')
        },
        {
          label: 'Vue.js',
          image_src: require('@/assets/vue.png')
        }

      ]
    }
  }

}
</script>

<style scoped>
.tech_wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.tech {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 10em;
}
.tech img {
  height: 5em;
}

.tech label {
  margin: 0.5em;
}

</style>
