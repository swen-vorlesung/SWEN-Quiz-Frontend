<template>
    <div class="countdown">{{ countdown }}</div>
</template>

<script>

export default {
  name: 'Counter-Item',
  props: {
    countdown: Number
  }
}
</script>

<style scoped>
.countdown {
  color: #29abe2;
  background: white;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 3px solid #20abe2;
  font-size: 20px;
  font-family: 'CaviarDreamsBold';
}
</style>
  