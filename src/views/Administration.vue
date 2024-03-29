<template>
  <LoadingCircle v-show="showLoadingIndicator"/>
  <div v-if="!showNewQuizForm">
    <h2>Administration</h2>
    <h2 v-show="quizzes.length <= 0">No Quiz could be found</h2>
    <div class='task' :key="quiz.id" v-for="quiz in quizzes">
      <h3>{{ getQuizName(quiz.name) }}</h3>
      <div id="icon-div">
        <i @click="createQuizSession(quiz.id, quiz.name)" class="fa-solid fa-button fa-plus"/>
        <i id="cog-icon" @click="editQuiz(quiz.id)" class="fa fa-solid fa-button fa-cog icon"></i>
      </div>
    </div>
    <div id="add-new-quiz" class="task fa-solid fa-button" @click="this.toggleShowNewQuizForm">
      Add new Quiz
    </div>
  </div>

  <CreateNewQuizForm :quiz-id="quizId" v-if="showNewQuizForm" @finished_quiz_creation="this.finishQuizCreation"/>
</template>

<script>
import CreateNewQuizForm from "@/components/CreateNewQuizForm.vue";
import LoadingCircle from "@/components/LoadingCircle.vue";
import axios from "axios";

export default {
  name: 'Admin-Page',
  props: {
    token: String
  },
  data() {
    return {
      quizzes: [],
      showNewQuizForm: Boolean,
      quizId: Number,
      showLoadingIndicator: Boolean
    }
  },
  components: {
    LoadingCircle,
    CreateNewQuizForm: CreateNewQuizForm
  },
  methods: {
    async createQuizSession(quizId, quizName) {
      this.showLoadingIndicator = true

      await axios.post(`${this.$backendURL}/quizzes/${quizId}`, null, {
        withCredentials: true
      })
      .then(result => {
        console.log('createQuizSession')
        const data = result.data
        this.$emit('connect', data.sessionId)
        this.$emit('setQuizName', quizName)
        this.$router.push(`/quiz/${data.sessionId}/waitingroom`)
      })
      .catch( error => {
        if(error.response.status === 401)
          this.$router.push({name: "LogIn"})
      })
    },
    async fetchQuizzes() {
      const result = await axios.get(`${this.$backendURL}/quizzes`, {
        withCredentials: true
      })
      .catch(error => {
        if(error.response.status === 401)
          this.$router.push( {name: "LogIn"} )
      })

      const data = result.data
      this.showLoadingIndicator = false
      return data;
    },
    toggleShowNewQuizForm(){
      this.showNewQuizForm = !this.showNewQuizForm
    },
    editQuiz(quizId){
      this.quizId = quizId
      this.toggleShowNewQuizForm()
    },
    async finishQuizCreation(finished){
      if(finished)
        this.quizzes = await this.fetchQuizzes();

      this.quizId = null
      this.toggleShowNewQuizForm()
    },
    getQuizName(quizName){
      if(quizName.length < this.$maxQuizNameLength)
        return quizName
      else
        return quizName.substring(0, this.$maxQuizNameLength) + "..."
    }
  },
  mounted() {
    this.showLoadingIndicator = true
  },
  async created() {
    this.showNewQuizForm = false
    this.quizId = null
    this.quizzes = await this.fetchQuizzes();
  }
}
</script>

<style>

input::placeholder{
  color: black;
}

i {
  text-align: center;
}

.fa-plus {
  width: 30px;
  height: 30px;
}

.fa-button {
  color: white;
  cursor: pointer;
  border: 2px solid white;
  border-radius: 30px;
  padding: 5px;
  background: #0071bc;
  transition: all .4s ease;

  margin: auto 3px auto 3px;
}

.fa-button:hover {
  color: #0071bc;
  background: white;
}

.fa-minus {
  display: block;
  cursor: pointer;
  background: #0071bc;
  color: white;
  border: 2px solid #0071bc;
  border-radius: 30px;
  padding: 5px;

  transition: all .4s ease;

  position: absolute;
  align-self: center;
  right: 10px;
}

.fa-minus:hover {
  background: white;
  color: #0071bc;
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

.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#add-new-quiz {
  width: 100%;
  margin: auto;
  justify-content: start;
}
</style>