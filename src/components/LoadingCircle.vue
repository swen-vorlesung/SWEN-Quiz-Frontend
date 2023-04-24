<template>
    <div id="box" :style="{top: 0 + 'px', left: 0 + 'px'}" class="modal-overlay modal-background on-top">
        <div id="spinning-container">
            <div id="spinning-circle"  class="spinning-circle on-top"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: "LoadingCircle",
}
</script>

<style scoped>

.on-top {
  position: absolute;
  z-index: 100;
}

.spinning-circle {
    display: block;
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

.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
}

.modal-background:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
    left: 0;
    top: 0;
    opacity: 1;
}

#spinning-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>