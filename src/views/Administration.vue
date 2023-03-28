<template>
  <div v-if="!showNewQuizForm">
    <h2>Administration</h2>
    <div class='task' :key="quiz.id" v-for="quiz in quizzes">
      <h3>{{ quiz.name }}
        <i @click="createQuizSession(quiz.id)" class="fa-solid fa-plus"/>
      </h3>
    </div>
    <div class="add-new-quiz task fa-solid fa-plus" @click="this.toggleShowNewQuizForm">
      Add new Quiz
    </div>
  </div>

  <CreateNewQuizForm :token="token" v-if="showNewQuizForm" @finished_quiz_creation="this.finishQuizCreation"/>
</template>

<script>
import CreateNewQuizForm from "@/components/CreateNewQuizForm.vue";

export default {
  name: 'Admin-Page',
  expose: ["cancelQuizCreation"],
  props: {
    token: String
  },
  data() {
    return {
      quizzes: [],
      showNewQuizForm: Boolean
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
    },
    toggleShowNewQuizForm(){
      this.showNewQuizForm = !this.showNewQuizForm
    },
    async finishQuizCreation(finished){
      if(finished)
        this.quizzes = await this.fetchQuizzes();

      this.toggleShowNewQuizForm()
    }
  },
  async created() {
    this.quizzes = await this.fetchQuizzes();
  },
  mounted() {
    this.showNewQuizForm = false
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

.add-new-quiz {
  width: 100%;
  margin: auto;
}
</style>