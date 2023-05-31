<template>
    <div class="authentication-container">
        <h1>Create an Account</h1>
        <input type="text" placeholder="Email" v-model="email" class="input-container" />
        <input type="password" placeholder="Password" v-model="password" class="input-container" />
        <button @click="register">Submit</button>
        <button @click="signInWithGoogle">Sign In With Google</button>
    </div>
</template>

<script setup>
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
            houseStore.email = "";
            houseStore.password = "";
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
</style>