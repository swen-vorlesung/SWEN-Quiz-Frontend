<template>
  <body>
    <input placeholder="Question">
    <div id="answer-time-div">
        <label id="answer-time-text">Time:</label>
        <input id="answer-time-input" type="number" value="0">
    </div>

    <div v-for="i in numberOfAnswers" :key="i" class="answer-form">
      <AnswerForm></AnswerForm>
    </div>
    <input type="button" @click="numberOfAnswers++" value="Another Answer" id="add_answer_button">
  </body>
</template>

<script>
import AnswerForm from "@/components/AnswerForm.vue";

export default {
  name: 'Create-New_Quiz',
  data() {
    return {
      question: String,
      answerTime: Number,
      numberOfAnswers: Number,
      answerTimePlaceholderText: String
    }
  },
  created() {
    this.question = null
    this.answerTime = 0
    this.numberOfAnswers = 1
    this.answerTimePlaceholderText = "Enter Answer Time"
  },
  components: {
    AnswerForm
  }
}
</script>

<style scoped>
* {
  color: white;
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

#answer-time-div{
  width: 90%;
  margin: auto;
  display: flex;
  flex: auto;
  flex-direction: row;
}

#answer-time-input{
  width: 70%;
  margin: auto 2% auto;
}

#answer-time-text{
  width: 20%;
  padding: 0;
  margin: auto 0 auto 0;
}

#add_answer_button{
  width: 90%;
  height: 80%;
  display: flex;
  margin: 2% auto;
}

</style>