<template>
    <h1>Administration</h1>
    <div class='task' :key="quiz.id" v-for="quiz in quizzes">
        <h3>{{quiz.name}}
            <i @click="createQuizSession(quiz.id)" class="fas fa-thin fa-circle-plus"></i>
        </h3>
    </div>
</template>

<script>

export default {
    name: 'Admin-Page',
    data() {
        return {
            quizzes: [],
        }
    },
    inheritAttrs: false,
    methods: {
        async createQuizSession(quizId) {
            const res = await fetch(`http://localhost:9009/quizzes/${quizId}`, {
                method: "POST"
            });
            console.log('createQuizSession')
            const data = await res.json()
            this.$emit('connect', data.sessionId)
            this.$router.push(`/quiz/${data.sessionId}/waitingroom`)
        },
        async fetchQuizzes() {
            const res = await fetch('http://localhost:9009/quizzes')
            const data = await res.json()
            return data;
        }
    },
    async created() {
        this.quizzes = await this.fetchQuizzes();
    }
}
</script>

<style scope>
.fas {
    color: green;
    cursor: pointer;
}

.task {
    background: #f4f4f4;
    margin: 5px;
    padding: 10px 20px;
}

.task.reminder {
    border-left: 5px solid green;
}

.task h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>