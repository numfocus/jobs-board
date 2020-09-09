<template>
  <div id="app">
    <h1 id="title">Welcome to the NumFOCUS Jobs Board!</h1>
    <JobsFilter/>
  </div>
</template>

<script>
import JobsFilter from './components/JobsFilter.vue'

export default {
  name: 'App',
  components: {
    JobsFilter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 1em;
  margin-left: 1em;
}
#app h1 {
  display: block;
  width: 100%;
}
#jobs {
  width: 75%;
}
#title {
  width: 100%;
}
</style>
