<template>
  <header>
    <div :class="{'blur-content': showWaitingScreen}">
      <h3>{{ question.question }}</h3>
      <form @submit="onSubmit" class="add-form">
        <div class="form-control">
          <div class='task' :key="answer.id" v-for="answer in question.answers"
               :class="{active: answerIds.includes(answer.id)}">
            <input type="checkbox" :value="answer.id" v-model="answerIds"/>
            <label>{{ answer.answer }}</label>
          </div>
        </div>
        <div class="submit-wrapper">
          <Counter :countdown="countdown"/>
          <input type="submit" value="Submit" class="btn btn-block btn-submit" v-show="!isAdmin"/>
        </div>
      </form>
    </div>
    <div class="modal-overlay" v-show="showWaitingScreen">
      <div class="modal-background"></div>
      <div class="modal">
        <h6>Warte bis die Zeit abgelaufen ist...</h6>
        <Counter :countdown="countdown"/>
      </div>
    </div>
  </header>
</template>

<script>

import Counter from "@/components/Counter";

export default {
  name: 'Quiz-Item',
  props: {
    question: Object,
    user: String,
    sessionId: String,
    countdown: Number,
    token: String,
    isAdmin: Boolean
  },
  components: {
    Counter
  },
  data() {
    return {
      answerIds: [],
      showWaitingScreen: Boolean
    }
  },
  watch: {
    question: function () {
      this.showWaitingScreen = false
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()

      var answers = {}
      answers.answers = []
      this.answerIds.forEach((element) => answers.answers.push({id: element}))

      await fetch(`https://swen-quiz-backend.azurewebsites.net/sessions/${this.sessionId}/participants/${this.user}/answers`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'Bearer ' + this.token
        },
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
}

.modal-background:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  left: 0;
  top: 0;
  opacity: 1;
}

.modal h6 {
  color: white;
  margin-bottom: 50px;
}

.modal .countdown {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 100px;
  font-size: 65px;
  border-width: 7px;
}

.modal {
  text-align: center;
  height: 500px;
  width: 500px;
  margin-top: 5%;
  padding: 60px 0;
  border-radius: 20px;
  z-index: 1;
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

.task {
  background-color: #1b1464;
  margin: 10px 0 0;
  padding: 10px 20px;
  -webkit-box-shadow: 0 0 2px 0 #000000;
  box-shadow: 0 0 2px 0 #000000;
  position: relative;
  cursor: pointer;
  border: 3px solid transparent;
  text-align: center;
}

.task label {
  color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'CaviarDreamsBold';
  font-size: 22px;
}

.task input {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}

.task:hover {
  -webkit-box-shadow: 0 0 4px 0 #29abe2;
  box-shadow: 0 0 4px 0 #29abe2;
}

.task.active {
  border: 3px solid #29abe2;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.submit-wrapper {
  display: flex;
  margin-top: 60px;
  justify-content: space-between;
  align-items: center;
}

.btn-submit {
  width: auto;
  padding: 5px 35px;
  border-radius: 12px;
  height: auto;
}

h3 {
  color: white;
  text-align: center;
  font-family: 'CaviarDreamsBold';
  font-size: 22px;
  margin-top: 40px;
  margin-bottom: 5px;
}
</style>
  