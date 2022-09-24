<template>
    <header>
        <h3>Results</h3>
        <div class='task' :key="result.nickname" v-for="result in sortedResults">

            <label>{{result.nickname}} : {{result.score}}</label>
        </div>
        <div class="modal-overlay" v-show="finished">
            <div class="modal">
                <h6>Glückwunsch! Du hast den {{place}}. Platz gemacht!</h6>
            </div>
        </div>
    </header>
</template>
  
<script>

export default {
    name: 'Results-Item',
    props: {
        results: [],
        finished: Boolean,
        user: String
    },
    data() {
        return {
            place: Number,
            sortedResults: []
        }
    },
    watch: {
        results: function (results) {
            this.sortedResults = this.sortResults(results);
        },
        finished: function (isFinished) {
            if (isFinished) {
                this.place = this.sortedResults.findIndex(r => r.nickname === this.user) + 1;
            }
        }
    },
    methods: {
        sortResults(results){
            return results.sort((n1, n2) => n2.score - n1.score)
        }
    }
}
</script>
  
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
}

.modal {
    text-align: center;
    background-color: white;
    height: 500px;
    width: 500px;
    margin-top: 10%;
    padding: 60px 0;
    border-radius: 20px;
}

.close {
    margin: 10% 0 0 16px;
    cursor: pointer;
}

.close-img {
    width: 25px;
}

.check {
    width: 150px;
}

h6 {
    font-weight: 500;
    font-size: 28px;
    margin: 20px 0;
}

p {
    font-size: 16px;
    margin: 20px 0;
}

button {
    background-color: #ac003e;
    width: 150px;
    height: 40px;
    color: white;
    font-size: 14px;
    border-radius: 16px;
    margin-top: 50px;
}
</style>    