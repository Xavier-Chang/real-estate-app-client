<template>
    <div class="container">
        <h1>Sign in to an Account</h1>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password"></p>
        <p v-if="errMsg">{{ errMsg }}</p>
        <p><button @click="register">Submit</button></p>
        <p><button @click="signInWithGoogle">Sign In With Google</button></p>
        
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router';
import { useHouseStore } from "../stores/HouseStore";
import { storeToRefs } from 'pinia';
const houseStore = useHouseStore();
const { email, password, username } = storeToRefs(houseStore);

const errMsg = ref();
const router = useRouter();
const auth = getAuth();

const register = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Success signed in")
            console.log(auth.currentUser)
            router.push('/')
        })
        .catch((error) => {
            console.log(error.code) 
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid email address format."
                    break;
                case "auth/user-disabled":
                    errMsg.value = "This account has been disabled."
                    break;
                case "auth/user-not-found":
                    errMsg.value = "No account found with this email address."
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password."
                    break;
                default:
                    errMsg.value = "Email or password is incorrect."
                    break;
            }
        });
}

const signInWithGoogle = () => {
    houseStore.signInWithGoogle(router);
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 1rem;
}
</style>