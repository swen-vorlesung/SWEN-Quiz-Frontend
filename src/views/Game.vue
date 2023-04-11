<template>
  <Quiz :user="user" :sessionId="sessionId" :question="question" :showCorrectAnswers="showCorrectAnswers" :countdown="countdown" :isAdmin="isAdmin" v-show="!showResults"></Quiz>
  <Results :results="results" :finished="finished" :user="user" :isAdmin="isAdmin" v-show="showResults"></Results>
  <Button @click="getResults" class="btn btn-next-question" v-show="showCorrectAnswers && isAdmin">Show Results</Button>
  <Button @click="nextQuestion" class="btn btn-next-question" v-show="showResults && isAdmin" v-if="!finished">Next Question</Button>
</template>

<script>
import Quiz from '../components/Quiz.vue'
import Results from '../components/Results.vue'

export default {
  name: 'Game-Page',
  props: {
    connected: Boolean,
    newQuestionEvent: Object,
    resultsUpdatedEvent: Object,
    timeOverEvent: Object,
    user: String,
    sessionId: String,
    token: String,
    isAdmin: Boolean
  },
  components: {
    Quiz,
    Results
  },
  data() {
    return {
      question: Object,
      results: Object,
      showResults: Boolean,
      finished: Boolean,
      showCorrectAnswers: Boolean,
      countdown: Number
    }
  },
  watch: {
    newQuestionEvent: function (event) {
      console.log(event)
      this.showResults = false
      this.question = event.question
      this.countdown = this.question.answerTime
      this.countDownTimer()
    },
    resultsUpdatedEvent: function (event) {
      console.log(event)
      this.showResults = true
      this.results = event.scores
      this.finished = event.finished
      this.showCorrectAnswers = false
    },
    timeOverEvent: function(event) {
      console.log(event)
      this.showCorrectAnswers = true
    }
  },
  methods: {
    async nextQuestion() {
      await fetch(`${this.$backendURL}/sessions/${this.sessionId}/quiz/next`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + this.token
        },
      });
    },
    async getResults() {
      await fetch(`${this.$backendURL}/sessions/${this.sessionId}/quiz/showResults`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + this.token
        },
      }).then(this.showCorrectAnswers = false);
    },
    countDownTimer() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown -= 1
          this.countDownTimer()
        }, 1000)
      }
    }
  },
  created() {
    this.showResults = false
    this.showCorrectAnswers = false
  }
}
</script>

<style>
.btn-next-question {
  width: 100%;
  margin-top: 50px;
}
</style>
