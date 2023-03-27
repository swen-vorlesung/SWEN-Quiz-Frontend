<template>
  <!-- TODO: Make a button to enable the quiz form-->
  <div hidden>
    <h2>Administration</h2>
    <div class='task' :key="quiz.id" v-for="quiz in quizzes">
      <h3>{{ quiz.name }}
        <i @click="createQuizSession(quiz.id)" class="fa-solid fa-plus"/>
      </h3>
    </div>
    <div class=" add-new-quiz task fa-solid fa-plus">
      Add new Quiz
    </div>
  </div>

  <CreateNewQuizForm/>
</template>

<script>
import CreateNewQuizForm from "@/components/CreateNewQuizForm.vue";

export default {
  name: 'Admin-Page',
  props: {
    token: String
  },
  data() {
    return {
      quizzes: []
    }
  },
  components: {
    CreateNewQuizForm: CreateNewQuizForm
  },
  methods: {
    async createQuizSession(quizId) {
      const res = await fetch(`${this.$backendURL}/quizzes/${quizId}`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + this.token
        },
      });
      console.log('createQuizSession')
      const data = await res.json()
      this.$emit('connect', data.sessionId)
      this.$router.push(`/quiz/${data.sessionId}/waitingroom`)
    },
    async fetchQuizzes() {
      const res = await fetch(`${this.$backendURL}/quizzes`, {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + this.token
        },
      })
      const data = await res.json()
      return data;
    }
  },
  async created() {
    this.quizzes = await this.fetchQuizzes();
  }
}
</script>

<style>

input::placeholder{
  color: black;
}

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