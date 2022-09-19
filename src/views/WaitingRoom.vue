<template>
    <h1>Quiz - {{sessionId}}</h1>
    <qrcode-vue :value="sessionId" :size="300" level="H" />
    <div class='task' :key="participant" v-for="participant in participants">
        <Participant :participant="participant"></Participant>
    </div>
    <form @submit="onSubmit" class="add-form">
        <div class="form-control">
            <label>NickName</label>
            <input type="text" v-model="nickname" name="nickname" placeholder="Add NickName" />
        </div>
        <input type="submit" value="Submit" class="btn btn-block" />
    </form>
    <button @click="startQuiz()" class="btn btn-block">Start Quiz</button>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import Participant from '../components/Participant.vue'

export default {
    name: 'Waiting-Room',
    props: {
        connected: Boolean,
        participantsUpdatedEvent: Object,
        quizStateUpdatedEvent: Object
    },
    data() {
        return {
            sessionId: String,
            nickname: '',
            participants: []
        }
    },
    components: {
        QrcodeVue,
        Participant
    },
    watch: {
        participantsUpdatedEvent: function (event) {
            this.participants = event.participants.map(p => p.nickname)
        },
        quizStateUpdatedEvent: function () {
            this.redirectToGame();
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault()

            if (!this.nickname) {
                alert('Please add a NickName')
                return
            }

            await fetch(`http://localhost:9009/sessions/${this.sessionId}/participants`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ 'nickname': this.nickname })
            });
        },
        async startQuiz() {
            await fetch(`http://localhost:9009/sessions/${this.sessionId}/quiz/start`, {
                method: "POST"
            });
            this.redirectToGame()
        },
        redirectToGame() {
            this.$router.push(`/quiz/${this.sessionId}/questions/`)
        }
    },
    created() {
        this.sessionId = this.$route.params.sessionId
        if (!this.connected) {
            this.$emit('connect', this.sessionId)
        }
    }
}

</script>

<style scoped>
.add-form {
    margin-bottom: 40px;
}

.form-control {
    margin: 20px 0;
}

.form-control label {
    display: block;
}

.form-control input {
    width: 100%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
}

.form-control-check {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.form-control-check label {
    flex: 1;
}

.form-control-check input {
    flex: 2;
    height: 20px;
}

.fas {
    color: green;
    cursor: pointer;
}

.task {
    background: #f4f4f4;
    margin: 5px;
    padding: 10px 20px;
}

.task.reminder {
    border-left: 5px solid green;
}

.task h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
    