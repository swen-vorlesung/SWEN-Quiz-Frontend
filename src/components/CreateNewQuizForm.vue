<template>
  <body>
    <h2>Create new Quiz</h2>
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <input type="text" v-model="quizName" placeholder="Enter quiz name" required>
        <ol>
          <li v-for="(index) in quizCount" :key="index">
            <QuizForm></QuizForm>
          </li>
        </ol>
        <input type="button" @click="quizCount++" value="Another Question">
      </div>
      <input type="submit" value="Submit" class="btn btn-block btn-submit">
    </form>
  </body>
</template>

<script>
import QuizForm from "@/components/QuestionForm.vue";

export default {
  name: 'Create-New_Quiz',
  data() {
    return {
      quizName: String,
      quizCount: Number
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

      let answers = {}
      answers.answers = []
      this.answerIds.forEach((element) => answers.answers.push({id: element}))

      await fetch(`${this.$backendURL}/sessions/${this.sessionId}/participants/${this.user}/answers`, {
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
  },
  created() {
    this.quizName = null
    this.quizCount = 1

  },
  components: {
    QuizForm
  }
}
</script>

<style scoped>

li {
  color:white;
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
  padding: 5px 7px 5px 15px;
  font-size: 17px;
  border-radius: 15px;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}

h2 {
  color: white;
  text-align: center;
  font-weight: normal;
  margin-bottom: 50px;
  font-family: 'CaviarDreams';
}

label {
  color: white;
  padding-left: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}

li {
  width: 90%;
  margin: auto;
}

.btn-submit {
  background: #0071bc;
}
</style>