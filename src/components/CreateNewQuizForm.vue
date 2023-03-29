<template>
  <body>
    <h2>Create new Quiz</h2>
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <input type="text" v-model="quizName" placeholder="Enter quiz name" required>
        <QuestionForm v-for="(index) in questionCount" :key="index" ref="questionForms" :position="index"
                      :showMinusSymbol="showQuestionMinusSymbol" @removeQuestionEvent="questionCount--" @quizFormErrorEvent="quizFormErrorEvent"/>
        <input type="button" @click="questionCount++" value="Another Question">
      </div>
      <label id="errorMessage"> {{this.errorMessage}} </label>
      <input type="submit" value="Submit" class="btn btn-block btn-submit"/>
      <input type="button" value="Cancel" @click="onCancel" class="btn btn-block .form btn-cancel"/>
    </form>
  </body>
</template>

<script>
import QuestionForm from "@/components/QuestionForm.vue";

export default {
  name: 'Create-New_Quiz',
  data() {
    return {
      quizName: String,
      questionCount: Number,
      errorMessage: String,
      quizCreationError: Boolean,
      showQuestionMinusSymbol: Boolean
    }
  },
  components: {
    QuestionForm
  },
  props: {
    token: String
  },
  watch: {
    questionCount() {
      this.showQuestionMinusSymbol = this.questionCount > 1
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()

      let questionList = []
      this.$refs.questionForms.forEach(question => questionList.push(question.getQuestions()))

      if(this.quizCreationError){
        this.quizCreationError = false
        return
      }

      const res = await fetch(`${this.$backendURL}/quizzes`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + this.token,
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "name":this.quizName,
          "questions": questionList
        })
      })

      // TODO: Validate response
      console.log(res)

      this.$emit('finished_quiz_creation', true)
    },
    onCancel(){
      if(window.confirm("Are you sure you want to leave?\nYou will be loosing your entire progress")){
        this.$emit('finished_quiz_creation', false)
      }
    },
    quizFormErrorEvent(errorMessage){
      this.errorMessage = errorMessage
      this.quizCreationError = true
    }
  },
  created() {
    this.quizName = null
    this.questionCount = 1
    this.errorMessage = null
    this.quizCreationError = false
  }
}
</script>

<style scoped>

li {
  color:white;
  width: 90%;
  margin: auto;
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
  border-style: none;
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

.btn-submit {
  background: #0071bc;
}

.btn-cancel {
  background: white;
  color: black;
}

#errorMessage {
  display: block;
  color: red;
  text-align: center;
  width: 100%;
}

</style>