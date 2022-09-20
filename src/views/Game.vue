<template>
    <h1>Quiz</h1>
    <Quiz :user="user" :sessionId="sessionId" :question="question" v-show="!showResults"></Quiz>
    <Results :results="results" :finished="finished" v-show="showResults"></Results>
</template>

<script>
import Quiz from '../components/Quiz.vue'
import Results from '../components/Results.vue'

export default {
    name: 'Game-Page',
    props: {
        connected: Boolean,
        quizStateUpdatedEvent: Object,
        newQuestionEvent: Object,
        resultsUpdatedEvent: Object,
        user: String,
        sessionId: String
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
            finished: Boolean
        }
    },
    watch: {
        newQuestionEvent: function (event) {
            console.log(event.question)
            this.showResults = false
            this.question = event.question
        },
        resultsUpdatedEvent: function (event) {
            console.log(event)
            this.showResults = true
            this.results = event.scores
        },
        quizStateUpdatedEvent: function (event) {
            console.log(event)
            if (event.state === 'FINISHED') {
                this.finished = true
            }
        },
    },
    methods: {

    },
    created() {
        this.showResults = false
    }
}
</script>
