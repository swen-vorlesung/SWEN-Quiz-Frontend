<template>
    <header>
        <h3>Results</h3>
        <div class='task' :key="result.nickname" v-for="result in results">
            
            <label>{{result.nickname}} : {{result.score}}</label>
        </div>
    </header>
</template>
  
<script>

export default {
    name: 'Results-Item',
    props: {
        results: []
    }
}
</script>
  
<style scoped>

</style>
  