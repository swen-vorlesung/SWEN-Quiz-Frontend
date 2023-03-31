<template>
  <body>
    <div id="create-quiz-header">
      <label id="position">{{this.position+1}}.</label>
      <div id="quiz-question-div">
        <input id="quiz-question-input" placeholder="Question" v-model="question" required>
        <i @click="$emit('removeQuestionEvent')" v-show="showMinusSymbol" class="fa fa-minus"></i>
      </div>
    </div>

    <div id="answer-time-div">
        <label id="answer-time-text">Time:</label>
        <input id="answer-time-input" type="number" v-model="answerTime">
    </div>

    <div class="answer-form">
      <AnswerForm v-for="(answer, index) in answers"
                  :key="answer.id"
                  v-model:answer="answer.answer"
                  v-model:isCorrect="answer.isCorrect"
                  :showMinusSymbol="answers.length > 2"
                  @removeAnswerEvent="answers.splice(index, 1)"
      />
    </div>
    <input type="button" @click="addNewAnswer" value="Another Answer" id="add_answer_button">
  </body>
</template>

<script>
import AnswerForm from "@/components/AnswerForm.vue";

export default {
  name: 'Create-New_Quiz',
  expose: ['getQuestions'],
  props:{
    position: Number,
    showMinusSymbol: Boolean
  },
  components: {
    AnswerForm
  },
  data() {
    return {
      question: String,
      answerTime: Number,
      answerIDCounter: Number,
      answers: []
    }
  },
  created(){
    this.question = null
    this.answerTime = 0
    this.answerIDCounter = 0

    // Create two Answers at startup
    this.addNewAnswer()
    this.addNewAnswer()
  },
  methods: {
    getQuestions(){
      let answers = JSON.parse(JSON.stringify(this.answers))
      this.removeIDFromObject(answers)

      let validAnswers = this.validateAnswers(answers)
      let validTime = this.validateAnswerTime()

      if(!validAnswers)
        this.$emit('quizFormErrorEvent', "You need at least one correct answer")
      else if(!validTime)
        this.$emit('quizFormErrorEvent', "Invalid Time. Allowed times are above 0")

      return {
        question: this.question,
        answerTime: this.answerTime,
        answers: answers
      }
    },
    validateAnswers(answers){
      // Answers has at least one correct answer
      for(const answer of answers){
        if(answer.isCorrect)
          return true
      }

      return false
    },
    validateAnswerTime(){
      return this.answerTime > 0
    },
    removeIDFromObject(answers){
      answers.forEach(answer => delete answer.id)
      return answers
    },
    addNewAnswer(){
      this.answers.push({
        id: this.answerIDCounter++,
        answer: "null",
        isCorrect: false
      })
    }
  }
}
</script>

<style scoped>
* {
  color: white;
  border-style: none;
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

.answer-form{
  border: white;
  width: 90%;
  margin: auto;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}

h2 {
  text-align: center;
  font-weight: normal;
  margin-bottom: 50px;
  font-family: 'CaviarDreams';
}

label {
  padding-left: 15px;
  text-align: center;
}

button {
  color: black;
  width: 90%;
}

input {
  color: black;
  margin-top: 10px;
  margin-bottom: 10px;
}

#quiz-question-div {
  display: grid;
  position: relative;
  width: 100%;
}

#answer-time-div{
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
}

#create-quiz-header{
  display: flex;
  flex-direction: row;
}

#position{
  width: 5%;
  padding: 0;
  text-align: left;
  align-self: center;
}

#answer-time-input{
  margin: auto auto;
}

#answer-time-text{
  width: 20%;
  padding: 0;
  margin: auto 0 auto 0;
}

#add_answer_button{
  width: 86%;
  display: flex;
  padding: 0;
  margin: 2% auto;
}

</style>