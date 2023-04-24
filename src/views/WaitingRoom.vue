<template>
  <br>
  <h2>{{this.quizName}}<br>{{ sessionId }}</h2>
  <qrcode-vue :value="this.origin + '/quiz/'+ sessionId + '/waitingroom'" :size="300" level="H" class="qr-code" v-show="isAdmin"/>
  <form @submit="onSubmit" class="add-form" v-show="!user && !isAdmin">
    <div class="form-control">
      <label>Nickname:</label>
      <input type="text" v-model="nickname" name="nickname" placeholder="Add NickName"/>
    </div>
    <ErrorDisplay :error-message="errorMessage"/>
    <input type="submit" value="Submit" class="btn btn-block btn-submit"/>
  </form>
  <Participant :participants="participants"></Participant>
  <button @click="startQuiz()" class="btn btn-block btn-start" :disabled="disableStartingButton" v-show="isAdmin">Start Quiz</button>
</template>

<script>
import axios from "axios";
import QrcodeVue from 'qrcode.vue'
import Participant from '../components/Participant.vue'
import ErrorDisplay from "@/components/ErrorDisplay.vue";

export default {
  name: 'Waiting-Room',
  props: {
    user: String,
    token: String,
    isAdmin: Boolean,
    quizName: String,
    sessionId: String,
    connected: Boolean,
    quizStateUpdatedEvent: Object,
    participantsUpdatedEvent: Object,
  },
  data() {
    return {
      nickname: String,
      participants: [],
      errorMessage: String,
      origin: window.location.origin,
      disableStartingButton: Boolean
    }
  },
  components: {
    ErrorDisplay,
    QrcodeVue,
    Participant
  },
  watch: {
    participantsUpdatedEvent: function (event) {
      this.participants = event.participants.map(p => p.nickname)
      this.disableStartingButton = this.participants.length < 2
    },
    quizStateUpdatedEvent: function () {
      this.redirectToGame();
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()

      if (!this.nickname) {
        this.errorMessage = "Please add a Nickname"
        return
      }

      await axios.post(`${this.$backendURL}/sessions/${this.sessionId}/participants/`, {
        'nickname': this.nickname
      }, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      .then( () => this.$emit('setUser', this.nickname))
    },
    async startQuiz() {
      await axios.post(`${this.$backendURL}/sessions/${this.sessionId}/quiz/start`, null, {
        withCredentials: true
      })
      .then(this.redirectToGame)
      .catch(error => {
        console.log(error)
        this.$router.push({name: "LogIn"})
      })
    },
    redirectToGame() {
      this.$router.push(`/quiz/${this.sessionId}/questions/`)
    }
  },
  created() {
    if (!this.connected) {
      this.$emit('connect', this.$route.params.sessionId)
    }
    this.nickname = this.user
    this.disableStartingButton = true
  }
}

</script>

<style scoped>
.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  padding: 5px 7px 5px 15px;
  font-size: 17px;
  border-radius: 15px;
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

h2 {
  color: white;
  text-align: center;
  font-weight: normal;
  margin-bottom: 50px;
  font-family: 'CaviarDreams';
}

.qr-code {
  margin: 0 auto;
  display: block;
}
label {
  color: white;
  padding-left: 15px;
  margin-bottom: 10px;
}
.btn-submit {
  background: #0071bc;
}
.btn-start {
  margin-top: 60px;
}

button:disabled {
  background-color: grey;
}

</style>
    
