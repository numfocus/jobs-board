<template>
  <div id="jobs">
    <div class="jobList">
      <div class="job" v-for="job in jobs" v-bind:key="job.id">
        <div class="meta">
          <div class="title">{{ job.entity }} / {{ job.title }}</div>
          <div class="percentTime">This job is {{ job.percentTime }}% time.</div>
          <div class="percentOSS">{{ job.percentOSS }}% of that time
            is on open source</div>
        </div>
        <div class="description" v-html="job.description"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Jobs',
    props: {
      filter: Object,
      msg: String,
      jobs: Array
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jobList {
  display: flex;
}
.job {
    width: 30rem;
    padding: 1rem;
    margin: 1rem;
    border: 1px solid gray;
}
.job .meta {
    font-size: 100%;
    font-family: monospace;
}
.job .title {
    font-size: 150%;
}
.job .description {
    margin-top: 1rem;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
