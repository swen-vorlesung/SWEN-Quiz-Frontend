<template>
    <h1>Quiz</h1>
    <Quiz :user="user" :sessionId="sessionId" :question="question" :countdown="countdown" v-show="!showResults"></Quiz>
    <Results :results="results" :finished="finished" v-show="showResults"></Results>
    <Button @click="nextQuestion" v-show="showResults">Next Question</Button>
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
            finished: Boolean,
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
        },
        quizStateUpdatedEvent: function (event) {
            console.log(event)
            if (event.state === 'FINISHED') {
                this.finished = true
            }
        },
    },
    methods: {
        async nextQuestion() {
            await fetch(`http://localhost:9009/sessions/${this.sessionId}/quiz/next`, {
                method: "POST"
            });
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
    }
}
</script>
