import { initializeApp } from 'firebase/app';
import { getAuth , GoogleAuthProvider } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { getStorage} from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDCTJrMH2l-33DR0Krbh1ax-LKaNLx7BHs",
    authDomain: "disney-plus-clone-ab5be.firebaseapp.com",
    projectId: "disney-plus-clone-ab5be",
    storageBucket: "disney-plus-clone-ab5be.appspot.com",
    messagingSenderId: "378969440481",
    appId: "1:378969440481:web:6c0d6e4ec95f4e8d7877a0",
    measurementId: "G-ZW5DTBNRGD"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);
  const provider = new GoogleAuthProvider(firebaseApp);

  export {auth, provider, storage};
  export default db;
