<template>
  <header>
    <div class="result-wrapper" v-show="finished">
      <h2>Glückwunsch! Du hast den {{ place }}. Platz gemacht!</h2>
    </div>
    <h3>Ranking</h3>
    <div class='task' :key="result.nickname" v-for="result in sortedResults">
      <label>{{ result.nickname }} : {{ result.score }}</label>
    </div>
  </header>
</template>

<script>

export default {
  name: 'Results-Item',
  props: {
    results: [],
    finished: Boolean,
    user: String
  },
  data() {
    return {
      place: Number,
      sortedResults: []
    }
  },
  watch: {
    results: function (results) {
      this.sortedResults = this.sortResults(results);
    },
    finished: function (isFinished) {
      if (isFinished) {
        this.place = this.sortedResults.findIndex(r => r.nickname === this.user) + 1;
      }
    }
  },
  methods: {
    sortResults(results) {
      return results.sort((n1, n2) => n2.score - n1.score)
    }
  }
}
</script>

<style scoped>
h3 {
  color: white;
  text-align: center;
  font-family: 'CaviarDreamsBold';
  font-size: 22px;
  margin-top: 40px;
  margin-bottom: 5px;
}
.result-wrapper {
  margin-top: 15px;
}
.task label {
  font-family: 'CaviarDreamsBold';
}
</style>