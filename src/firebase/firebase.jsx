import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
const apiKey = import.meta.env.VITE_API_KEY
const authDomain = import.meta.env.VITE_AUTH_DOMAIN
const projectId = import.meta.env.VITE_PROJECT_ID
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET
const messagingSenderId = import.meta.env.VITE_MESSAGING_SENDER_ID
const appId = import.meta.env.VITE_ID

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
