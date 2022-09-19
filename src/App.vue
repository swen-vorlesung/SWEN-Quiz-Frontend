<template>
  <div class="container">
    <Header />
    <router-view 
      :participantsUpdatedEvent="participantsUpdatedEvent"
      :quizStateUpdatedEvent="quizStateUpdatedEvent"
      :resultsUpdatedEvent="resultsUpdatedEvent"
      :newQuestionEvent="newQuestionEvent"
      :connected="connected"
      @connect="connect"></router-view>
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
      newQuestionEvent: Object
    }
  },
  emits: ['connect'],
  methods: {
    connect(sessionId) {
      console.log(sessionId)
      this.socket = new SockJS("http://localhost:9009/quiz-socket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
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
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
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
</style>
  
