<template>
    <h1>Quiz</h1>
    <Quiz :question="question"></Quiz>
    <Results v-show="false"></Results>
</template>

<script>

export default {
    name: 'Game-Page',
    props: {
        connected: Boolean,
        quizStateUpdatedEvent: Object,
        newQuestionEvent: Object,
        resultsUpdatedEvent: Object
    },
    data() {
        return {
            sessionId: String,
            question: Object,
            nickname: ''
        }
    },
    watch: {
        newQuestionEvent: function (event) {
            console.log(event.question)
            this.question = event.question
        },
        resultsUpdatedEvent: function (event) {
            console.log(event)
        },
        quizStateUpdatedEvent: function (event) {
            console.log(event)
        },
    },
    methods: {
        
    }
}
</script>
