<template>
  <h2>Administration</h2>
  <div class='task' :key="quiz.id" v-for="quiz in quizzes">
    <h3>{{ quiz.name }}
      <i @click="createQuizSession(quiz.id)" class="fa-solid fa-plus"></i>
    </h3>
  </div>
</template>

<script>

export default {
  name: 'Admin-Page',
  data() {
    return {
      quizzes: []
    }
  },
  inheritAttrs: false,
  methods: {
    async createQuizSession(quizId) {
      const res = await fetch(`https://swen-quiz-backend.azurewebsites.net/quizzes/${quizId}`, {
        method: "POST"
      });
      console.log('createQuizSession')
      const data = await res.json()
      this.$emit('connect', data.sessionId)
      this.$router.push(`/quiz/${data.sessionId}/waitingroom`)
    },
    async fetchQuizzes() {
      const res = await fetch('https://swen-quiz-backend.azurewebsites.net/quizzes')
      const data = await res.json()
      return data;
    }
  },
  async created() {
    this.quizzes = await this.fetchQuizzes();
  }
}
</script>

<style scope>
.fa-plus {
  color: white;
  cursor: pointer;
  border: 2px solid white;
  border-radius: 30px;
  padding: 5px;
  background: #0071bc;
  transition: all .4s ease;
}

.fa-plus:hover {
  color: #0071bc;
  background: white;
}

.task {
  background: #29abe2;
  margin: 5px;
  padding: 15px;
  color: white;
  border-radius: 15px;
  font-size: 16px;
  -webkit-box-shadow: 0 0 2px 0 #ffffff;
  box-shadow: 0 0 2px 0 #ffffff;
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