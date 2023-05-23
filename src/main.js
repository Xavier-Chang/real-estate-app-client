import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app-41e10.firebaseapp.com",
  projectId: "real-estate-app-41e10",
  storageBucket: "real-estate-app-41e10.appspot.com",
  messagingSenderId: "1072923315902",
  appId: "1:1072923315902:web:46f5d28d5f8a1ac8ca58ef"
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
