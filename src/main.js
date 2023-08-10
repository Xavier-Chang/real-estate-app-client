import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflix-clone-5e260.firebaseapp.com",
  projectId: "netflix-clone-5e260",
  storageBucket: "netflix-clone-5e260.appspot.com",
  messagingSenderId: "1021830514223",
  appId: "1:1021830514223:web:1cabb08e0711cdce9f68da"
};

initializeApp(firebaseConfig);

const app = createApp(App)

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router)
});

app.use(pinia);
app.use(router);

app.mount('#app')
