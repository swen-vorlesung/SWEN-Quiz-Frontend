<template>
  <h2>Quiz - {{ sessionId }}</h2>
  <qrcode-vue :value="sessionId" :size="300" level="H" class="qr-code"/>
  <form @submit="onSubmit" class="add-form" v-show="!this.user">
    <div class="form-control">
      <label>Nickname:</label>
      <input type="text" v-model="nickname" name="nickname" placeholder="Add NickName"/>
    </div>
    <input type="submit" value="Submit" class="btn btn-block btn-submit"/>
  </form>
  <Participant :participants="participants"></Participant>
  <button @click="startQuiz()" class="btn btn-block btn-start">Start Quiz</button>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import Participant from '../components/Participant.vue'

export default {
  name: 'Waiting-Room',
  props: {
    connected: Boolean,
    participantsUpdatedEvent: Object,
    quizStateUpdatedEvent: Object,
    user: String,
    sessionId: String,
  },
  data() {
    return {
      nickname: String,
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
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({'nickname': this.nickname})
      });

      this.$emit('setUser', this.nickname)
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
    if (!this.connected) {
      this.$emit('connect', this.$route.params.sessionId)
    }
    this.nickname = this.user
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
</style>
    