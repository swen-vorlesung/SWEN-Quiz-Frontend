<template>
    <LoadingCircle v-show="showLoadingIndicator"> </LoadingCircle>
    <form @submit="onSubmit" class="add-form">
        <div class="form-control">
            <label>Nickname:</label>
            <input type="text" v-model="username" name="username" placeholder="Add NickName" required/>
            <label>Password:</label>
            <input type="password" v-model="password" name="password" required />
        </div>
        <input type="submit" value="Submit" class="btn btn-block btn-submit" />
        <button @click="useDemo"  class="btn btn-block btn-submit">Use Demo</button>
    </form>
    <ErrorDisplay :error-message="this.errorMessage"/>
    <br>
    <form @submit="enterWaitingRoom" class="form-control">
        <label>Enter room code to directly join a waiting room</label>
        <input  v-model="roomCode" type="text" placeholder="Enter Room Code">
        <input type="submit" value="Join waiting room" class="btn btn-block btn-submit" />
    </form>
</template>

<script>

import axios from "axios";
import LoadingCircle from "@/components/LoadingCircle.vue";
import ErrorDisplay from "@/components/ErrorDisplay.vue";

export default {
    name: 'Login-Page',
    components: {ErrorDisplay, LoadingCircle},
    data() {
        return {
            username: String,
            password: String,
            roomCode: String,
            errorMessage: String,
            showLoadingIndicator: Boolean,
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault()

            this.showLoadingIndicator = true

            await axios.post(`${this.$backendURL}/auth/login/`, JSON.stringify({
                'username': this.username,
                'password': this.password
            }),{
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                withCredentials: true
            })
            .then(() => {
                this.$emit("setAdmin", true)
                this.$router.push(`/admin`)
            })
            .catch(error => {
                if(error.response.code === 401)
                    this.errorMessage = "Network Error"
                else
                    this.errorMessage = "Invalid Username or Password"

                console.log(error)
            })
            .finally(() => this.showLoadingIndicator = false)
        },
        async useDemo() {
            this.username = 'DEMO'
            this.password = 'DEMO'
        },
        enterWaitingRoom(){
            if(this.roomCode == null || this.roomCode === "")
                return;

            this.$router.push(`/quiz/${this.roomCode}/waitingroom`)
        }
    },
    created() {
        this.username = null
        this.password = null
        this.roomCode = null
        this.showLoadingIndicator = false
    }
}
</script>

<style scoped>
.form-control {
    margin: 20px 0;
}

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

.form-control-check {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.form-control-check label {
    flex: 1;
}

.form-control-check input {
    flex: 2;
    height: 20px;
}

.fas {
    color: green;
    cursor: pointer;
}

h2 {
    color: white;
    text-align: center;
    font-weight: normal;
    margin-bottom: 50px;
    font-family: 'CaviarDreams';
}

.qr-code {
    margin: 0 auto;
    display: block;
}

label {
    color: white;
    padding-left: 15px;
    margin: 10px auto 10px;
}

.btn-submit {
    background: #0071bc;
}

.btn-start {
    margin-top: 60px;
}
</style>