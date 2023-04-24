<template>
  <LoadingCircle v-show="showLoadingIndicator"/>
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
      <ErrorDisplay :error-message="this.errorMessage"/>
      <input type="submit" value="Submit" class="btn btn-block btn-submit bold"/>
      <input type="button" value="Cancel" @click="onCancel" class="btn btn-block .form btn_cancel bold" :class="{btn_delete: !updatingQuiz}"/>
      <input type="button" value="Delete Quiz" @click="deleteQuiz" v-if="updatingQuiz" class="btn btn-block .form btn_delete bold" />
    </form>
  </body>
</template>

<script>
import QuestionForm from "@/components/QuestionForm.vue";
import ErrorDisplay from "@/components/ErrorDisplay.vue";
import LoadingCircle from "@/components/LoadingCircle.vue";
import axios from "axios";

export default {
  name: 'Create-New_Quiz',
  data() {
    return {
      quizName: String,
      questions: [],
      errorMessage: String,
      updatingQuiz: Boolean,
      quizCreationError: Boolean,
      questionIDCounter: Number,
      showLoadingIndicator: Boolean,
    }
  },
  components: {
    LoadingCircle,
    ErrorDisplay,
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

      this.showLoadingIndicator = true

      if(this.updatingQuiz)
        httpMethod = "PUT"

      const data = {
        id: this.quizId,
        name: this.quizName,
        questions: this.questions
      }

      await axios({
        method: httpMethod,
        url: `${this.$backendURL}/quizzes`,
        data: data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      .then(() => this.$emit('finished_quiz_creation', true))
      .catch(error => this.quizFormErrorEvent(error))

    },
    async getQuiz(quizId){
      await axios.get(`${this.$backendURL}/quizzes/${quizId}`, {
        withCredentials: true
      })
      .then(async result => {
        const quiz = await result.data
        this.quizName = quiz.name
        this.updatingQuiz = true
        this.showLoadingIndicator = false
        quiz.questions.forEach(question => this.addQuestion(question))
      }).catch(error => this.quizFormErrorEvent(error))
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
    },
    async deleteQuiz(){
      if(!this.updatingQuiz)
        return;

      if(!window.confirm("Are you sure you want to delete this quiz?"))
        return

      await axios.delete(`${this.$backendURL}/quizzes/${this.quizId}`, {
        withCredentials: true,
      })
      .then(() => this.$emit('finished_quiz_creation', true))
      .catch(error => console.log(error))
    },
    checkForErrors(result){
      console.log(result)
      if(!result.ok)
        throw new Error(result.status + ":" + result.errorMessage)
      else
        return result
    }
  },
  created() {
    this.quizName = null
    this.errorMessage = null
    this.questionIDCounter = 0
    this.quizCreationError = false
    this.updatingQuiz = false
    this.questions = []

    if(this.quizId != null){
      this.showLoadingIndicator = true
      this.getQuiz(this.quizId)
    }
    else{
      this.showLoadingIndicator = false
      this.addEmptyQuestion()
    }

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

.btn {
 margin: 2% auto;
}

.btn-submit {
  background: limegreen;
}

.btn_cancel {
  background: #0071bc;
  color: white;
}

.btn_delete {
  color: white;
  background: red;
}

.bold {
  font-weight: bold;
}
</style>