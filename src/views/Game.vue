<template>
  <LoadingCircle v-show="showLoadingIndicator"/>
  <Quiz :user="user" :sessionId="sessionId" :question="question" :showCorrectAnswers="showCorrectAnswers" :countdown="countdown" :isAdmin="isAdmin" v-show="!showResults"></Quiz>
  <Results :results="results" :finished="finished" :user="user" :isAdmin="isAdmin" v-show="showResults"></Results>
  <Button @click="getResults" class="btn btn-next-question" v-show="showCorrectAnswers && isAdmin">Show Results</Button>
  <Button @click="nextQuestion" class="btn btn-next-question" v-show="showResults && isAdmin" v-if="!finished">Next Question</Button>
</template>

<script>
import Quiz from '../components/Quiz.vue'
import Results from '../components/Results.vue'
import LoadingCircle from "@/components/LoadingCircle.vue";
import axios from "axios";

export default {
  name: 'Game-Page',
  props: {
    user: String,
    isAdmin: Boolean,
    sessionId: String,
    connected: Boolean,
    timeOverEvent: Object,
    newQuestionEvent: Object,
    resultsUpdatedEvent: Object,
  },
  components: {
    Quiz,
    Results,
    LoadingCircle
  },
  data() {
    return {
      results: Object,
      timeOut: Object,
      question: Object,
      countdown: Number,
      finished: Boolean,
      showResults: Boolean,
      showCorrectAnswers: Boolean,
      showLoadingIndicator: Boolean,
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
      this.showLoadingIndicator = true

      await axios.post(`${this.$backendURL}/sessions/${this.sessionId}/quiz/next`, null, {
        withCredentials: true
      })
      .then(() => {
        this.showLoadingIndicator = false
        clearTimeout(this.timeOut)
      })
      .catch(error => {
        console.log(error)
        this.$router.push({name: "LogIn"})
      })
    },
    async getResults() {
      this.showLoadingIndicator = true

      await axios.post(`${this.$backendURL}/sessions/${this.sessionId}/quiz/showResults`, null, {
        withCredentials: true
      })
      .then(() => {
        this.showLoadingIndicator = false
        this.showCorrectAnswers = false
        clearTimeout(this.timeOut)
      })
      .catch(error => {
        console.log(error)
        this.$router.push({name: "LogIn"})
      })
    },
    countDownTimer() {
      if (this.countdown > 0) {
        this.timeOut = setTimeout(() => {
          this.countdown -= 1
          this.countDownTimer()
        }, 1000)
      }
    }
  },
  created() {
    this.showResults = false
    this.showCorrectAnswers = false
    this.showLoadingIndicator = false
  }
}
</script>

<style>
.btn-next-question {
  width: 100%;
  margin-top: 50px;
}
</style>
