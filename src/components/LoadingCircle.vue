<template>
    <div id="spinning-circle" :style="{top: positionY + 'px', left: positionX + 'px'}" class="spinning-circle on-top"></div>
</template>

<script>
export default {
  name: "LoadingCircle",
  data() {
    return {
      positionX: Number,
      positionY: Number
    }
  },
  created() {
    this.positionX = (window.innerWidth / 2) - 60
    this.positionY = (window.innerHeight / 2)
  }
}
</script>

<style scoped>

.on-top {
  position: absolute;
  z-index: 100;
}

.spinning-circle {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}
</style>