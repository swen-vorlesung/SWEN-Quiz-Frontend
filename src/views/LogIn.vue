<template>
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
    <br>
    <form @submit="enterWaitingRoom" class="form-control">
        <label>Enter room code to directly join a waiting room</label>
        <input  v-model="roomCode" type="text" placeholder="Enter Room Code">
        <input type="submit" value="Join waiting room" class="btn btn-block btn-submit" />
    </form>
</template>

<script>

export default {
    name: 'Login-Page',
    data() {
        return {
            username: String,
            password: String,
            roomCode: String,
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault()

            const res = await fetch(`${this.$backendURL}/auth/login/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(
                    {
                        'username': this.username,
                        'password': this.password
                    })
            })
            const data = await res.json()

            if (data.token) {
                this.setCookies(data.token)
                this.$emit("setAdmin", true)
                this.$router.push(`/admin`)
            } else {
                alert("invalid Username or Password")
            }
        },
        async useDemo() {
            this.username = 'DEMO'
            this.password = 'DEMO'
        },
        enterWaitingRoom(){
            if(this.roomCode == null || this.roomCode === "")
                return;

            this.$router.push(`/quiz/${this.roomCode}/waitingroom`)
        },
        setCookies(token){
            this.$cookies.set("session_token", token, "1d", "/", window.location.origin, true, "None")
        }
    },
    created() {
        this.username = null
        this.password = null
        this.roomCode = null
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