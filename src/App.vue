<template>
  <div class="container">
    <Header />
    <router-view :participantsUpdatedEvent="participantsUpdatedEvent" :quizStateUpdatedEvent="quizStateUpdatedEvent"
      :resultsUpdatedEvent="resultsUpdatedEvent" :newQuestionEvent="newQuestionEvent" :timeOverEvent="timeOverEvent" :connected="connected"
      :user="user" :token="token" :isAdmin="isAdmin" :sessionId="sessionId" :quizName="quizName"
      @connect="connect" @setUser="setUser" @setToken="setToken" @setAdmin="setAdmin" @setQuizName="setQuizName"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      participantsUpdatedEvent: Object,
      quizStateUpdatedEvent: Object,
      resultsUpdatedEvent: Object,
      newQuestionEvent: Object,
      timeOverEvent: Object,
      user: String,
      token: String,
      sessionId: String,
      isAdmin: Boolean ,
      quizName: String,
    }
  },
  emits: ['connect', 'setUser', 'setToken', 'setAdmin'],
  methods: {
    connect(sessionId) {
      this.connected = true;
      this.sessionId = sessionId
      this.socket = new SockJS(`${this.$backendURL}/quiz-socket`);
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          console.log(frame)
          this.stompClient.subscribe(`/sessions/${sessionId}`, tick => {
            var event = JSON.parse(tick.body)
            if (event.eventName === 'ParticipantsUpdatedEvent') {
              this.participantsUpdatedEvent = event
            }
            if (event.eventName === 'QuizStateUpdatedEvent') {
              this.quizStateUpdatedEvent = event;
            }
            if (event.eventName === 'ResultsUpdatedEvent') {
              this.resultsUpdatedEvent = event;
            }
            if (event.eventName === 'NewQuestionEvent') {
              this.newQuestionEvent = event;
            }
            if (event.eventName === 'TimeOverEvent'){
              this.timeOverEvent = event;
            }
          });
        },
        error => {
          console.log(error);
          this.connected = false;
        }
      );
    },
    setUser(username) {
      this.user = username
    },
    setToken(token) {
      this.token = token
    },
    setAdmin(isAdmin) {
      this.isAdmin = isAdmin
    },
    setQuizName(quizName) {
      if(quizName.length < this.$maxQuizNameLength)
        this.quizName = quizName
      else
        this.quizName = quizName.substring(0, this.$maxQuizNameLength) + "..."
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
  },
  created() {
    this.user = null
    this.isAdmin = false
    this.quizName = "Quiz-App"
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

@font-face {
  font-family: 'CaviarDreams';
  src:
      local('CaviarDreams'),
      url('./assets/font/CaviarDreams.ttf') format('truetype');
}

@font-face {
  font-family: 'CaviarDreamsBold';
  src:
      local('CaviarDreams'),
      url('./assets/font/CaviarDreams_Bold.ttf') format('truetype');
  font-weight: bold;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'CaviarDreams';
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #1b1441;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #29abe2;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px 0;
  border-radius: 15px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
h2 {
  color: white;
  text-align: center;
  font-weight: normal;
  margin-bottom: 50px;
  font-family: 'CaviarDreams';
}
</style>
  
