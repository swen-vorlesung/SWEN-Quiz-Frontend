<template>
    <header>
        <h3>{{question.question}}</h3>
        <!--div class='task' :key="answer.id" v-for="answer in question.answers">
            <h5>{{answer.answer}}</h5>
        </div-->
    </header>
</template>
  
<script>

export default {
    name: 'Quiz-Item',
    props: {
        question: Object
    }
}
</script>
  
<style scoped>

</style>
  