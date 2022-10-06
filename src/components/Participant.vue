<template>
  <div class="task-wrapper">
    <label v-if="participants.length > 0">Spielerliste:</label>
    <div class='task' :key="participant" v-for="participant in participants">
      <span>{{ participant }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Header-Item',
  props: {
    participants: Object
  }
}
</script>

<style scoped>
.task-wrapper {
  margin-top: 50px;
}

.task {
  background: #1b1464;
  margin: 10px 0 0;
  padding: 10px 20px;
  -webkit-box-shadow: 0 0 2px 0 #000000;
  box-shadow: 0 0 2px 0 #000000;
  text-align: center;
}

.task.reminder {
  border-left: 5px solid green;
}

.task span {
  text-align: center;
  font-family: 'CaviarDreamsBold';
  font-size: 22px;
}
label {
  color: white;
  padding-left: 15px;
}
</style>
  