<template>
  <body>
    <h2>Create new Quiz</h2>
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <input type="text" v-model="quizName" placeholder="Enter quiz name" required>
        <QuestionForm v-for="(question, index) in questions"
                      ref="questionForms"
                      :key="question.index"
                      :id="question.id"
                      :question="question.question"
                      :answerTime="question.answerTime"
                      :oldAnswers="question.answers"
                      :position="index"
                      :showMinusSymbol="questions.length > 1"
                      v-model:question="question.question"
                      v-model:answerTime="question.answerTime"
                      v-model:answers="question.answers"
                      @quizFormErrorEvent="quizFormErrorEvent"
                      @removeQuestionEvent="questions.splice(index, 1)"
        />
        <input type="button" @click="addEmptyQuestion" value="Another Question">
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
      errorMessage: String,
      quizCreationError: Boolean,
      updatingQuiz: Boolean,
      questionIDCounter: Number,
      questions: [],
    }
  },
  components: {
    QuestionForm
  },
  props: {
    quizId: Number
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()

      let httpMethod = "POST"
      this.$refs.questionForms.forEach(question => question.getAnswers())

      if(this.quizCreationError){
        this.quizCreationError = false
        return
      }

      if(this.updatingQuiz)
        httpMethod = "PUT"

      const data = {
        id: this.quizId,
        name: this.quizName,
        questions: this.questions
      }

      await fetch(`${this.$backendURL}/quizzes`, {
        method: httpMethod,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      }).catch(error => this.quizFormErrorEvent(error))

      this.$emit('finished_quiz_creation', true)
    },
    async getQuiz(quizId){
      const res = await fetch(`${this.$backendURL}/quizzes/${quizId}`, {
        method: "GET",
        credentials: "include",
      }).catch(error => this.quizFormErrorEvent(error))

      const quiz = await res.json()
      this.quizName = quiz.name
      this.updatingQuiz = true

      quiz.questions.forEach(question => this.addQuestion(question))
    },
    onCancel(){
      if(window.confirm("Are you sure you want to leave?\nYou will be loosing your entire progress")){
        this.$emit('finished_quiz_creation', false)
      }
    },
    quizFormErrorEvent(errorMessage){
      this.errorMessage = errorMessage
      this.quizCreationError = true
    },
    addEmptyQuestion(){
      this.questions.push({
        id: null,
        index: this.questionIDCounter++,
        question: null,
        answerTime: 0,
        answers: []
      })
    },
    addQuestion(question){
      this.questions.push({
        id: question.id,
        index: this.questionIDCounter++,
        question: question.question,
        answerTime: question.answerTime,
        answers: question.answers
      })
    }
  },
  created() {
    this.quizName = null
    this.errorMessage = null
    this.questionIDCounter = 0
    this.quizCreationError = false
    this.updatingQuiz = false
    this.questions = []

    if(this.quizId != null)
      this.getQuiz(this.quizId)
    else
      this.addEmptyQuestion()

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