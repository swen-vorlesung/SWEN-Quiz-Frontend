<template>
    <h1>Quiz - {{sessionId}}</h1>
    <qrcode-vue :value="sessionId" :size="300" level="H" />
    <div class='task' :key="participant" v-for="participant in participants">
        <!--Participant :participant="participant"></Participant-->
        <h3>{{participant}}</h3> 
    </div>
    <form @submit="onSubmit" class="add-form">
        <div class="form-control">
            <label>NickName</label>
            <input type="text" v-model="nickname" name="nickname" placeholder="Add NickName" />
        </div>
        <input type="submit" value="Submit" class="btn btn-block" />
    </form>
    <button @click="startQuiz()" ></button>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
//import Participant from '../components/Participant.vue'
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
    name: 'Waiting-Room',
    data() {
        return {
            sessionId: String,
            participants: [],
            nickname: ''
        }
    },
    components: {
        QrcodeVue,
        //Participant
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault()

            if (!this.nickname) {
                alert('Please add a NickName')
                return
            }
            console.log(`sende nickname: ${this.nickname}`)

            var nick = {'nickname' : this.nickname }

            await fetch(`http://localhost:9009/sessions/${this.sessionId}/participants`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(nick)
            });
        },
        connect() {
            this.socket = new SockJS("http://localhost:9009/quiz-socket");
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect(
                {},
                frame => {
                    this.connected = true;
                    console.log(frame)
                    this.stompClient.subscribe(`/sessions/${this.sessionId}/waitingroom`, tick => {
                        console.log(JSON.parse(tick.body))
                        this.participants = JSON.parse(tick.body).map(p => p.nickname)
                    });
                },
                error => {
                    console.log(error);
                    this.connected = false;
                }
            );
        },
        disconnect() {
            if (this.stompClient) {
                this.stompClient.disconnect();
            }
            this.connected = false;
        },
        startQuiz(){
            this.disconnect()
            await fetch(`http://localhost:9009/sessions/${this.sessionId}/quiz/start`, {
                method: "POST"
            });
            this.$router.push(`/game/${data.sessionId }`)
        }
    },
    created() {
        this.sessionId = this.$route.params.sessionId
        this.connect()
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
    