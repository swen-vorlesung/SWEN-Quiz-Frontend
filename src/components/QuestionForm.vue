<template>
  <body>
    <div id="create-quiz-header">
      <label id="position">{{this.position}}.</label>
      <div id="quiz-question-div">
        <input id="quiz-question-input" placeholder="Question" v-model="question" required>
        <i class="fa fa-minus"></i>
      </div>
    </div>
    <div id="answer-time-div">
        <label id="answer-time-text">Time:</label>
        <input id="answer-time-input" type="number" v-model="answerTime">
    </div>
    <div class="answer-form">
      <AnswerForm v-for="i in numberOfAnswers" :key="i" :hide-minus-symbol="hideRemoveAnswersSymbol" @reduceAmountOfAnswers="this.removeAnswer" ref="answers"/>
    </div>
    <input type="button" @click="numberOfAnswers++" value="Another Answer" id="add_answer_button">
  </body>
</template>

<script>
import AnswerForm from "@/components/AnswerForm.vue";

export default {
  name: 'Create-New_Quiz',
  expose: ['getQuestions'],
  props:{
    position: Number
  },
  components: {
    AnswerForm
  },
  data() {
    return {
      question: String,
      answerTime: Number,
      numberOfAnswers: Number,
      hideRemoveAnswersSymbol: Boolean,
    }
  },
  watch: {
    numberOfAnswers() {
      this.hideRemoveAnswersSymbol = this.numberOfAnswers > 2
    }
  },
  created() {
    this.question = null
    this.answerTime = 0
    this.numberOfAnswers = 2
    this.hideRemoveAnswersSymbol = true
  },
  methods: {
    getQuestions(){
      let answerList = []
      this.$refs.answers.forEach(answer => answerList.push(answer.getAnswer()))

      let validAnswers = this.validateAnswers(answerList)
      let validTime = this.validateAnswerTime()

      if(!validAnswers)
        this.$emit('quizFormErrorEvent', "You need at least one correct answer")
      else if(!validTime)
        this.$emit('quizFormErrorEvent', "Invalid Time. Allowed times are above 0")

      return {
        question: this.question,
        answerTime: this.answerTime,
        answers: answerList
      }
    },
    validateAnswers(answerList){
      // Answers has at least one correct answer
      for(const answer of answerList){
        if(answer.isCorrect)
          return true
      }

      return false
    },
    validateAnswerTime(){
      return this.answerTime > 0
    },
    removeAnswer(event){
      console.log("Remove Answer event")
      console.log(event)
      this.numberOfAnswers--
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