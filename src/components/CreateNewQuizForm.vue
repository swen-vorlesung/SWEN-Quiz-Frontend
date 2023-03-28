<template>
  <body>
    <h2>Create new Quiz</h2>
    <div class="add-form">
      <div class="form-control">
        <input type="text" v-model="quizName" placeholder="Enter quiz name" required>
        <QuestionForm v-for="(index) in quizCount" :key="index" ref="questionForms" :position="index"/>
        <input type="button" @click="quizCount++" value="Another Question">
      </div>
      <input type="submit" value="Submit" @click="onSubmit" class="btn btn-block btn-submit"/>
      <input type="button" value="Cancel" @click="onCancel" class="btn btn-block .form btn-cancel"/>
    </div>
  </body>
</template>

<script>
import QuestionForm from "@/components/QuestionForm.vue";

export default {
  name: 'Create-New_Quiz',
  data() {
    return {
      quizName: String,
      quizCount: Number
    }
  },
  props: {
    token: String
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()

      let questionList = []
      this.$refs.questionForms.forEach(question => questionList.push(question.getQuestions()))

      const data = JSON.stringify({
        "name":this.quizName,
        "questions": questionList
      })

      const res = await fetch(`${this.$backendURL}/quizzes`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + this.token,
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: data
      })

      // TODO: Validate response
      console.log(res)

      this.$emit('finished_quiz_creation', true)
    },
    onCancel(){
      if(window.confirm("Are you sure you want to leave?\nYou will be loosing your entire progress")){
        this.$emit('finished_quiz_creation', false)
      }
    }
  },
  created() {
    this.quizName = null
    this.quizCount = 1

  },
  components: {
    QuestionForm
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
</style>