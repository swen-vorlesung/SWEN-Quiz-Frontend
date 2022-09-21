<template>
    <header>
        <div :class="{'blur-content': showWaitingScreen}">
            <h3>{{question.question}}</h3>
            <h5>{{countdown}}</h5>
            <form @submit="onSubmit" class="add-form">
                <div class="form-control">
                    <div class='task' :key="answer.id" v-for="answer in question.answers">
                        <input type="checkbox" :value="answer.id" v-model="answerIds" />
                        <label>{{answer.answer}}</label>
                    </div>
                </div>
                <input type="submit" value="Submit" class="btn btn-block" />
            </form>
        </div>
        <div class="modal-overlay" v-show="showWaitingScreen">
            <div class="modal">
                <h6>Warte bis die Zeit abgelaufen ist</h6>
                <p>Restzeit: {{countdown}}</p>
            </div>
        </div>
    </header>
</template>
  
<script>

export default {
    name: 'Quiz-Item',
    props: {
        question: Object,
        user: String,
        sessionId: String,
        countdown: Number
    },
    data() {
        return {
            answerIds: [],
            showWaitingScreen: Boolean
        }
    },
    watch: {
        question: function() {
            this.showWaitingScreen = false
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault()

            var answers = {}
            answers.answers = []
            this.answerIds.forEach((element) => answers.answers.push({ id: element }))

            await fetch(`http://localhost:9009/sessions/${this.sessionId}/participants/${this.user}/answers`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(answers)
            });
            this.answerIds = []

            this.showWaitingScreen = true;
        }
    }
}
</script>
  
<style scoped>

.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
}

.modal {
    text-align: center;
    background-color: white;
    height: 500px;
    width: 500px;
    margin-top: 10%;
    padding: 60px 0;
    border-radius: 20px;
}

.close {
    margin: 10% 0 0 16px;
    cursor: pointer;
}

.close-img {
    width: 25px;
}

.check {
    width: 150px;
}

h6 {
    font-weight: 500;
    font-size: 28px;
    margin: 20px 0;
}

p {
    font-size: 16px;
    margin: 20px 0;
}

button {
    background-color: #ac003e;
    width: 150px;
    height: 40px;
    color: white;
    font-size: 14px;
    border-radius: 16px;
    margin-top: 50px;
}
</style>
  