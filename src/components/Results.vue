<template>
  <header>
    <div class="result-wrapper" v-show="finished && !isAdmin">
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
    user: String,
    isAdmin: Boolean
  },
  data() {
    return {
      place: Number,
      sortedResults: [],
      isFinished: Boolean
    }
  },
  watch: {
    results: function (results) {
      this.sortedResults = this.sortResults(results);

      if(this.isFinished)
        this.place = this.getPlace(this.sortedResults)
    },
    finished: function (isFinished) {
      this.isFinished = isFinished
    }
  },
  methods: {
    sortResults(results) {
      return results.sort((n1, n2) => n2.score - n1.score)
    },
    getPlace(results) {
      let place = 1;
      let prevScore = null

      for( const result of results){
        if(prevScore == null){
          prevScore = result.score
        }

        if(prevScore !== result.score) {
          place++;
          prevScore = result.score
        }

        if(result.nickname === this.user)
          return place
      }
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