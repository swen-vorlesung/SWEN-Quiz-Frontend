<template>
  <div>
    <input type="checkbox" v-model="isCorrect" id="isCorrect">
    <input placeholder="Answer" v-model="answer" id="answer">
  </div>
</template>

<script>
export default {
  name: 'Create-New_Quiz',
  expose: ["getAnswer"],
  data() {
    return {
      isCorrect: Boolean,
      answer: String
    }
  },
  created() {
    this.isCorrect = false
    this.answer = null

  },
  methods: {
    getAnswer(){
      return {
        answer: this.answer,
        isCorrect: this.isCorrect
      }
    }
  }
}
</script>

<style scoped>

* {
  border-style: none;
}

label {
  display: block;
}

input {
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

div{
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 2% auto;
}

#answer {
  margin: auto 2% auto;
}

#isCorrect {
  width: 20%;
  margin: 0;
  padding: 0;
}
</style>