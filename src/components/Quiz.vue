<template>
    <header>
        <h3>{{question.question}}</h3>
        <form @submit="onSubmit" class="add-form">
            <div class="form-control">
                <div class='task' :key="answer.id" v-for="answer in question.answers">
                    <input type="checkbox" :value="answer.id" v-model="answerIds" />
                    <label>{{answer.answer}}</label>
                </div>
            </div>
            <input type="submit" value="Submit" class="btn btn-block" />
        </form>

    </header>
</template>
  
<script>

export default {
    name: 'Quiz-Item',
    props: {
        question: Object,
        user: String,
        sessionId: String
    },
    data() {
        return {
            answerIds: []
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault()

            console.log('Val: ' + this.answerIds)

            var answers = {}
            answers.answers = []
            this.answerIds.forEach((element) => answers.answers.push({ id: element }))

            console.log('Json: ' + JSON.stringify(answers))

            await fetch(`http://localhost:9009/sessions/${this.sessionId}/participants/${this.user}/answers`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(answers)
            });
        }
    }
}
</script>
  
<style scoped>

</style>
  