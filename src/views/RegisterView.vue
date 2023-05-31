<template>
    <div class="authentication-container">
        <h1>Create an Account</h1>
        <input type="text" placeholder="Email" v-model="email" class="input-container" />
        <input type="password" placeholder="Password" v-model="password" class="input-container" />
        <p v-if="errMsg" class="error-message">{{ errMsg }}</p>
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
const { email, password, errMsg } = storeToRefs(houseStore);

const router = useRouter();

router.beforeEach((to, from, next) => {
  houseStore.errMsg = ""; 
  next();
})

const auth = getAuth();

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address.';
  }

  return true;
}

const validatePassword = (password) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }
  
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }

  if (!/\d/.test(password)) {
    return 'Password must contain at least one digit.';
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return 'Password must contain at least one special character (!@#$%^&*).';
  }

  return true;
}


const register = () => {
    const emailValidationResult = validateEmail(email.value);
    if (emailValidationResult !== true) {
        errMsg.value = emailValidationResult;
        return;
    }

    const validationResult = validatePassword(password.value);
    if (validationResult !== true) {
        errMsg.value = validationResult;
        return;
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            houseStore.email = "";
            houseStore.password = "";
            errMsg.value = "";
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