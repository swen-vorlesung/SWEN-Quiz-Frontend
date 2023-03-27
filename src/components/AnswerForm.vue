<template>
  <div>
    <input type="checkbox" id="isCorrect">
    <input placeholder="Answer" id="answer">
  </div>
</template>

<script>
export default {
  name: 'Create-New_Quiz',
  data() {
    return {
      quizName: String,
      quizCount: Number
    }
  },
  created() {
    this.quizName = null

  }
}
</script>

<style scoped>

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

div{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

#answer {
  width: 70%;
  margin: 2% 2% auto;
}

#isCorrect {
  width: 20%;
}
</style>