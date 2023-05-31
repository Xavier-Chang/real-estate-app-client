<template>
    <div class="authentication-container">
        <h1>Sign in to an Account</h1>
        <input type="text" placeholder="Email" v-model="email" class="input-container" />
        <input type="password" placeholder="Password" v-model="password" class="input-container" />
        <p v-if="errMsg" class="error-message">{{ errMsg }}</p>
        <button @click="register">Submit</button>
        <button @click="signInWithGoogle">Sign In With Google</button>

    </div>
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router';
import { useHouseStore } from "../stores/HouseStore";
import { storeToRefs } from 'pinia';
const houseStore = useHouseStore();

const { email, password, isLoggedIn, errMsg } = storeToRefs(houseStore);

const router = useRouter();

router.beforeEach((to, from, next) => {
    errMsg.value = "";
    email.value = "";
    password.value = "";
    next();
})

const auth = getAuth();

const register = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            isLoggedIn.value = true;
            houseStore.email = "";
            houseStore.password = "";
            errMsg.value = "";
            router.push('/')
        })
        .catch((error) => {
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

    button {
        color: white;
    }
}
</style>