<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <main>
      <router-view/>
    </main>

  </div>
</template>

<style>

body {
  margin: 0;
  color: #444444;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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

</style>
