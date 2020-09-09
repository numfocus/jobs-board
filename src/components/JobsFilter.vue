<template>
  <div id="jobsLayout">
    <div id="filter">
      <form>
        <div class="section">
          Type
        </div>
        <input
          name="fullTime"
          type="checkbox"
          v-model="filter.fullTime"
        >
        <label for="fullTime"> Full-time</label><br/>

        <div class="section">
          Open Source
        </div>
        <select
          name="ossTimeGt"
          v-model.number="filter.ossTimeGt"
          >
          <option value="0"></option>
          <option value="25">&gt; 25%</option>
          <option value="50">&gt; 50%</option>
          <option value="75">&gt; 75%</option>
          <option value="100">100%</option>
        </select>
        <label for="ossTimeGt"> OSS time</label>

        <button class="reset" type="reset" @click="resetFilter">Reset</button>
      </form>
    </div>
    <Jobs :jobs="filteredJobs"/>
  </div>
</template>

<script>
  import Jobs from './Jobs.vue'

  import jobData from '../jobs.js'
  import filterJobs, { defaultFilter } from '../filter-jobs.js';
  import marked from 'marked'
  import DOMPurify from 'dompurify'

  const jobsWithMarkdown = jobData.map((job) => ({
    ...job,
    description: DOMPurify.sanitize(
      marked(job.description),
      {ALLOWED_TAGS: ['em', 'strong', 'ul', 'li', 'br', 'p']}
    )
  }))

  export default {
    name: 'JobsFilter',
    components: {
      Jobs
    },
    data: () => ({
      filter: defaultFilter()
    }),
    methods: {
      resetFilter() {
        this.filter = defaultFilter()
        console.log(this.filter)
      }
    },
    computed: {
      filteredJobs() {
        return filterJobs(jobsWithMarkdown, this.filter)
      }
    },
  }
</script>

<style>
#jobsLayout {
  display: flex;
}
#filter {
  width: 10%;
  background: #eee;
  padding: 2rem;
}
.section {
  font-weight: bold;
  margin-bottom: 0.5rem;
  padding-top: 1rem;
}
.reset {
  margin-top: 2rem;
  background: gray;
  color: white;
  border: 0;
  padding: 0.5rem 1rem 0.5rem 1rem;
}
</style>
