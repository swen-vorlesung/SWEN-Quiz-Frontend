<template>
  <div v-show="this.showError">
    <label> {{this.errorMessage}} </label>
  </div>
</template>

<script>
export default {
  name: "ErrorDisplay",
  return: {
    showError: Boolean,
  },
  props: {
    errorMessage: String,
  },
  watch: {
    errorMessage(newError){
      this.showError = (newError != null)
    }
  }
}
</script>

<style scoped>

label {
  display: block;
  width: 100%;
  color: red;
  text-align: center;
  margin: 10px auto 10px auto;
}
</style>