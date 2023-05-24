<template>
    <div class="container">
        <h1>Create an Account</h1>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password"></p>
        <p><button @click="register">Submit</button></p>
        <p><button @click="signInWithGoogle">Sign In With Google</button></p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router';
import { useHouseStore } from "../stores/HouseStore";
import { storeToRefs } from 'pinia';

const houseStore = useHouseStore();
const { email, password } = storeToRefs(houseStore);

const router = useRouter();
const auth = getAuth();
const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            router.push('/signin')
        })
        .catch((error) => {
            console.log(error.code) 
            alert(error.message)
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